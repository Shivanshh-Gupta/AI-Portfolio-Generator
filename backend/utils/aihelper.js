const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const { PORTFOLIO_BASE_CSS } = require("./portfolioBaseTemplate");
dotenv.config();

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const GEMINI_PRIMARY    = "gemini-2.0-flash";
const GEMINI_FALLBACK   = "gemini-2.0-flash-lite";
const GROQ_MODEL        = "llama-3.3-70b-versatile"; // Free, no daily quota issues

// Initialize Gemini SDK (only if key is available)
const ai = process.env.GOOGLE_API_KEY
    ? new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })
    : null;

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function getApiKeySuffix(key) {
    const k = key || process.env.GOOGLE_API_KEY || "";
    return k.length >= 6 ? k.slice(-6) : k || "missing";
}

function estimatePromptStats(prompt) {
    const text = typeof prompt === "string" ? prompt : "";
    return { chars: text.length, approxTokens: Math.ceil(text.length / 4) };
}

function isQuotaError(error) {
    const status = error?.status || error?.response?.status || null;
    const msg = (error?.message || "").toLowerCase();
    return status === 429 || msg.includes("quota") || msg.includes("resource_exhausted");
}

function isNotFoundError(error) {
    const status = error?.status || error?.response?.status || null;
    const msg = (error?.message || "").toLowerCase();
    return status === 404 || msg.includes("not found") || msg.includes("not supported");
}

function isBusyError(error) {
    const status = error?.status || error?.response?.status || null;
    const msg = (error?.message || "").toLowerCase();
    return status === 503 || msg.includes("overloaded") || msg.includes("unavailable");
}

function extractRetryDelay(error) {
    const details = error?.errorDetails || error?.details || [];
    for (const d of details) {
        if (d?.["@type"] === "type.googleapis.com/google.rpc.RetryInfo" && d.retryDelay) {
            const match = String(d.retryDelay).match(/(\d+)/);
            if (match) return Number(match[1]) * 1000;
        }
    }
    const msg = error?.message || "";
    const m = msg.match(/Please retry in ([\d.]+)s/i);
    if (m) return Math.ceil(Number(m[1]) * 1000);
    return 8000;
}

// ─────────────────────────────────────────────
// GROQ GENERATOR (Primary — Free Tier, No Quota)
// ─────────────────────────────────────────────
async function generateWithGroq(prompt) {
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey || groqKey === "your_groq_api_key_here") {
        throw new Error("[Groq] API key not configured. Add GROQ_API_KEY to .env");
    }

    const groq = new Groq({ apiKey: groqKey });

    const stats = estimatePromptStats(prompt);
    console.log(`[Groq] Request starting | model=${GROQ_MODEL} | chars=${stats.chars} | approxTokens=${stats.approxTokens}`);

    const response = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
            {
                role: "system",
                content: "You are an expert frontend developer and UI/UX designer. When asked to generate a portfolio, you MUST output ONLY raw complete HTML code — no markdown, no code fences, no explanation. The HTML must be a single self-contained file with all CSS and JS embedded. Make it visually stunning with dark navy backgrounds, glassmorphism, animations, and modern design — never plain or minimal.",
            },
            { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 8000,  // ~32,000 chars output — enough for full portfolio, stays within 12k TPM limit
    });

    let text = response?.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if model wrapped output in ```html ... ```
    text = text.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

    console.log(`[Groq] Success | outputChars=${text.length}`);
    return text;
}

// ─────────────────────────────────────────────
// GEMINI GENERATOR (Fallback)
// ─────────────────────────────────────────────
async function generateWithGemini(modelName, prompt, retries = 1) {
    if (!ai) {
        throw new Error("[Gemini] No GOOGLE_API_KEY set. Skipping Gemini.");
    }
    const stats = estimatePromptStats(prompt);
    console.log(`[Gemini] Request starting | model=${modelName} | key=***${getApiKeySuffix()} | chars=${stats.chars} | approxTokens=${stats.approxTokens}`);

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: { temperature: 0.7 },
        });

        if (typeof response.text === "string") return response.text;
        const parts = response?.candidates?.[0]?.content?.parts;
        if (parts && parts.length > 0) return parts[0].text;
        return "";

    } catch (error) {
        // Quota error — don't retry, throw immediately for fallback chain
        if (isQuotaError(error)) {
            console.warn(`[Gemini] Quota exhausted for model=${modelName}. Skipping...`);
            throw error;
        }

        // Not found — don't retry
        if (isNotFoundError(error)) {
            console.warn(`[Gemini] Model not found: ${modelName}. Skipping...`);
            throw error;
        }

        // Service busy — retry once
        if (isBusyError(error) && retries > 0) {
            const delay = extractRetryDelay(error);
            console.warn(`[Gemini] Service busy, retrying in ${Math.ceil(delay / 1000)}s...`);
            await new Promise(res => setTimeout(res, delay));
            return generateWithGemini(modelName, prompt, retries - 1);
        }

        console.error(`[Gemini] Error on model=${modelName}:`, error?.message || error);
        throw error;
    }
}

// ─────────────────────────────────────────────
// MAIN GENERATOR — Groq first, Gemini fallback
// ─────────────────────────────────────────────
async function generateWithFallback(prompt) {
    // 1️⃣ Try Groq first (free, no quota limits)
    try {
        return await generateWithGroq(prompt);
    } catch (groqError) {
        console.warn("[Groq] Failed:", groqError?.message || groqError);
        console.warn("[Groq] Falling back to Gemini...");
    }

    // 2️⃣ Try Gemini primary
    try {
        return await generateWithGemini(GEMINI_PRIMARY, prompt);
    } catch (e1) {
        console.warn(`[Gemini] ${GEMINI_PRIMARY} failed. Trying ${GEMINI_FALLBACK}...`);
    }

    // 3️⃣ Try Gemini fallback
    try {
        return await generateWithGemini(GEMINI_FALLBACK, prompt);
    } catch (e2) {
        console.error("[AI] All providers failed. No more fallbacks.");
        throw new Error("All AI providers exhausted. Please check your API keys or wait for quota reset.");
    }
}

// ─────────────────────────────────────────────
// SANITY CHECK
// ─────────────────────────────────────────────
async function runGeminiSanityCheck(modelName = GEMINI_PRIMARY) {
    const prompt = "Reply with exactly: SANITY_OK";
    console.log(`[Gemini] Running sanity check | model=${modelName}`);
    try {
        const result = await generateWithGemini(modelName, prompt, 0);
        const trimmed = (result || "").trim();
        console.log(`[Gemini] Sanity check | response="${trimmed}"`);
        return { ok: true, model: modelName, response: trimmed };
    } catch (error) {
        console.error("[Gemini] Sanity check failed:", error?.message);
        return { ok: false, model: modelName, error: error?.message };
    }
}

// ─────────────────────────────────────────────
// PORTFOLIO GENERATORS
// ─────────────────────────────────────────────
async function generatePortfolio(resumeText, existingHtml = null, mode = "new", template = "modern") {
    const templatePrompts = {
        modern:       "Create a STUNNING modern portfolio with deep navy/dark blue gradients (#0a192f to #1e3a5f), vibrant cyan/blue accents (#00d9ff, #1e90ff), glassmorphism cards with backdrop-blur, smooth scroll animations, floating glowing elements, professional hero section with large portrait area, premium spacing, and elegant hover effects with glow transitions.",
        minimal:      "Design an ELEGANT minimal portfolio with sophisticated dark backgrounds, premium typography (Inter/Outfit from Google Fonts), generous whitespace, subtle cyan accent highlights, micro-animations, refined monochromatic palette with pops of color, and clean professional layouts.",
        creative:     "Build a BOLD creative portfolio with dark navy backgrounds, vibrant neon gradients (cyan, purple, pink), asymmetric layouts, dynamic entrance animations, creative geometric shapes, eye-catching glowing elements, and artistic sections with WOW-factor visuals.",
        professional: "Create a PREMIUM corporate portfolio with dark sophisticated theme (navy #0f172a), polished card layouts, cyan/blue professional accents, refined animations, executive presence, credibility-focused sections, elegant typography, and a stunning hero section with professional photo placement.",
        dark:         "Design an ULTRA-SLEEK dark-themed portfolio with deep dark navy backgrounds (#0a192f, #0f1729), electric cyan neon accents (#00d9ff with glow), professional portrait hero section, glassmorphism effects, smooth gradients, cyberpunk aesthetics with glowing lines/borders, modern tech styling, hover glow effects, and premium developer vibes.",
        startup:      "Build a HIGH-ENERGY tech startup portfolio with dark backgrounds, bold cyan/blue gradient overlays, dynamic scroll animations, modern glassmorphic cards with shadows, innovative asymmetric layouts, energetic neon accents, cutting-edge visual trends, and professional hero with portrait.",
    };

    const modePrompt = mode === "update"
        ? "Dramatically improve and elevate the existing portfolio design with premium visual elements while keeping the same content structure."
        : `Convert the following resume into an ABSOLUTELY STUNNING, PREMIUM, VISUALLY IMPRESSIVE personal portfolio website that will WOW anyone who sees it. ${templatePrompts[template] || templatePrompts.modern}`;

    const existingContext = existingHtml
        ? `\n\nExisting Portfolio HTML (elevate this to premium quality):\n${existingHtml}`
        : "";

    const prompt = `You are a web developer. Build a portfolio website using the EXACT CSS provided below — do NOT write any CSS yourself.

OUTPUT RULES:
- Output ONLY raw HTML starting with <!DOCTYPE html>. No markdown, no code fences, no explanation.
- Always end with </body></html>.
- Keep all resume facts accurate — do NOT invent data.
- For icons use inline SVG only (no external URLs).

PHOTO RULE: Scan resume for a photo/image URL (.jpg .png .webp). IF found → add <img src="[URL]" class="hero-photo" alt="Profile">. IF NOT found → no image element at all.

USE THESE EXACT CSS CLASSES (already styled for you):
- Nav: <nav> with .nav-logo and <ul class="nav-links">
- Hero: <section id="hero"> with .hero-content, .hero-greeting, .hero-name, .hero-title, .hero-bio, .hero-buttons, .hero-socials, .social-link
- Buttons: class="btn-primary" and class="btn-outline"
- Sections: <section id="skills">, <section id="experience">, etc. Each needs <h2 class="section-title"> and <div class="section-line">
- Cards: class="card" with .card-title, .card-subtitle, .card-meta inside
- Skills: <div class="skills-grid"> with <span class="skill-tag"> for each skill
- Projects: <div class="projects-grid"> with .card inside
- Timeline: <div class="timeline"> with .timeline-item inside
- Contact: <div class="contact-grid"> with .contact-item, .contact-label, .contact-value
- Add class="reveal" to each section for scroll animations
- Nav toggle: <button class="nav-toggle" onclick="this.parentNode.querySelector('.nav-links').classList.toggle('open')">☰</button>

ADD THIS JS before </body>:
<script>
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver(([e]) => e.isIntersecting && e.target.classList.add('visible'), {threshold:0.15}).observe(el);
});
</script>

THE CSS TO USE (inject this inside <head>):
${PORTFOLIO_BASE_CSS}

Resume:
${resumeText}${existingContext}
`;

    return await generateWithFallback(prompt);
}

async function applyPortfolioTemplate(htmlContent, template) {
    const templatePrompts = {
        modern:       "Transform this portfolio to a STUNNING modern design with deep navy/dark blue backgrounds (#0a192f, #1e3a5f), vibrant cyan accents (#00d9ff, #1e90ff), glassmorphism cards with backdrop-filter and glow effects, smooth scroll animations, floating glowing elements, professional hero section with large portrait placement, premium spacing, and elegant hover effects with neon glows.",
        minimal:      "Redesign this portfolio to be ELEGANTLY minimal with sophisticated dark navy backgrounds, premium Google Fonts (Inter/Outfit), generous whitespace, subtle cyan accent highlights, micro-animations, refined dark monochromatic palette with pops of cyan, sophisticated layouts, and perfect typography hierarchy.",
        creative:     "Make this portfolio BOLD and WOW-FACTOR creative with dark navy backgrounds, vibrant multi-color neon gradients (cyan #00d9ff, purple, pink), unique asymmetric layouts, dynamic entrance animations, creative geometric shapes with glow effects, eye-catching visual elements, professional hero with portrait, and artistic flair.",
        professional: "Redesign this portfolio with PREMIUM corporate dark aesthetic: dark navy theme (#0f172a), polished card layouts with glassmorphism, cyan/blue professional accents (#1e90ff), sophisticated hover animations with glows, professional hero section with large portrait area, elegant typography, credibility-focused sections, and executive presence.",
        dark:         "Transform this portfolio to use an ULTRA-SLEEK dark theme with deep navy backgrounds (#0a192f, #0f1729), electric cyan neon accents (#00d9ff) with intense glow effects, professional portrait hero section with glowing geometric overlays, glassmorphism effects, cyberpunk aesthetics with glowing borders, tech-forward styling, hover glow animations, and premium developer vibes.",
        startup:      "Redesign this portfolio with HIGH-ENERGY tech startup aesthetics: dark backgrounds with bold cyan/blue gradient overlays, dynamic scroll animations, modern glassmorphic card designs with neon shadows, innovative asymmetric layouts, energetic color combinations with cyan accents, professional hero with portrait, and cutting-edge visual trends.",
    };

    const prompt = `
You are an elite web designer. Redesign the following portfolio HTML in the "${template}" style.

${templatePrompts[template]}

Requirements:
- Return ONLY complete HTML.
- Preserve all existing content exactly: text, links, structure, and meaning.
- Improve visuals, layout, responsiveness, typography, spacing, and interaction quality.
- Use CSS variables for main theme colors: var(--bg-color), var(--text-color), var(--primary-color).
- Prefer a premium dark aesthetic with gradients, subtle glow, glassmorphism, and clear section hierarchy.
- Add tasteful motion: hero/background animation, reveal-on-scroll, polished hover states, animated buttons, and enhanced cards.
- Keep performance reasonable and include prefers-reduced-motion support.
- No external JS libraries.
- Output should feel modern, impressive, and production-ready, but not overloaded.

Current Portfolio HTML:
${htmlContent}
`;

    return await generateWithFallback(prompt);
}

// Keep backward compat exports
async function generateWithRetry(modelName, prompt, retries = 1) {
    return generateWithGemini(modelName, prompt, retries);
}

module.exports = {
    generatePortfolio,
    applyPortfolioTemplate,
    generateWithRetry,
    generateWithFallback,
    runGeminiSanityCheck,
};

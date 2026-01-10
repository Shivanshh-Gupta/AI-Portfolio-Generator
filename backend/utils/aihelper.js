const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: "AIzaSyCtuuAoRHAg9xMgMeR1mlzGqcCZajNSWGg" });

async function generatePortfolio(resumeText, existingHtml = null, mode = "new", template = "modern") {
  const templatePrompts = {
    modern: "Use a modern, clean design with gradient backgrounds, smooth animations, and glassmorphism effects.",
    minimal: "Create a minimal, elegant design focusing on typography and whitespace.",
    creative: "Design a bold, creative portfolio with unique layouts and vibrant styling.",
    professional: "Build a professional corporate portfolio emphasizing credentials and expertise.",
    dark: "Create a sleek dark-themed portfolio perfect for tech professionals.",
    startup: "Design a modern tech startup aesthetic with energetic visuals.",
  }

  const modePrompt = mode === "update" 
    ? "Improve and refine the existing portfolio design while keeping the same content structure."
    : `Convert the following resume into a PREMIUM, visually impressive personal portfolio website. ${templatePrompts[template] || templatePrompts.modern}`

  const existingContext = existingHtml
    ? `\n\nExisting Portfolio HTML (refine this):\n${existingHtml}`
    : ""

  const prompt = `
${modePrompt}

⚠️ CRITICAL COLOR RULE:
- DO NOT use any hardcoded colors (no hex, rgb, named colors, etc)
- Do NOT use inline styles for colors
- Do NOT use color attributes
- ONLY use CSS variables: var(--bg-color), var(--text-color), var(--primary-color)

DESIGN REQUIREMENTS:
- Hero section with name, title, tagline, CTA buttons
- Modern layout with cards and spacing
- Sections only if data exists
- No fake data
- Responsive
- Output COMPLETE HTML document
- Use <style> tag only
- No inline styles
- Use semantic HTML

Resume Content:
${resumeText}${existingContext}

Return ONLY the complete HTML code.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
    });

    let htmlContent = "";

  if (response.candidates?.length) {
    const parts = response.candidates[0].content?.parts || [];
    htmlContent = parts
      .filter((p) => p.text)
      .map((p) => p.text)
      .join("");
  }

  return htmlContent || response.text || "";
}

async function applyPortfolioTemplate(htmlContent, template) {
  const templatePrompts = {
    modern: "Transform this portfolio to a modern design with gradient backgrounds, smooth animations, and glassmorphism effects.",
    minimal: "Redesign this portfolio to be minimal and elegant, focusing on typography and whitespace.",
    creative: "Make this portfolio bold and creative with unique layouts and vibrant styling.",
    professional: "Redesign this portfolio to have a professional corporate aesthetic.",
    dark: "Transform this portfolio to use a sleek dark theme.",
    startup: "Redesign this portfolio with a modern tech startup aesthetic.",
  }

  const prompt = `
You are an expert web designer. Transform the following portfolio HTML to match the "${template}" style.

${templatePrompts[template]}

Current Portfolio HTML:
${htmlContent}

CRITICAL RULES:
- Keep all existing content (name, email, skills, projects, etc.)
- DO NOT use any hardcoded colors (no hex, rgb, named colors)
- ONLY use CSS variables: var(--bg-color), var(--text-color), var(--primary-color)
- Maintain responsiveness
- Return ONLY the complete modified HTML code
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  let htmlContent_result = "";

  if (response.candidates?.length) {
    const parts = response.candidates[0].content?.parts || [];
    htmlContent_result = parts
      .filter((p) => p.text)
      .map((p) => p.text)
      .join("");
  }

  return htmlContent_result || response.text || "";
}

module.exports = { generatePortfolio, applyPortfolioTemplate };
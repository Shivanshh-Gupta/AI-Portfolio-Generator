const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

// Initialize the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function generateWithRetry(modelName, prompt, retries = 3) {
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            config: {
                temperature: 0.7,
            }
        });

        // ---------------------------------------------------------
        // ✅ CRITICAL FIX FOR @google/genai SDK
        // The response is an OBJECT, not a class. It has no .text() method.
        // We must access the text property directly.
        // ---------------------------------------------------------

        // 1. Check if top-level text exists (sometimes used in simplified responses)
        if (typeof response.text === 'string') {
            return response.text;
        }

        // 2. Standard access path for the new SDK
        if (response.candidates && response.candidates.length > 0) {
            const firstCandidate = response.candidates[0];
            if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0) {
                return firstCandidate.content.parts[0].text;
            }
        }

        return ""; // Return empty string if generation failed gracefully

    } catch (error) {
        // Handle Quota (429) or Overload (503)
        const status = error.status || (error.response ? error.response.status : null);

        if ((status === 429 || status === 503) && retries > 0) {
            console.log(`⚠️ API Busy/Quota hit. Retrying in 4 seconds... (${retries} attempts left)`);
            await new Promise(res => setTimeout(res, 4000));
            return generateWithRetry(modelName, prompt, retries - 1);
        }

        console.error("❌ AI Generation Error:", error);
        throw error;
    }
}

async function generatePortfolio(resumeText, existingHtml = null, mode = "new", template = "modern") {
    const templatePrompts = {
        modern: "Create a STUNNING modern portfolio with deep navy/dark blue gradients (#0a192f to #1e3a5f), vibrant cyan/blue accents (#00d9ff, #1e90ff), glassmorphism cards with backdrop-blur, smooth scroll animations, floating glowing elements, professional hero section with large portrait area, premium spacing, and elegant hover effects with glow transitions.",
        minimal: "Design an ELEGANT minimal portfolio with sophisticated dark backgrounds, premium typography (Inter/Outfit from Google Fonts), generous whitespace, subtle cyan accent highlights, micro-animations, refined monochromatic palette with pops of color, and clean professional layouts.",
        creative: "Build a BOLD creative portfolio with dark navy backgrounds, vibrant neon gradients (cyan, purple, pink), asymmetric layouts, dynamic entrance animations, creative geometric shapes, eye-catching glowing elements, and artistic sections with WOW-factor visuals.",
        professional: "Create a PREMIUM corporate portfolio with dark sophisticated theme (navy #0f172a), polished card layouts, cyan/blue professional accents, refined animations, executive presence, credibility-focused sections, elegant typography, and a stunning hero section with professional photo placement.",
        dark: "Design an ULTRA-SLEEK dark-themed portfolio with deep dark navy backgrounds (#0a192f, #0f1729), electric cyan neon accents (#00d9ff with glow), professional portrait hero section, glassmorphism effects, smooth gradients, cyberpunk aesthetics with glowing lines/borders, modern tech styling, hover glow effects, and premium developer vibes.",
        startup: "Build a HIGH-ENERGY tech startup portfolio with dark backgrounds, bold cyan/blue gradient overlays, dynamic scroll animations, modern glassmorphic cards with shadows, innovative asymmetric layouts, energetic neon accents, cutting-edge visual trends, and professional hero with portrait.",
    };

    const modePrompt = mode === "update"
        ? "Dramatically improve and elevate the existing portfolio design with premium visual elements while keeping the same content structure."
        : `Convert the following resume into an ABSOLUTELY STUNNING, PREMIUM, VISUALLY IMPRESSIVE personal portfolio website that will WOW anyone who sees it. ${templatePrompts[template] || templatePrompts.modern}`;

    const existingContext = existingHtml
        ? `\n\nExisting Portfolio HTML (elevate this to premium quality):\n${existingHtml}`
        : "";

    const prompt = `
${modePrompt}

🎨 CRITICAL DESIGN PHILOSOPHY:
This portfolio MUST be ULTRA-DYNAMIC, HIGHLY ANIMATED, and VISUALLY STUNNING - like a premium interactive experience.
DO NOT create a static, simple, or boring design. EVERY element should move, glow, transform, or react to user interaction.
Think: award-winning portfolio websites with WOW-factor animations and cutting-edge visual effects.

⚠️ CRITICAL COLOR & THEMING RULES:
- DO NOT use hardcoded colors (no hex, rgb, named colors) for PRIMARY background, text, or accent elements
- ONLY use these CSS variables for themeable elements:
    var(--bg-color) - Main background
    var(--text-color) - Primary text
    var(--primary-color) - Accent/brand color
- You CAN and SHOULD use vibrant hardcoded colors for:
    • Animated gradient overlays with keyframe color shifts
    • Particle effects and floating elements (cyan #00d9ff, blue #1e90ff, purple #a855f7)
    • Glowing box-shadows and neon effects
    • Decorative animated backgrounds
    • Gradient text and animated borders
- All major UI elements MUST respect the theme variables

🌟 MANDATORY PREMIUM DESIGN ELEMENTS:

1. **ULTRA-DYNAMIC HERO SECTION** (Must be breathtakingly animated):
   - Dark navy/deep blue animated gradient background with shifting colors (use @keyframes)
   - Multiple floating/orbiting particles using CSS animations (20-30 small glowing dots)
   - Large professional portrait/photo with 3D tilt effect on mouse hover (transform: perspective)
   - ANIMATED TYPING EFFECT for name or tagline (use @keyframes to simulate typing)
   - Glowing geometric shapes that rotate and pulse (use rotate, scale animations)
   - Parallax scrolling effect (background moves slower than foreground)
   - Animated gradient text that shifts colors continuously
   - Navigation with smooth scroll, active state animations, and underline slide effects
   - Buttons with ripple effect, glow pulse animation, and 3D lift on hover
   - Floating decorative elements (circles, triangles, lines) that move in different directions
   - Background with ANIMATED mesh gradient or aurora effect
   - Social icons that bounce, rotate, or flip on hover
   - Cursor follow effect (elements slightly follow mouse movement)
   - Staggered fade-in animation for all hero elements (200ms delay between each)

2. **ADVANCED TYPOGRAPHY WITH ANIMATIONS**:
   - Import Google Fonts (Inter, Poppins, Outfit, Space Grotesk)
   - Animated gradient text for main headings (gradient position shifts with keyframes)
   - Text-shadow animations that pulse or glow on hover
   - Split-text animation effects (letters/words appear one by one)
   - Glitch effect or neon flicker on accent text
   - Proper hierarchy with smooth scale animations on scroll into view

3. **ULTRA-INTERACTIVE CARD DESIGNS**:
   - Glassmorphism with animated backdrop-blur (blur amount changes on hover)
   - 3D card flip effects on hover (rotateY transforms)
   - Cards that tilt based on mouse position (3D perspective transform)
   - Animated gradient borders that rotate around cards
   - Hover glow that expands with smooth box-shadow transitions
   - Particle burst effect when hovering over cards
   - Cards that float up and down with continuous animation
   - Magnetic effect (cards slightly move toward cursor)
   - Shimmer/shine effect passing across card on hover
   - Staggered entrance animations (each card appears 150ms after previous)

4. **EXTENSIVE ADVANCED ANIMATIONS** (CRITICAL - Make it HIGHLY dynamic):
   - Scroll-triggered animations (elements fade/slide in when scrolling into view)
   - Parallax effects on multiple layers (foreground, midground, background)
   - Continuous floating/bobbing animations on decorative elements
   - Rotating and pulsing glow effects around important elements
   - Wave/ripple animations on section backgrounds
   - Morphing blob shapes in the background using @keyframes
   - Smooth scroll behavior with snap points
   - Progress bar/scroll indicator that fills as you scroll
   - Skill bars that animate to percentage when visible
   - Counter animations (numbers count up from 0)
   - Text reveal animations (slide, fade, clip-path)
   - Infinite animations (floating, pulsing, rotating) on decorative elements
   - Stagger delays for lists and grids (sequential appearance)
   - Page load animations (entire page animates in)

5. **DYNAMIC MODERN LAYOUT**:
   - Bento grid layouts with varying card sizes
   - Masonry layouts for project galleries
   - Sticky navigation that changes style on scroll
   - Sections with animated decorative shapes (triangles, circles) in corners
   - Animated dividers between sections (gradient lines that expand)
   - Asymmetric hero with animated geometric patterns

6. **ANIMATED COLORS & GRADIENTS** (Create mesmerizing visual effects):
   - ANIMATED background gradients that shift between colors using @keyframes
   - Gradient mesh backgrounds with 3-4 color stops that move
   - Vibrant cyan/blue/purple accents: #00d9ff, #1e90ff, #a855f7, #ec4899
   - Animated glowing effects: pulsing box-shadows with @keyframes
   - Iridescent/holographic gradient effects on key elements
   - Aurora/northern lights style animated backgrounds
   - Color-shifting text (gradient animation on headings)
   - Neon glow that intensifies and fades in a loop
   - Radial gradients with animated position
   - Multi-layered gradients with different animation speeds

7. **ADVANCED INTERACTIVE ELEMENTS**:
   - Buttons with magnetic hover effect (button expands toward cursor)
   - Ripple click effect that emanates from click point
   - Liquid/blob cursor that follows mouse (custom cursor design)
   - Loading animations with skeleton screens
   - Hover state with particle burst effect
   - 3D button press effect (transform: translateZ)
   - Button text that glitches or shifts on hover
   - Icon animations (spin, bounce, wiggle) on hover
   - Pulse/heartbeat animation on primary CTAs
   - Trail effect following cursor movement

8. **SECTIONS WITH SPECIAL EFFECTS** (only if data exists):
   - 🎯 Hero: Particle background, typing effect, 3D transforms, floating elements
   - 💼 About: Animated text reveal, morphing background shapes, timeline with animations
   - 💪 Skills: Animated progress bars, skill cards that flip, icon animations, percentage counters
   - 🚀 Projects: 3D card hover, image zoom/pan on hover, category filter animations, masonry grid
   - 💼 Experience: Vertical timeline with scroll animations, expanding cards, animated connectors
   - 🎓 Education: Certificate cards with hover effects, animated badges
   - 🏆 Achievements: Trophy/medal animations, confetti effect, glowing badges
   - 📧 Contact: Animated form inputs, social icons with bounce effects, map with marker pulse
   - EACH section must have scroll-triggered entrance animations

9. **RESPONSIVE WITH ANIMATIONS**:
   - Mobile-first with touch-optimized animations
   - Reduce animation complexity on mobile for performance
   - Hamburger menu with smooth slide-in animation
   - Touch gestures for mobile interactions
   - Responsive particles (fewer on mobile)

10. **TECHNICAL EXCELLENCE WITH EFFECTS**:
    - Extensive @keyframes animations (at least 10-15 different animations)
    - CSS custom properties for animation timings and colors
    - Intersection Observer pattern for scroll animations (simulate with CSS if needed)
    - Transform and translate3d for GPU-accelerated animations
    - Will-change property for performance
    - Smooth 60fps animations
    - No external libraries - pure CSS animations and transforms
    - Accessibility: prefers-reduced-motion media query to disable animations if requested

Resume Content:
${resumeText}${existingContext}

🎯 FINAL CRITICAL REQUIREMENTS:
- Return ONLY the complete HTML code (no markdown, no explanations)
- The portfolio MUST be ULTRA-DYNAMIC with EXTENSIVE ANIMATIONS throughout
- Include at least 15+ different @keyframes animations (floating, pulsing, rotating, gradient-shift, etc.)
- EVERY interactive element must have hover effects and transitions
- Add particle effects, floating elements, and animated backgrounds
- Create scroll-triggered animations for ALL sections (fade-in, slide-in, scale)
- Dark navy backgrounds (#0a192f, #0f1729) with ANIMATED gradients
- Neon cyan/blue/purple accents (#00d9ff, #1e90ff, #a855f7) with glow animations
- 3D transforms and perspective effects on cards and images
- Typing effect or text reveal animations on hero text
- Continuous subtle animations (floating, pulsing) that run infinitely
- Skill bars that animate to their percentage values
- Buttons with magnetic hover, ripple effects, and 3D transforms
- Professional portrait area with tilt/3D effect on hover
- The page should feel ALIVE and DYNAMIC - not static!
- WOW factor is CRITICAL - every element should move, glow, or respond
- Think: Award-winning interactive portfolio with cutting-edge animations
- NO static, simple, or boring designs - make it IMPRESSIVE!

Return the complete HTML with EXTENSIVE animations now.
`;

    // Use Gemini 2.5 Flash (Current Stable)
    return await generateWithRetry("gemini-2.5-flash", prompt);
}

async function applyPortfolioTemplate(htmlContent, template) {
    const templatePrompts = {
        modern: "Transform this portfolio to a STUNNING modern design with deep navy/dark blue backgrounds (#0a192f, #1e3a5f), vibrant cyan accents (#00d9ff, #1e90ff), glassmorphism cards with backdrop-filter and glow effects, smooth scroll animations, floating glowing elements, professional hero section with large portrait placement, premium spacing, and elegant hover effects with neon glows.",
        minimal: "Redesign this portfolio to be ELEGANTLY minimal with sophisticated dark navy backgrounds, premium Google Fonts (Inter/Outfit), generous whitespace, subtle cyan accent highlights, micro-animations, refined dark monochromatic palette with pops of cyan, sophisticated layouts, and perfect typography hierarchy.",
        creative: "Make this portfolio BOLD and WOW-FACTOR creative with dark navy backgrounds, vibrant multi-color neon gradients (cyan #00d9ff, purple, pink), unique asymmetric layouts, dynamic entrance animations, creative geometric shapes with glow effects, eye-catching visual elements, professional hero with portrait, and artistic flair.",
        professional: "Redesign this portfolio with PREMIUM corporate dark aesthetic: dark navy theme (#0f172a), polished card layouts with glassmorphism, cyan/blue professional accents (#1e90ff), sophisticated hover animations with glows, professional hero section with large portrait area, elegant typography, credibility-focused sections, and executive presence.",
        dark: "Transform this portfolio to use an ULTRA-SLEEK dark theme with deep navy backgrounds (#0a192f, #0f1729), electric cyan neon accents (#00d9ff) with intense glow effects, professional portrait hero section with glowing geometric overlays, glassmorphism effects, cyberpunk aesthetics with glowing borders, tech-forward styling, hover glow animations, and premium developer vibes.",
        startup: "Redesign this portfolio with HIGH-ENERGY tech startup aesthetics: dark backgrounds with bold cyan/blue gradient overlays, dynamic scroll animations, modern glassmorphic card designs with neon shadows, innovative asymmetric layouts, energetic color combinations with cyan accents, professional hero with portrait, and cutting-edge visual trends.",
    };

    const prompt = `
You are an ELITE web designer creating PREMIUM portfolio designs.

Transform the following portfolio HTML to match the "${template}" style with MAXIMUM visual impact.

${templatePrompts[template]}

Current Portfolio HTML:
${htmlContent}

🎨 TRANSFORMATION REQUIREMENTS:

⚠️ CRITICAL COLOR & THEMING RULES:
- Keep all content (name, email, skills, projects, etc.) EXACTLY as-is
- DO NOT use hardcoded colors for PRIMARY background, text, or accents
- MUST use CSS variables for themeable elements:
    var(--bg-color) - Main background
    var(--text-color) - Primary text  
    var(--primary-color) - Accent/brand color
- You CAN use subtle hardcoded colors for:
    • Gradient overlays (rgba values)
    • Decorative elements
    • Shadows and glows
    • Borders

🌟 MANDATORY PREMIUM ELEMENTS FOR "${template}" TEMPLATE:

1. **ULTRA-DYNAMIC HERO**: Dark navy animated gradient background, 20-30 floating particles, large portrait with 3D tilt on hover, ANIMATED TYPING EFFECT on name/tagline, rotating glowing geometric shapes, parallax scroll, premium buttons (filled + outlined cyan) with ripple and 3D hover, navigation with slide animations, social icons with bounce/rotate effects, background aurora/mesh gradient animation, staggered fade-in for all elements

2. **ADVANCED ANIMATED TYPOGRAPHY**: Import Google Fonts (Inter/Outfit/Poppins/Space Grotesk), animated gradient text that shifts colors continuously, pulsing text-shadow on hover, split-text letter animations, glitch/flicker effects on accents, scale animations on scroll, white/light text on dark with glow effects

3. **ULTRA-INTERACTIVE GLASSMORPHISM CARDS**: Dark semi-transparent with animated backdrop-blur, 3D flip on hover (rotateY), tilt based on mouse position (perspective transform), rotating animated gradient borders, expanding glow shadows, particle burst on hover, floating up/down continuously, magnetic effect (move toward cursor), shimmer shine passing across, staggered entrance with 150ms delays

4. **EXTENSIVE ANIMATIONS** (CRITICAL): Scroll-triggered fade/slide-in for ALL sections, parallax on multiple layers, continuous floating/bobbing on decorative elements, rotating/pulsing glows, wave/ripple on backgrounds, morphing blob shapes with @keyframes, smooth scroll with snap points, animated progress/scroll indicator, skill bars animating to %, number counters, text reveals with clip-path, infinite animations everywhere, stagger delays, page load animations

5. **DYNAMIC DARK LAYOUTS**: Deep navy (#0a192f, #0f1729, #1e3a5f) with ANIMATED gradients, bento/masonry grids, sticky nav that changes on scroll, animated decorative shapes in corners, expanding gradient dividers, asymmetric hero with geometric patterns, generous spacing, responsive containers

6. **ANIMATED GRADIENTS & GLOWS**: Background gradients shifting colors with @keyframes, mesh gradients with moving color stops, cyan/blue/purple/pink accents (#00d9ff, #1e90ff, #a855f7, #ec4899), pulsing glowing box-shadows (0 0 20px rgba(0, 217, 255, 0.3)), iridescent/holographic effects, aurora backgrounds, color-shifting text, neon glow loops, animated radial gradients, multi-layer gradients at different speeds

7. **ADVANCED INTERACTIVE BUTTONS**: Magnetic hover (expand toward cursor), ripple click effect, liquid blob cursor follower, particle burst on hover, 3D press effect (translateZ), text glitch on hover, icon spin/bounce/wiggle, pulse heartbeat on CTAs, cursor trail effects, smooth 0.3s transitions with cubic-bezier easing

8. **SECTIONS WITH SPECIAL FX**: Hero (particles, typing, 3D, floating), About (text reveal, morphing shapes, animated timeline), Skills (animated progress bars, flip cards, counters), Projects (3D hover, image zoom, filter animations, masonry), Experience (timeline with scroll animations, expanding cards, connectors), Education (hover effects, badges), Achievements (confetti, glowing badges), Contact (animated inputs, bouncing icons), scroll-triggered entrance for EACH section

9. **RESPONSIVE ANIMATIONS**: Touch-optimized, reduced complexity on mobile, hamburger with slide-in, touch gestures, fewer particles on mobile, portrait scales down, all animations fluid across breakpoints

10. **TECHNICAL ANIMATION EXCELLENCE**: 15+ @keyframes animations (float, pulse, rotate, gradient-shift, wave, morph, etc.), CSS custom properties, Intersection Observer simulation, translate3d for GPU acceleration, will-change for performance, 60fps smooth, prefers-reduced-motion support, no external libraries, pure CSS magic

🎯 DESIGN QUALITY STANDARDS:
- This MUST be ULTRA-DYNAMIC with animations on EVERY element
- Every visitor should be AMAZED by the level of interactivity and motion
- Think: Award-winning interactive portfolios, Awwwards.com level quality
- Reference: Cutting-edge developer portfolios with particle effects and 3D transforms  
- The page should feel ALIVE - continuous subtle movements everywhere
- CRITICAL: Include 15+ @keyframes animations minimum
- NO static, flat, or boring sections - everything must move, glow, or respond
- Make it so impressive that it stands out from 99% of portfolios

Return ONLY the complete transformed HTML code (no markdown, no explanations).
Make it ULTRA-DYNAMIC and BREATHTAKING!
`;

    return await generateWithRetry("gemini-2.5-flash", prompt);
}

module.exports = { generatePortfolio, applyPortfolioTemplate };
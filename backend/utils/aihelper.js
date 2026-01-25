const { GoogleGenAI } = require("@google/genai");
<<<<<<< HEAD
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function generatePortfolio(resumeText, existingHtml = null, mode = "new", template = "modern") {
   const modePrompt = mode === "update"
      ? "Improve and refine the existing portfolio design while keeping the same content structure."
      : `Transform this resume into a STUNNING, PROFESSIONAL personal portfolio website.`

   const existingContext = existingHtml
      ? `\n\nExisting Portfolio HTML (refine this):\n${existingHtml}`
      : ""

   const prompt = `
You are an EXPERT web designer. Create a BEAUTIFUL, PROFESSIONAL portfolio website.

${modePrompt}

🎨 CRITICAL DESIGN REQUIREMENTS:

1. COMPLETE HTML STRUCTURE:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --bg-color: #ffffff;
            --text-color: #2c3e50;
            --primary-color: #ff6b35;
            --secondary-color: #f8f9fa;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        
        /* Navigation */
        nav {
            position: sticky;
            top: 0;
            background: white;
            padding: 20px 0;
            box-shadow: var(--shadow);
            z-index: 1000;
        }
        
        nav .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        nav .logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }
        
        nav a {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
            transition: color 0.3s;
        }
        
        nav a:hover {
            color: var(--primary-color);
        }
        
        .btn-chat {
            background: var(--primary-color);
            color: white;
            padding: 10px 25px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.3s;
        }
        
        .btn-chat:hover {
            transform: translateY(-2px);
        }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        
        .hero .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }
        
        .hero-content h3 {
            color: var(--primary-color);
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 20px;
        }
        
        .hero-content h1 {
            font-size: 56px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 20px;
        }
        
        .hero-content h1 .highlight {
            color: var(--primary-color);
        }
        
        .hero-content p {
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .hero-buttons {
            display: flex;
            gap: 20px;
        }
        
        .btn-primary {
            background: var(--primary-color);
            color: white;
            padding: 15px 35px;
            border-radius: 6px;
            border: 2px solid var(--primary-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--text-color);
            padding: 15px 35px;
            border-radius: 6px;
            border: 2px solid var(--text-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-secondary:hover {
            background: var(--text-color);
            color: white;
        }
        
        .hero-image {
            position: relative;
        }
        
        .hero-image img {
            width: 100%;
            border-radius: 20px;
            box-shadow: var(--shadow);
        }
        
        .image-placeholder {
            width: 100%;
            height: 500px;
            background: linear-gradient(135deg, var(--primary-color) 0%, #ff8c5a 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
        }
        
        /* Sections */
        section {
            padding: 80px 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .section-title h2 {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .section-title p {
            font-size: 18px;
            color: #666;
        }
        
        /* Skills Grid */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        
        .skill-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: var(--shadow);
            transition: transform 0.3s;
        }
        
        .skill-card:hover {
            transform: translateY(-5px);
        }
        
        .skill-card h3 {
            font-size: 20px;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        /* Projects Grid */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .project-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: transform 0.3s;
        }
        
        .project-card:hover {
            transform: translateY(-5px);
        }
        
        .project-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .project-info {
            padding: 25px;
        }
        
        .project-info h3 {
            font-size: 22px;
            margin-bottom: 10px;
        }
        
        /* Footer */
        footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 40px 20px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero .container {
                grid-template-columns: 1fr;
            }
            
            .hero-content h1 {
                font-size: 36px;
            }
            
            nav ul {
                display: none;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <div class="logo">PORTFOLIO</div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="btn-chat">Let's Chat</button>
        </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content">
                <h3>WELCOME TO MY WORLD</h3>
                <h1>Hi, I'm <span class="highlight">[Name]</span></h1>
                <h1>[Job Title]</h1>
                <p>[Professional description from resume]</p>
                <div class="hero-buttons">
                    <button class="btn-primary">Hire Me Now</button>
                    <button class="btn-secondary">View My Work</button>
                </div>
            </div>
            <div class="hero-image">
                <div class="image-placeholder">👨‍💻</div>
            </div>
        </div>
    </section>
    
    <!-- Add more sections based on resume data -->
    
</body>
</html>

2. USE THIS EXACT STRUCTURE AND STYLING
3. Replace [Name], [Job Title], etc. with actual data from resume
4. Add sections ONLY if data exists in resume
5. Keep the professional, clean design
6. Use the color variables (--bg-color, --text-color, --primary-color)
=======

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
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

Resume Content:
${resumeText}${existingContext}

<<<<<<< HEAD
IMPORTANT:
- Return COMPLETE HTML with ALL the CSS shown above
- Make it look EXACTLY like the example
- Professional, clean, modern design
- Use actual resume data
- NO placeholder text if no data exists

Return ONLY the HTML code.
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
   const prompt = `
Transform this portfolio HTML to be more professional and attractive.

Current HTML:
${htmlContent}

REQUIREMENTS:
1. Keep all content and information
2. Improve the styling to be more professional
3. Add proper CSS with modern design
4. Use clean, professional layout
5. Add smooth transitions and hover effects
6. Make it responsive
7. Use CSS variables for colors (--bg-color, --text-color, --primary-color)

Return ONLY the complete modified HTML code.
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
=======
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
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
}

module.exports = { generatePortfolio, applyPortfolioTemplate };
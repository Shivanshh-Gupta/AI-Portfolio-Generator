const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: "AIzaSyCyWKSgs7dZCd4V91gkHb4KjwrKsRtGFFU" });

async function generatePortfolio(resumeText) {
  const prompt = `

Convert the following resume into a PREMIUM, modern, visually impressive
personal portfolio website.

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
${resumeText}

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

module.exports = { generatePortfolio};
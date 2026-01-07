const express = require("express");
const router = express.Router();
const { generatePortfolio } = require("../utils/aihelper");
const { templateStyles } = require("../utils/portfolioTemplateStyles");

router.post("/profile", async (req, res) => {
  try {
    const template = req.headers["x-template"] || "modern";
    const resumeText = req.body.resumeText; // Extract from your existing logic

    const html = await generatePortfolio(resumeText, null, "new", template);
    
    // Inject professional styles
    const styledHtml = injectTemplateStyles(html, template);

    res.json({ html: styledHtml });
  } catch (error) {
    console.error("Profile generation error:", error);
    res.status(500).json({ error: "Generation failed" });
  }
});

router.post("/apply-template", async (req, res) => {
  try {
    const { html, template } = req.body;

    if (!html || !template) {
      return res.status(400).json({ error: "HTML and template required" });
    }

    const styledHtml = injectTemplateStyles(html, template);

    res.json({ html: styledHtml });
  } catch (error) {
    console.error("Template application error:", error);
    res.status(500).json({ error: "Template application failed" });
  }
});

function injectTemplateStyles(html, template) {
  const styles = templateStyles[template] || templateStyles.modern;

  // Remove any existing style tags
  let cleanHtml = html.replace(/<style>[\s\S]*?<\/style>/gi, "");

  const styleTag = `<style>${styles}</style>`;

  if (cleanHtml.includes("</head>")) {
    return cleanHtml.replace("</head>", `${styleTag}</head>`);
  } else if (cleanHtml.includes("<body>")) {
    return cleanHtml.replace("<body>", `<head>${styleTag}</head><body>`);
  }

  return styleTag + cleanHtml;
}

module.exports = router;
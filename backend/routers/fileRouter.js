const express = require('express')
const multer = require('multer')

const { generatePortfolio, applyPortfolioTemplate } = require('../utils/aihelper');
const { extractTextFromPDF } = require('../utils/extract');
const { wrapWithProfessionalStyling } = require('../utils/stylingWrapper');
const authMiddleware = require('../middleware/authMiddleware');
const portfolioModel = require('../models/portfolioModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/profile', authMiddleware, upload.single('avatar'), async function (req, res, next) {
  try {
    console.log('📄 Portfolio generation started...');

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Extract text from PDF
    console.log('📝 Extracting text from PDF...');
    const extractedText = await extractTextFromPDF(req.file.path);
    console.log('✅ Text extracted, length:', extractedText.length);

    // Generate portfolio HTML using Gemini
    const generationMode = req.headers['x-generation-mode'] || 'new';
    const template = req.headers['x-template'] || 'modern';
    const existingHTML = req.headers['x-existing-html'];

    console.log('🤖 Generating portfolio with AI...');
    console.log('Template:', template, 'Mode:', generationMode);

    let portfolioHTML = await generatePortfolio(extractedText, existingHTML, generationMode, template);
    console.log('✅ AI generated HTML, length:', portfolioHTML.length);

    // Wrap with professional styling to ensure it looks good
    console.log('🎨 Applying professional styling...');
    portfolioHTML = wrapWithProfessionalStyling(portfolioHTML, template);
    console.log('✅ Styling applied, final length:', portfolioHTML.length);

    // Save portfolio to MongoDB
    const portfolio = new portfolioModel({
      userId: req.user.id,
      title: `Generated Portfolio - ${new Date().toLocaleDateString()}`,
      description: 'Automatically generated from resume',
      content: portfolioHTML,
      theme: 'light',
      template: template
    });

    await portfolio.save();
    console.log('💾 Portfolio saved to database');

    // Send the generated HTML as response
    res.status(200).json({
      success: true,
      html: portfolioHTML,
      portfolioId: portfolio._id,
      message: 'Portfolio generated and saved successfully'
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Failed to generate portfolio', details: error.message });
  }
})

router.post('/apply-template', authMiddleware, async (req, res) => {
  try {
    const { html, template } = req.body;

    if (!html || !template) {
      return res.status(400).json({ error: 'HTML content and template name are required' });
    }

    console.log(`🎨 Applying template '${template}' to existing portfolio...`);

    let newHtml = await applyPortfolioTemplate(html, template);

    // We can also wrap it again if strictly needed, but let's rely on AI for now 
    // or uncomment if styling issues persist
    // newHtml = wrapWithProfessionalStyling(newHtml, template);

    res.status(200).json({
      success: true,
      html: newHtml,
      message: 'Template applied successfully'
    });

  } catch (error) {
    console.error('❌ Error applying template:', error);
    res.status(500).json({ error: 'Failed to apply template', details: error.message });
  }
});

router.post('/photos/upload', upload.single('photos'), function (req, res, next) {

})

const uploadMiddleware = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.post('/cool-profile', uploadMiddleware, function (req, res, next) {

})

module.exports = router;
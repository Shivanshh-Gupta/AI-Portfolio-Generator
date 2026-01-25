const express = require('express')
const multer = require('multer')

const { generatePortfolio } = require('../utils/aihelper');
const { extractTextFromPDF } = require('../utils/extract');
<<<<<<< HEAD
const { wrapWithProfessionalStyling } = require('../utils/stylingWrapper');
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
const authMiddleware = require('../middleware/authMiddleware');
const portfolioModel = require('../models/portfolioModel');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
<<<<<<< HEAD
=======
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/profile', authMiddleware, upload.single('avatar'), async function (req, res, next) {
  try {
<<<<<<< HEAD
    console.log('📄 Portfolio generation started...');

=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Extract text from PDF
<<<<<<< HEAD
    console.log('📝 Extracting text from PDF...');
    const extractedText = await extractTextFromPDF(req.file.path);
    console.log('✅ Text extracted, length:', extractedText.length);
=======
    const extractedText = await extractTextFromPDF(req.file.path);
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

    // Generate portfolio HTML using Gemini
    const generationMode = req.headers['x-generation-mode'] || 'new';
    const template = req.headers['x-template'] || 'modern';
    const existingHTML = req.headers['x-existing-html'];

<<<<<<< HEAD
    console.log('🤖 Generating portfolio with AI...');
    console.log('Template:', template, 'Mode:', generationMode);

    let portfolioHTML = await generatePortfolio(extractedText, existingHTML, generationMode, template);
    console.log('✅ AI generated HTML, length:', portfolioHTML.length);

    // Wrap with professional styling to ensure it looks good
    console.log('🎨 Applying professional styling...');
    portfolioHTML = wrapWithProfessionalStyling(portfolioHTML, template);
    console.log('✅ Styling applied, final length:', portfolioHTML.length);
=======
    const portfolioHTML = await generatePortfolio(extractedText, existingHTML, generationMode, template);
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

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
<<<<<<< HEAD
    console.log('💾 Portfolio saved to database');
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

    // Send the generated HTML as response
    res.status(200).json({
      success: true,
      html: portfolioHTML,
      portfolioId: portfolio._id,
      message: 'Portfolio generated and saved successfully'
    });

  } catch (error) {
<<<<<<< HEAD
    console.error('❌ Error:', error);
=======
    console.error('Error:', error);
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
    res.status(500).json({ error: 'Failed to generate portfolio', details: error.message });
  }
})

router.post('/photos/upload', upload.single('photos'), function (req, res, next) {

})

const uploadMiddleware = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.post('/cool-profile', uploadMiddleware, function (req, res, next) {

})

module.exports = router;
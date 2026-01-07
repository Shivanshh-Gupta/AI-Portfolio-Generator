const express = require('express')
const multer = require('multer')

const { generatePortfolio } = require('../utils/aihelper'); 
const { extractTextFromPDF } = require('../utils/extract');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/profile', upload.single('avatar'), async function (req, res, next) {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(req.file.path);

    // Generate portfolio HTML using Gemini
    const portfolioHTML = await generatePortfolio(extractedText);

    // Send the generated HTML as response
    res.status(200).json({
      success: true,
      html: portfolioHTML,
      message: 'Portfolio generated successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate portfolio', details: error.message });
  }
})

router.post('/photos/upload', upload.single('photos'), function (req, res, next) {

})

const uploadMiddleware = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

router.post('/cool-profile', uploadMiddleware, function (req, res, next) {

})

module.exports = router;
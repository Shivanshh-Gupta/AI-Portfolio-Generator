const express = require('express');
const router = express.Router();
const portfolioModel = require('../models/portfolioModel');
const authMiddleware = require('../middleware/authMiddleware');

// CREATE PORTFOLIO
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, description, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const portfolio = new portfolioModel({
      userId: req.user.id,
      title,
      description,
      content
    });

    await portfolio.save();

    res.status(201).json({
      message: 'Portfolio created successfully',
      portfolio
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// SAVE PORTFOLIO (with theme and template)
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { title, description, content, theme, template } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const portfolio = new portfolioModel({
      userId: req.user.id,
      title,
      description: description || '',
      content,
      theme: theme || 'light',
      template: template || 'modern'
    });

    await portfolio.save();

    res.status(201).json({
      message: 'Portfolio saved successfully',
      portfolio
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET USER PORTFOLIOS
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const portfolios = await portfolioModel.find({ userId: req.user.id });
    res.status(200).json(portfolios);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET PORTFOLIO BY ID
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.status(200).json(portfolio);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// UPDATE PORTFOLIO
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await portfolioModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      message: 'Portfolio updated successfully',
      portfolio: updated
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// DELETE PORTFOLIO
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const portfolio = await portfolioModel.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    if (portfolio.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await portfolioModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;

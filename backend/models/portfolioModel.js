const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'light'
  },
  template: {
    type: String,
    default: 'modern'
  },
<<<<<<< HEAD
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  },
  shareCount: {
    type: Number,
    default: 0
  },
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);

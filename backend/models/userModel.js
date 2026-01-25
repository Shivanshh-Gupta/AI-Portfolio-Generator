const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    emailNotifications: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
=======
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
  }
});

// Hash password before saving
<<<<<<< HEAD
userSchema.pre('save', async function (next) {
=======
userSchema.pre('save', async function(next) {
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
<<<<<<< HEAD
userSchema.methods.comparePassword = async function (password) {
=======
userSchema.methods.comparePassword = async function(password) {
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');
const userRouter = require('./routers/userRouter');
const fileRouter = require('./routers/fileRouter');
const portfolioRouter = require('./routers/portfolioRouter');
<<<<<<< HEAD
const userProfileRouter = require('./routes/user');
const passport = require('passport');
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(passport.initialize());
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', userRouter);
app.use('/file', fileRouter);
app.use('/api/portfolio', portfolioRouter);
<<<<<<< HEAD
app.use('/api/user', userProfileRouter);
=======
>>>>>>> 8704c0d2b0435dd392d86958e1c5065b0c1bc970

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
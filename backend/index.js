const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');
const userRouter = require('./routers/userRouter');
const fileRouter = require('./routers/fileRouter');
const portfolioRouter = require('./routers/portfolioRouter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', userRouter);
app.use('/file', fileRouter);
app.use('/api/portfolio', portfolioRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
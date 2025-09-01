const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors({
  origin: 'https://lavish-salon.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,

}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/payments', require('./src/routes/paymentRoutes'));

app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'Salon Backend up' });
});

// Export the app for serverless and for a separate server entry
module.exports = app;
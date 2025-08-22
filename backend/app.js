const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();


dotenv.config();


app.use(cors({ origin: process.env.CLIENT_URL,   methods: ["GET", "POST"],credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));


// DB
mongoose.connect(process.env.MONGO_URI)
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


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
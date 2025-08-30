const express = require('express');
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const pricing = require('../config/pricing');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


router.post('/create-order', async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;
    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const priceInInr = pricing[service];
    if (!priceInInr) {
      return res.status(400).json({ message: 'Invalid service selected' });
    }

    const amountPaise = priceInInr * 100; // INR -> paise

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: 'rcpt_' + Date.now(),
      notes: { name, email, phone, service, date, time },
    });

    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      price: priceInInr,
      date,
      timeSlot: time,
      status: 'created',
      orderId: order.id,
    });

    return res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
      bookingId: booking._id,
      amount: amountPaise,
      currency: 'INR',
    });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 

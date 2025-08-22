const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true },
phone: { type: String, required: true },


service: { type: String, required: true },
price: { type: Number, required: true }, // in INR


date: { type: String, required: true }, // YYYY-MM-DD
timeSlot: { type: String, required: true }, // e.g. "10:00 AM - 11:00 AM"


status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created' },


orderId: { type: String },
paymentId: { type: String },
signature: { type: String },
},
{ timestamps: true }
);


module.exports = mongoose.model("Booking", BookingSchema, "bookings");

const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema(
{
name: { type: String, required: true },
email: { type: String, required: true },
phone: { type: String, required: true },


service: { type: String, required: true },
price: { type: Number, required: true },


date: { type: String, required: true }, 
timeSlot: { type: String, required: true }, 
status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created' },


orderId: { type: String },
paymentId: { type: String },
signature: { type: String },
},
{ timestamps: true }
);


module.exports = mongoose.model("Booking", BookingSchema, "bookings");

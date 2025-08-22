const express = require('express');
const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const { verifyPaymentSignature, verifyWebhookSignature } = require('../utils/verifySignature');


const router = express.Router();


const razorpay = new Razorpay({
key_id: process.env.RAZORPAY_KEY_ID,
key_secret: process.env.RAZORPAY_KEY_SECRET,
});


/**
* POST /api/payments/verify
* Body: { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature }
* Used after Razorpay Checkout success on frontend.
*/
router.post('/verify', async (req, res) => {
try {
const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
return res.status(400).json({ message: 'Missing fields' });
}


const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
if (!isValid) {
await Booking.findByIdAndUpdate(bookingId, { status: 'failed' });
return res.status(400).json({ success: false, message: 'Invalid signature' });
}


const updated = await Booking.findByIdAndUpdate(
bookingId,
{
status: 'paid',
paymentId: razorpay_payment_id,
signature: razorpay_signature,
},
{ new: true }
);


res.json({ success: true, booking: updated });
} catch (err) {
console.error('Verify error:', err);
res.status(500).json({ message: 'Server error', error: err.message });
}
});


/**
* (Optional) Webhook endpoint: set RAW body parser just for this route in server.js if you enable.
* POST /api/payments/webhook
*/
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
try {
const signature = req.headers['x-razorpay-signature'];
const rawBody = req.body; // Buffer


const ok = verifyWebhookSignature(rawBody, signature);
if (!ok) return res.status(400).send('Invalid webhook signature');


const event = JSON.parse(rawBody.toString());
// You can handle the event here if needed

res.status(200).json({ received: true });
} catch (err) {
	console.error('Webhook error:', err);
	res.status(500).json({ message: 'Server error', error: err.message });
}
});

module.exports = router;
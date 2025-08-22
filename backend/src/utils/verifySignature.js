const crypto = require('crypto');


/**
* Verify payment signature from Razorpay Checkout redirect
* @param {string} orderId
* @param {string} paymentId
* @param {string} signature
* @returns {boolean}
*/
function verifyPaymentSignature(orderId, paymentId, signature) {
const secret = process.env.RAZORPAY_KEY_SECRET;
const hmac = crypto
.createHmac('sha256', secret)
.update(orderId + '|' + paymentId)
.digest('hex');
return hmac === signature;
}


/**
* Verify webhook signature using RAZORPAY_WEBHOOK_SECRET
*/
function verifyWebhookSignature(rawBody, receivedSignature) {
const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
const expected = crypto
.createHmac('sha256', secret)
.update(rawBody)
.digest('hex');
return expected === receivedSignature;
}


module.exports = { verifyPaymentSignature, verifyWebhookSignature };
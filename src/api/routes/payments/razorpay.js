const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Endpoint to create a Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in smallest currency unit
      currency: currency,
      receipt: crypto.randomBytes(16).toString('hex'),
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to verify Razorpay payment signature
router.post('/verify-payment', (req, res) => {
  const { paymentId, orderId, signature } = req.body;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest('hex');

  if (generatedSignature === signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});

module.exports = router;

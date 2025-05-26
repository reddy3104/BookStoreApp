const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cashfree credentials and environment
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Change to LIVE in production

// Generate unique 12-character orderId
function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256').update(uniqueId).digest('hex');
  return hash.substr(0, 12);
}

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create payment order
app.get('/payment', async (req, res) => {
  try {
    const orderId = generateOrderId();
    const request = {
      order_amount: 1.0,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: 'webcodder01',
        customer_phone: '9999999999',
        customer_name: 'Web Codder',
        customer_email: 'webcodder@example.com',
      },
    };

    const response = await Cashfree.PGCreateOrder('2023-08-01', request);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error?.response?.data?.message || error.message || error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
app.post('/verify', async (req, res) => {
  try {
    const { orderId } = req.body;
    const response = await Cashfree.PGOrderFetchPayments('2023-08-01', orderId);
    res.json(response.data);
  } catch (error) {
    console.error(error?.response?.data?.message || error.message || error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Use port from env or default to 1000
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Optional export

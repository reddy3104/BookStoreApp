const express = require("express");
const axios = require("axios");
const router = express.Router();

// POST /api/payment/create-order
router.post("/create-order", async (req, res) => {
  const { orderId, orderAmount, customerDetails } = req.body;

  // Input validation
  if (!orderId || !orderAmount || !customerDetails || !customerDetails.id || !customerDetails.name || !customerDetails.email || !customerDetails.phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Environment variables
  const CASHFREE_STAGE = process.env.CASHFREE_STAGE === "true";
  const CASHFREE_API_ID = process.env.CASHFREE_API_ID;
  const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

  const CASHFREE_STAGE_URL = "https://sandbox.cashfree.com/pg/orders";
  const CASHFREE_PROD_URL = "https://api.cashfree.com/pg/orders";
  const url = CASHFREE_STAGE ? CASHFREE_STAGE_URL : CASHFREE_PROD_URL;

  const data = {
    order_id: orderId,
    order_amount: parseFloat(orderAmount).toFixed(2),
    order_currency: "INR",
    customer_details: {
      customer_id: customerDetails.id,
      customer_name: customerDetails.name,
      customer_email: customerDetails.email,
      customer_phone: customerDetails.phone,
    },
    order_meta: {
      return_url: "https://bookstoreproject-frontend.onrender.com/payment-response?order_id={order_id}", // Update this with your actual frontend URL
    },
  };

  const headers = {
    "Content-Type": "application/json",
    "x-client-id": CASHFREE_API_ID,
    "x-client-secret": CASHFREE_SECRET_KEY,
    "x-api-version": "2022-09-01",
  };

  try {
    const response = await axios.post(url, data, { headers });

    const sessionId = response.data.payment_session_id;

    if (!sessionId) {
      return res.status(500).json({
        error: "Failed to create payment session",
        details: response.data,
      });
    }

    const paymentLink = `https://www.cashfree.com/pg/checkout/post/submit?session_id=${sessionId}`;

    return res.json({ paymentLink });
  } catch (error) {
    console.error("Cashfree error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to create payment order",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;

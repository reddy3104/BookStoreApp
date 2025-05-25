import React, { useState } from "react";
import API_URL from "../config"; // Ensure this points to your backend base URL

const UPIPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  // You can generate orderId on button click or here
  const generateOrderId = () => "order_" + Date.now();

  const orderAmount = 100; // Can be dynamic or from props/user input
  const customerDetails = {
    id: "cust123",
    name: "John Doe",
    email: "john@example.com",
    phone: "9999999999",
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setPaymentLink(null);

    const orderId = generateOrderId();

    try {
      const response = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, orderAmount, customerDetails }),
      });

      if (!response.ok) throw new Error("Network error");

      const data = await response.json();

      if (data.paymentLink) {
        setPaymentLink(data.paymentLink);
      } else {
        throw new Error("No payment link returned");
      }
    } catch (err) {
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>UPI Payment</h2>

      {loading && <p>Creating payment order...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {paymentLink ? (
        <div>
          <p>Payment link created:</p>
          <a href={paymentLink} target="_blank" rel="noreferrer noopener" style={{ color: "blue", textDecoration: "underline" }}>
            Pay Now
          </a>
          <p>
            Or scan the QR code from your payment app and use the link above.
          </p>
        </div>
      ) : (
        !loading && <button onClick={handlePayment}>Pay via UPI</button>
      )}
    </div>
  );
};

export default UPIPayment;

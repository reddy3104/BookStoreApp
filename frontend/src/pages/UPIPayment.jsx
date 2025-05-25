import React, { useState } from "react";

const UPIPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  const orderId = "order_" + Date.now();
  const orderAmount = 100;
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

    try {
      const response = await fetch("http://localhost:1000/api/v1/create-order", {
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
      {paymentLink && (
        <div>
          <p>Payment link created:</p>
          <a href={paymentLink} target="_blank" rel="noreferrer">
            Pay Now
          </a>
        </div>
      )}
      {!loading && !paymentLink && (
        <button onClick={handlePayment}>Pay via UPI</button>
      )}
    </div>
  );
};

export default UPIPayment;

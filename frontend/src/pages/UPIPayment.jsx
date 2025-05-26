// UPIPayment.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import API_URL from "../config";

function UPIPayment() {
  const [orderId, setOrderId] = useState("");
  const cashfreeRef = useRef(null);

  // Initialize Cashfree SDK once on component mount
  useEffect(() => {
    async function initializeSDK() {
      try {
        cashfreeRef.current = await load({ mode: "sandbox" }); // change to "live" in prod
      } catch (error) {
        console.error("Cashfree SDK initialization failed:", error);
      }
    }

    initializeSDK();
  }, []);

  // Fetch payment session id and order id from backend
  const getSessionId = async () => {
    try {
      const res = await axios.get(`${API_URL.replace("/api/v1", "")}/payment`);
      if (res.data && res.data.payment_session_id) {
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
      throw new Error("Invalid payment session response");
    } catch (error) {
      console.error("Error getting session ID:", error);
      return null;
    }
  };

  // Verify payment by orderId
  const verifyPayment = async (orderId) => {
    try {
      const res = await axios.post(`${API_URL.replace("/api/v1", "")}/verify`, {
        orderId,
      });
      if (res?.data) {
        alert("Payment verified successfully");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
    }
  };

  // Handle the payment button click
  const handleClick = async (e) => {
    e.preventDefault();
    if (!cashfreeRef.current) {
      alert("Payment SDK not initialized yet. Please try again.");
      return;
    }
    try {
      const sessionId = await getSessionId();
      if (!sessionId) return;

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfreeRef.current.checkout(checkoutOptions).then(() => {
        console.log("Payment initialized");
        verifyPayment(orderId);
      });
    } catch (error) {
      console.error("Payment initialization error:", error);
    }
  };

  return (
    <>
      <h1>Cashfree UPI Payment Gateway</h1>
      <div className="card">
        <button onClick={handleClick}>Pay now</button>
      </div>
    </>
  );
}

export default UPIPayment;

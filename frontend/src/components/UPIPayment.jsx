import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

const UPIPayment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const upiId = "9591751704@ibl"; // Your UPI ID
  const payeeName = "Booksy";

  // Headers for auth
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    // Fetch cart from localStorage or API, depending on your flow
    const cartData = localStorage.getItem("cartData");
    const totalFromStorage = localStorage.getItem("cartTotal");

    if (!cartData || !totalFromStorage) {
      alert("No cart data or amount found. Redirecting to cart.");
      navigate("/cart");
      return;
    }

    const parsedCart = JSON.parse(cartData);
    setCart(parsedCart);

    const amount = parseFloat(totalFromStorage);
    if (isNaN(amount) || amount <= 0) {
      alert("Invalid payment amount. Redirecting to cart.");
      navigate("/cart");
    } else {
      setCartTotal(amount.toFixed(2));
    }
  }, [navigate]);

  const upiUrl = `upi://pay?pa=${encodeURIComponent(
    upiId
  )}&pn=${encodeURIComponent(payeeName)}&am=${cartTotal}&cu=INR&tn=${encodeURIComponent(
    "Book Purchase"
  )}`;

  // Confirm payment handler
  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      const orderData = {
        order: cart,
        paymentMethod: "Online Payment",
      };

      const response = await axios.post(`${API_URL}/place-order`, orderData, {
        headers,
      });

      alert("Payment successful! Order placed.");

      // Clear cart data from localStorage
      localStorage.removeItem("cartData");
      localStorage.removeItem("cartTotal");

      // Optionally clear cart on backend or you can rely on place-order API to handle that

      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">Scan to Pay</h1>

      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
        <QRCodeCanvas value={upiUrl} size={250} />
      </div>

      <p className="mt-6 text-lg">
        Amount: <strong>₹ {cartTotal}</strong>
      </p>

      <p className="mt-2 text-center max-w-xs">
        Use any UPI app to scan the QR code and complete the payment.
      </p>

      <button
        onClick={handleConfirmPayment}
        disabled={loading}
        className="mt-8 bg-green-500 px-6 py-3 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Confirming Payment..." : "I have Paid - Confirm Order"}
      </button>

      <button
        onClick={() => navigate("/cart")}
        className="mt-4 text-gray-400 underline"
      >
        Back to Cart
      </button>
    </div>
  );
};

export default UPIPayment;

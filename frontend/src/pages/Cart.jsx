import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import API_URL from "../config";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    } else {
      const fetchCart = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${API_URL}/get-user-cart`, { headers });
          setCart(res.data.data);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          setCart([]);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalAmount = cart.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );
      setTotal(totalAmount);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const deleteItem = async (id) => {
    try {
      setDeletingItemId(id);
      const response = await axios.put(
        `${API_URL}/remove-from-cart/${id}`,
        {},
        { headers }
      );
      alert(response.data.message);

      // Refresh cart after deletion
      const res = await axios.get(`${API_URL}/get-user-cart`, { headers });
      setCart(res.data.data);
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item from cart.");
    } finally {
      setDeletingItemId(null);
    }
  };

  const placeOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setPlaceOrderLoading(true);
    if (paymentMethod === "Online Payment") {
      // Save cart and amount in localStorage before redirect
      localStorage.setItem("cartData", JSON.stringify(cart));
      localStorage.setItem("cartTotal", total.toString()); // save total as string
      navigate("/upi-payment");
      setPlaceOrderLoading(false);
    } else {
      // COD logic
      try {
        const orderData = {
          order: cart,
          paymentMethod,
        };

        const response = await axios.post(
          `${API_URL}/place-order`,
          orderData,
          { headers }
        );

        alert(response.data.message);
        navigate("/profile/orderHistory");
      } catch (error) {
        console.error("Order placement failed:", error);
        alert("Failed to place order. Please try again.");
      } finally {
        setPlaceOrderLoading(false);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8">
      {!cart || cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
          <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
          {cart.map((item) => (
            <div
              key={item._id}
              className="w-full my-6 rounded-lg bg-zinc-800 p-6 flex flex-col md:flex-row justify-between items-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-[15vh] md:h-[10vh] object-cover rounded-md shadow-md"
                />
                <div className="w-full">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2">
                    {item.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {item.desc.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {item.desc.slice(0, 65)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                    {item.desc.slice(0, 100)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 w-full md:w-auto space-x-4">
                <h2 className="text-zinc-100 text-3xl font-semibold">₹ {item.price}</h2>
                <button
                  disabled={deletingItemId === item._id}
                  className="bg-red-500 text-white hover:bg-red-600 rounded-full p-3 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => deleteItem(item._id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <AiFillDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 w-full flex items-center justify-end">
            <div className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-all hover:scale-105 ease-in-out duration-300">
              <h1 className="text-3xl text-white font-semibold mb-4">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-white">
                <h2>{cart.length} books</h2>
                <h2>₹ {total}</h2>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl text-white mb-2">Select Payment Method</h3>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio h-5 w-5 text-green-500 transition duration-200 ease-in-out"
                    />
                    <label htmlFor="cod" className="ml-2 text-white">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="onlinePayment"
                      name="paymentMethod"
                      value="Online Payment"
                      checked={paymentMethod === "Online Payment"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio h-5 w-5 text-green-500 transition duration-200 ease-in-out"
                    />
                    <label htmlFor="onlinePayment" className="ml-2 text-white">
                      Online Payment
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6">
                <button
                  disabled={placeOrderLoading}
                  className="bg-green-500 text-white rounded-full px-8 py-4 text-xl font-semibold w-full hover:bg-green-600 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={placeOrder}
                >
                  {placeOrderLoading ? "Processing..." : "Place your order"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

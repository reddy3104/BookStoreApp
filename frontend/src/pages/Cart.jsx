import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/");
    } else {
      const fetch = async () => {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", {
          headers,
        });
        setCart(res.data.data);
      };
      fetch();
    }
  }, []);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price;
      });
      setTotal(total);
    }
  }, [Cart]);

  const deletItem = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${id}`,
        {},
        { headers }
      );
      alert(response.data.message);
      // Refresh cart
      const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", {
        headers,
      });
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const PlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === "Online Payment") {
      // Save cart and amount in localStorage before redirect
      localStorage.setItem("cartData", JSON.stringify(Cart));
      localStorage.setItem("cartTotal", Total);
      navigate("/upi-payment");
    } else {
      // COD logic
      try {
        const orderData = {
          order: Cart,
          paymentMethod: paymentMethod,
        };

        const response = await axios.post(
          `http://localhost:1000/api/v1/place-order`,
          orderData,
          { headers }
        );

        alert(response.data.message);
        navigate("/profile/orderHistory");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8">
      {!Cart && <Loader />}
      {Cart && Cart.length === 0 && (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
          <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div
              className="w-full my-6 rounded-lg bg-zinc-800 p-6 flex flex-col md:flex-row justify-between items-center shadow-lg hover:shadow-xl transition-all"
              key={i}
            >
              <div className="flex items-center space-x-6">
                <img
                  src={items.url}
                  alt={items.title}
                  className="h-[15vh] md:h-[10vh] object-cover rounded-md shadow-md"
                />
                <div className="w-full">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2">
                    {items.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {items.desc.slice(0, 65)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                    {items.desc.slice(0, 100)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 w-full md:w-auto space-x-4">
                <h2 className="text-zinc-100 text-3xl font-semibold">
                  ₹ {items.price}
                </h2>
                <button
                  className="bg-red-500 text-white hover:bg-red-600 rounded-full p-3 flex items-center justify-center transition-all"
                  onClick={() => deletItem(items._id)}
                >
                  <AiFillDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 w-full flex items-center justify-end">
            <div className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-md w-full transition-all hover:scale-105 ease-in-out duration-300">
              <h1 className="text-3xl text-white font-semibold mb-4">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-white">
                <h2>{Cart.length} books</h2> <h2>₹ {Total}</h2>
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
                  className="bg-green-500 text-white rounded-full px-8 py-4 text-xl font-semibold w-full hover:bg-green-600 transition-all ease-in-out duration-300"
                  onClick={PlaceOrder}
                >
                  Place your order
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

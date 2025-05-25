import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(res.data.data || []); // Ensure it's not null
      } catch (err) {
        setError("Failed to load order history.");
      } finally {
        setLoading(false); // Turn off loading state
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt=""
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}

      {OrderHistory.length > 0 && (
        <div className="h-auto p-6 text-zinc-100 bg-zinc-900 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-zinc-800 p-4 rounded-t-xl shadow-md mb-4">
            <div className="col-span-1 text-center font-semibold text-lg">Sr.</div>
            <div className="col-span-3 text-center font-semibold text-lg">Books</div>
            <div className="col-span-4 text-center font-semibold text-lg">Description</div>
            <div className="col-span-2 text-center font-semibold text-lg">Price</div>
            <div className="col-span-2 text-center font-semibold text-lg">Status</div>
          </div>

          {/* Table Rows */}
          {OrderHistory.map((items, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-all duration-300 mb-4 shadow-md"
            >
              <div className="col-span-1 text-center">{i + 1}</div>
              <div className="col-span-3 text-center">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="text-lg text-blue-400 hover:text-blue-300 font-medium"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="col-span-4 text-center">
                <h1 className="text-sm text-zinc-300">{items.book.desc.slice(0, 50)} ...</h1>
              </div>
              <div className="col-span-2 text-center">
                <h1 className="text-xl font-semibold text-zinc-100">₹ {items.book.price}</h1>
              </div>
              <div className="col-span-2 text-center">
                <span
                  className={`py-1 px-3 rounded-full text-sm font-semibold ${
                    items.status === "Order placed"
                      ? "bg-yellow-400 text-zinc-900"
                      : items.status === "Canceled"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {items.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;

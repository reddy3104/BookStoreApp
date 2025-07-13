import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config"; // make sure this file exists

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    setError("");
    setSuccess("");
    try {
      const { url, title, author, price, desc, language } = Data;
      if (!url || !title || !author || !price || !desc || !language) {
        setError("All fields are required");
        return;
      }

      const response = await axios.post(`${API_URL}/add-book`, Data, {
        headers,
      });

      setSuccess(response.data.message);
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="h-full p-4 bg-zinc-800 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-8 text-center">
        Add Book
      </h1>
      <div className="p-6 bg-zinc-900 rounded-lg shadow-lg max-w-3xl mx-auto">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="url" className="text-zinc-400 mb-2 block">
            Image URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Enter image URL"
            className="w-full bg-zinc-800 text-zinc-100 p-3 rounded outline-none"
            value={Data.url}
            onChange={change}
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="text-zinc-400 mb-2 block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter book title"
            className="w-full bg-zinc-800 text-zinc-100 p-3 rounded outline-none"
            value={Data.title}
            onChange={change}
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label htmlFor="author" className="text-zinc-400 mb-2 block">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter author name"
            className="w-full bg-zinc-800 text-zinc-100 p-3 rounded outline-none"
            value={Data.author}
            onChange={change}
          />
        </div>

        {/* Language & Price */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="language" className="text-zinc-400 mb-2 block">
              Language
            </label>
            <input
              type="text"
              id="language"
              name="language"
              placeholder="Book language"
              className="w-full bg-zinc-800 text-zinc-100 p-3 rounded outline-none"
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="price" className="text-zinc-400 mb-2 block">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              className="w-full bg-zinc-800 text-zinc-100 p-3 rounded outline-none"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="desc" className="text-zinc-400 mb-2 block">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            rows="4"
            placeholder="Enter description"
            className="w-full bg-zinc-800 text-zinc-100 p-3 rounded outline-none"
            value={Data.desc}
            onChange={change}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          onClick={submit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;


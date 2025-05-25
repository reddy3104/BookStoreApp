import React, { useState } from "react";
import axios from "axios";

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
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    setError(""); // Reset error message before submitting
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        setError("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="h-full p-0 md:p-6 bg-zinc-800">
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100 mb-8 text-center">
        Add Book
      </h1>
      <div className="p-6 bg-zinc-900 rounded-lg shadow-lg max-w-4xl mx-auto">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div>
          <label htmlFor="url" className="text-zinc-400 mb-2 block">
            Image URL
          </label>
          <input
            type="text"
            id="url"
            className="w-full mt-2 bg-zinc-800 text-zinc-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
            name="url"
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-zinc-400 mb-2 block">
            Title of Book
          </label>
          <input
            type="text"
            id="title"
            className="w-full mt-2 bg-zinc-800 text-zinc-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="author" className="text-zinc-400 mb-2 block">
            Author of Book
          </label>
          <input
            type="text"
            id="author"
            className="w-full mt-2 bg-zinc-800 text-zinc-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author's name"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label htmlFor="language" className="text-zinc-400 mb-2 block">
              Language
            </label>
            <input
              type="text"
              id="language"
              className="w-full mt-2 bg-zinc-800 text-zinc-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book language"
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="price" className="text-zinc-400 mb-2 block">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full mt-2 bg-zinc-800 text-zinc-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price of book"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="desc" className="text-zinc-400 mb-2 block">
            Description of Book
          </label>
          <textarea
            id="desc"
            className="w-full mt-2 bg-zinc-800 text-zinc-100 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="Enter a short description"
            name="desc"
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-300 w-full"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;

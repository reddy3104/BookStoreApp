import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config";  // import the config

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
          `${API_URL}/add-book`, // use API_URL here
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
        {/* The rest of your form unchanged */}
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
        {/* ... other inputs ... */}
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

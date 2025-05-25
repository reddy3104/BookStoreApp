import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../../config";  // Adjust path as per your project structure

const UpdateBooks = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res = await axios.get(`${API_URL}/get-book-by-id/${id}`);

      setData({
        url: res.data.data.url,
        title: res.data.data.title,
        author: res.data.data.author,
        price: res.data.data.price,
        desc: res.data.data.desc,
        language: res.data.data.language,
      });
    };
    fetch();
  }, [id]);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const update = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(`${API_URL}/update-book`, Data, { headers });
        alert(response.data.message);
        history(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="px-8 py-10 bg-zinc-900 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-10">
        Update Book
      </h1>
      <div className="p-6 bg-zinc-800 rounded-xl shadow-lg space-y-6">
        {/* Image URL Input */}
        <div>
          <label htmlFor="url" className="text-zinc-400 text-sm">Image URL</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="text-zinc-400 text-sm">Title of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>

        {/* Author Input */}
        <div>
          <label htmlFor="author" className="text-zinc-400 text-sm">Author of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>

        {/* Language & Price Input */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="language" className="text-zinc-400 text-sm">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="price" className="text-zinc-400 text-sm">Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="desc" className="text-zinc-400 text-sm">Description of book</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            placeholder="Description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        {/* Update Button */}
        <div className="text-center">
          <button
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={update}
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooks;

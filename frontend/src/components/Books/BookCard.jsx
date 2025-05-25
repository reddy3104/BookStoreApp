import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const fallbackImage = "https://via.placeholder.com/240x360?text=No+Image";

const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const removeFromFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-from-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to remove from favourites:", error);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-2xl shadow-lg p-4 flex flex-col h-full transition-all duration-300 hover:scale-105 hover:bg-zinc-700 cursor-pointer">
      <Link to={`/view-book-details/${bookid}`}>
        <div className="overflow-hidden rounded-xl h-60">
          <img
            src={image || fallbackImage}
            alt={title || "Book"}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            onError={(e) => (e.target.src = fallbackImage)}
          />
        </div>
        <div className="mt-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-white line-clamp-1 min-h-[1.5rem]">{title}</h2>
          <p className="text-sm text-zinc-300 mt-1 min-h-[1.25rem]">by {author}</p>
          <div className="mt-auto text-yellow-400 font-bold text-lg hover:underline">₹ {price}</div>
        </div>
      </Link>

      {fav && (
        <button
          className="mt-4 bg-red-600 w-full rounded-lg text-white py-2 font-semibold hover:bg-red-700 hover:shadow-md transition duration-300 ease-in-out"
          onClick={removeFromFavourite}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;

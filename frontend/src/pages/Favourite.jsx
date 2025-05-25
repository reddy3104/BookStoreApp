import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import Loader from "./Loader";
import API_URL from "../config"; // Import API_URL

const Favourite = () => {
  const [FavBooks, setFavBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/get-favourite-books`, // Use API_URL here
          { headers }
        );
        setFavBooks(res.data.data);
      } catch (err) {
        console.error("Failed to fetch favourite books:", err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {!FavBooks && <Loader />}

      {FavBooks && FavBooks.length === 0 && (
        <div className="h-[80vh] px-4 text-zinc-100 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-500 mb-6 text-center">
            No favourite book
          </h1>
          <img src="./star.png" alt="No favourites" className="h-[20vh] mb-4" />
        </div>
      )}

      {FavBooks && FavBooks.length > 0 && (
        <div className="px-4 pb-16">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-300 mb-8">
            Favourite Books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {FavBooks.map((book, index) => (
              <BookCard
                key={book._id || index}
                bookid={book._id}
                image={book.url}
                title={book.title}
                author={book.author}
                price={book.price}
                fav={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourite;

import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import axios from "axios";
import Loader from "./Loader";
import API_URL from "../config"; // Adjust the path if needed

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-all-books`);
        const data = res.data?.data || [];
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const sorted = [...books];
    if (sortOption === "az") {
      sorted.sort((a, b) =>
        a.title?.trim().toLowerCase().localeCompare(b.title?.trim().toLowerCase())
      );
    } else if (sortOption === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredBooks(sorted);
  }, [sortOption, books]);

  return (
    <>
      {!books.length ? (
        <Loader />
      ) : (
        <div className="min-h-screen px-4 sm:px-10 py-8 bg-zinc-900 text-white">
          {/* Header and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h1 className="text-4xl font-bold text-yellow-400 w-full text-center sm:text-left ">
              All Books
            </h1>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none w-full bg-zinc-800 text-white border border-yellow-400 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Sort By</option>
                <option value="az">Title (A - Z)</option>
                <option value="low">Price (Low to High)</option>
                <option value="high">Price (High to Low)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-yellow-400">
                ▼
              </div>
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                bookid={book._id}
                image={book.url}
                title={book.title}
                author={book.author}
                price={book.price}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;

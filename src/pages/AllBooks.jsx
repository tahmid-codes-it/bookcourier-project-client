import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const { dark } = useTheme();

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div
      className={`min-h-screen px-6 py-12 transition-colors duration-300
        ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}
      `}
    >
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">All Books</h1>
        <p className="opacity-80">
          Browse all available books from our partnered libraries
        </p>
      </div>

      {/* Books Grid */}
      {books.length === 0 ? (
        <p className="text-center text-lg">No books available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map(book => (
            <Link
              key={book._id}
              to={`/all-books/${book._id}`}
              className={`rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer
                ${dark ? "bg-gray-800" : "bg-white"}
              `}
            >
              {/* Book Image */}
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-52 w-full object-cover"
              />

              {/* Book Info */}
              <div className="p-5 flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-2">
                  {book.title}
                </h2>

                <p className="text-sm opacity-80 line-clamp-3 flex-grow">
                  {book.description}
                </p>

                  
                <span className="mt-4 inline-block text-blue-600 font-semibold">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;

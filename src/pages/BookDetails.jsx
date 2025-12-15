import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const BookDetails = () => {
  const { id } = useParams();
  const { dark } = useTheme();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div
      className={`min-h-screen px-6 py-12 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}
    `}
    >
      <div
        className={`max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden
        ${dark ? "bg-gray-800" : "bg-white"}
      `}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />

          {/* Info */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-3">
              {book.title}
            </h1>

            <p className="mb-4 opacity-80">
              {book.description}
            </p>

            <p className="mb-2">
              <strong>Author:</strong> {book.author}
            </p>

            <p className="mb-6">
              <strong>Category:</strong> {book.category}
            </p>

            <button className="btn btn-primary">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

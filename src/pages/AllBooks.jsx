import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const { user } = useAuth();
  const { dark } = useTheme();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // Switch endpoint based on role
      const endpoint =
        user?.role === "admin" || user?.role === "librarian"
          ? "http://localhost:3000/books/manage"
          : "http://localhost:3000/books";

      const res = await fetch(endpoint);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  if (books.length === 0) {
    return <p className="text-center mt-10">No books available</p>;
  }

  return (
    <div
      className={`min-h-screen px-6 py-12 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">All Books</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className={`rounded-2xl shadow-lg p-4 transition-all hover:shadow-xl ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm opacity-80">{book.author}</p>
            <p className="mt-2 font-medium">Price: ৳ {book.price}</p>
            {book.published === false && (
              <p className="text-xs text-yellow-400 mt-1">Unpublished</p>
            )}
            <Link
              to={`/all-books/${book._id}`} // Updated to match BookDetails route
              className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

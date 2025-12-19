import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const MyBooks = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();

  // 🔹 Mock librarian books (replace with API later)
  const [books, setBooks] = useState([
    {
      id: "BK-101",
      title: "Clean Code",
      image: "https://i.ibb.co/0Jmshvb/book1.png",
      status: "published",
    },
    {
      id: "BK-102",
      title: "You Don't Know JS",
      image: "https://i.ibb.co/7C6K6YY/book2.png",
      status: "unpublished",
    },
    {
      id: "BK-103",
      title: "Refactoring",
      image: "https://i.ibb.co/QM5vK7d/book3.png",
      status: "published",
    },
  ]);

  // 🔹 Toggle publish / unpublish
  const handleStatusChange = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book
      )
    );
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div
        className={`max-w-6xl mx-auto p-6 rounded-2xl shadow-lg
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-6">
          📚 My Books
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr
                className={`text-sm uppercase
                ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                <th>Image</th>
                <th>Book Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  {/* Image */}
                  <td>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-14 h-20 object-cover rounded-md border"
                    />
                  </td>

                  {/* Name */}
                  <td className="font-semibold">
                    {book.title}
                  </td>

                  {/* Status */}
                  <td>
                    <select
                      value={book.status}
                      onChange={(e) =>
                        handleStatusChange(
                          book.id,
                          e.target.value
                        )
                      }
                      className={`select select-sm capitalize
                        ${dark ? "bg-gray-700 text-white" : ""}`}
                    >
                      <option value="published">
                        Published
                      </option>
                      <option value="unpublished">
                        Unpublished
                      </option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td>
                    <button
                      onClick={() =>
                        navigate(
                          `/librarian/books/edit/${book.id}`
                        )
                      }
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    You haven’t added any books yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;

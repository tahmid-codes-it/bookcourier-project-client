import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const MyBooks = () => {
  const { dark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch librarian's books dynamically
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/books/manage?createdBy=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // 🔹 Toggle status
  const handleStatusChange = async (bookId, newStatus) => {
    await fetch(`http://localhost:3000/books/publish/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: newStatus === "published" }),
    });

    setBooks(prev =>
      prev.map(book =>
        book._id === bookId ? { ...book, published: newStatus === "published" } : book
      )
    );
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className={`min-h-screen px-6 py-10 ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`max-w-6xl mx-auto p-6 rounded-2xl shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-3xl font-bold mb-6">📚 My Books</h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className={`${dark ? "text-gray-300" : "text-gray-600"} text-sm uppercase`}>
                <th>Image</th>
                <th>Book Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    You haven’t added any books yet
                  </td>
                </tr>
              )}

              {books.map(book => (
                <tr key={book._id}>
                  <td>
                    <img src={book.coverImage} alt={book.title} className="w-14 h-20 object-cover rounded-md border" />
                  </td>
                  <td className="font-semibold">{book.title}</td>
                  <td>
                    <select
                      value={book.published ? "published" : "unpublished"}
                      onChange={e => handleStatusChange(book._id, e.target.value)}
                      className={`select select-sm capitalize ${dark ? "bg-gray-700 text-white" : ""}`}
                    >
                      <option value="published">Published</option>
                      <option value="unpublished">Unpublished</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/my-books/edit/${book._id}`)} // ✅ updated route
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;

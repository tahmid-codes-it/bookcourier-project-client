import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const ManageBooks = () => {
  const { dark } = useTheme();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/books/manage"); // Use manage endpoint
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Publish / Unpublish a book
  const togglePublish = async (bookId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:3000/books/publish/${bookId}`, {
        published: !currentStatus,
      });
      toast.success(
        `Book ${!currentStatus ? "published" : "unpublished"} successfully`
      );
      fetchBooks(); // Refresh list
    } catch (err) {
      console.error("Error updating book:", err);
      toast.error("Failed to update book status.");
    }
  };

  // Delete a book (with all its orders)
  const deleteBook = async (bookId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this book? All its orders will also be deleted."
      )
    ) {
      try {
        await axios.delete(`http://localhost:3000/books/${bookId}`);
        toast.success("Book deleted successfully");
        fetchBooks();
      } catch (err) {
        console.error("Error deleting book:", err);
        toast.error("Failed to delete book.");
      }
    }
  };

  return (
    <div
      className={`pt-24 px-6 min-h-screen transition-colors ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto p-6 rounded-2xl shadow-lg transition-colors ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            dark ? "text-white" : "text-gray-800"
          }`}
        >
          Manage Books
        </h2>

        {loading ? (
          <p
            className={`text-center py-10 ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Loading books...
          </p>
        ) : books.length === 0 ? (
          <p
            className={`text-center py-10 ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No books found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`table-auto w-full border-collapse ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              <thead>
                <tr
                  className={`text-left ${
                    dark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Author</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Published</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book._id}
                    className={`border-b border-gray-300 dark:border-gray-600 transition 
                      ${
                        dark
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">৳ {book.price}</td>
                    <td className="px-4 py-2">{book.published ? "Yes" : "No"}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() =>
                          togglePublish(book._id, book.published)
                        }
                        className={`px-3 py-1 rounded-md font-semibold text-white ${
                          book.published
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {book.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        onClick={() => deleteBook(book._id)}
                        className="px-3 py-1 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooks;

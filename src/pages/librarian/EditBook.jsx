import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const EditBook = () => {
  const { dark } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch book details
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage("Failed to fetch book details ❌");
        setLoading(false);
      });
  }, [id]);

  // Update book
  const handleUpdateBook = async (e) => {
    e.preventDefault();
    setMessage("");

    const updatedBook = {
      title: e.target.title.value,
      author: e.target.author.value,
      price: Number(e.target.price.value),
      category: e.target.category.value || "General",
      description: e.target.description.value,
      coverImage: e.target.coverImage.value || "https://via.placeholder.com/400x600?text=No+Image",
      published: e.target.published.value === "published",
    };

    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      if (!res.ok) throw new Error("Failed to update book");
      setMessage("Book updated successfully ✅");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update book ❌");
    }
  };

  // Delete book
  const handleDeleteBook = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete book");

      navigate("/my-books"); // go back to MyBooks
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete book ❌");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!book) return <p className="text-center mt-20">Book not found</p>;

  return (
    <div className={`min-h-screen px-6 py-10 ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-3xl font-bold mb-6">Edit Book</h2>

        {message && (
          <p className={`mb-4 font-medium ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleUpdateBook} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Book Name</label>
            <input name="title" type="text" required className="input input-bordered w-full" defaultValue={book.title} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author Name</label>
            <input name="author" type="text" required className="input input-bordered w-full" defaultValue={book.author} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input name="price" type="number" required className="input input-bordered w-full" defaultValue={book.price} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input name="category" type="text" placeholder="Optional" className="input input-bordered w-full" defaultValue={book.category} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" rows="4" required className="textarea textarea-bordered w-full" defaultValue={book.description}></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
            <input name="coverImage" type="text" className="input input-bordered w-full" defaultValue={book.coverImage} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select name="published" defaultValue={book.published ? "published" : "unpublished"} className="select select-sm w-full">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" className="btn btn-primary">Update Book</button>
            <button type="button" onClick={handleDeleteBook} className="btn btn-error">Delete Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;

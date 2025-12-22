import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const AddBook = () => {
  const { dark } = useTheme();
  const { user } = useAuth(); // get logged-in librarian

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Submit handler (REAL SAVE)
  const handleAddBook = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const form = e.target;

    // Build the book object
    const bookData = {
      title: form.title.value,
      author: form.author.value,
      price: Number(form.price.value),
      category: form.category.value || "General",
      description: form.description.value,
      coverImage:
        form.coverImage.value ||
        "https://via.placeholder.com/400x600?text=No+Image",
      stock: 1,
      published: true, // initially published
      createdAt: new Date(),
      createdBy: user._id, // <-- Use unique ID for librarian
    };

    try {
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!res.ok) throw new Error("Failed to add book");

      setMessage("Book added successfully ✅");
      form.reset();
    } catch (error) {
      console.error(error);
      setMessage("Failed to add book ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-lg ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">Add New Book</h2>

        <form onSubmit={handleAddBook} className="space-y-5">
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Book Name</label>
            <input
              name="title"
              type="text"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1">Author Name</label>
            <input
              name="author"
              type="text"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              type="text"
              placeholder="Optional"
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Book Cover Image URL
            </label>
            <input
              name="coverImage"
              type="text"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-sm font-medium ${
                message.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-lg"
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

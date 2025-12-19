import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const AddBook = () => {
  const { dark } = useTheme();

  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Handle image preview only
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Submit handler
  const handleAddBook = (e) => {
    e.preventDefault();
    setMessage("");

    const form = e.target;

    const bookData = {
      title: form.title.value,
      author: form.author.value,
      price: form.price.value,
      status: form.status.value,
      description: form.description.value,
      // image file not uploaded yet
    };

    console.log("📘 New Book:", bookData);

    setMessage("Book added successfully (demo mode) ✅");
    form.reset();
    setImagePreview("");
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-lg
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-6">Add New Book</h2>

        <form onSubmit={handleAddBook} className="space-y-5">
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Book Name
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="Enter book title"
              className={`input input-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Author Name
            </label>
            <input
              name="author"
              type="text"
              required
              placeholder="Enter author name"
              className={`input input-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              required
              placeholder="Enter price"
              className={`input input-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              className={`select select-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Short description about the book"
              className={`textarea textarea-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            ></textarea>
          </div>

          {/* Image Upload (Preview only) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Book Image (Preview)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`file-input file-input-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
            <p className="text-xs opacity-70 mt-1">
              * Image preview only (no upload yet)
            </p>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-48 object-contain rounded-lg border"
              />
            )}
          </div>

          {/* Message */}
          {message && (
            <p className="text-green-500 text-sm font-medium">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const BookDetails = () => {
    const { id } = useParams();
    const { dark } = useTheme();

    const [book, setBook] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Temporary user data (replace with AuthContext later)
    const user = {
        name: "John Doe",
        email: "john@example.com",
    };

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
            {/* Book Details Card */}
            <div
                className={`max-w-5xl mx-auto rounded-2xl shadow-xl p-8
        ${dark ? "bg-gray-800" : "bg-white"}
      `}
            >
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-[400px] object-cover rounded-xl"
                    />

                    {/* Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                        <p className="opacity-80 mb-4">{book.description}</p>

                        <p className="mb-2">
                            <span className="font-semibold">Author:</span> {book.author}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Category:</span> {book.category}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Status:</span>{" "}
                            {book.stock > 0 ? (
                                <span className="text-green-500 font-semibold">Available</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Not Available</span>
                            )}
                        </p>


                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Order Now
                        </button>
                    </div>
                </div>
            </div>

            {/* ORDER MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div
                        className={`w-full max-w-md rounded-xl p-6
            ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
          `}
                    >
                        <h2 className="text-2xl font-bold mb-4">Place Order</h2>

                        <form className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    readOnly
                                    className="input input-bordered w-full mt-1 bg-gray-200 text-gray-600"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered w-full mt-1 bg-gray-200 text-gray-600"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    className="input input-bordered w-full mt-1"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-sm font-medium">Address</label>
                                <textarea
                                    placeholder="Enter delivery address"
                                    className="textarea textarea-bordered w-full mt-1"
                                    required
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-lg border"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;

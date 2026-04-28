import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skiper52 from "../components/Skiper52"; // Animated section
import { useTheme } from "../context/ThemeContext"; // ✅ Added

const Home = () => {
  const { dark } = useTheme(); // ✅ Added
  const [latestBooks, setLatestBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      title: "Borrow Books From Nearby Libraries",
      desc: "Request pick-up or delivery of any available book from partnered libraries.",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      title: "Fast & Reliable Book Delivery",
      desc: "Get books delivered to your home quickly and easily with BookCourier.",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title: "Perfect For Students & Researchers",
      desc: "Save time by returning and borrowing books without visiting the library.",
    },
  ];

  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setLatestBooks(data))
      .catch((err) => console.error("Home fetch error:", err));
  }, [API_URL]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    // ✅ Main wrapper handles background and text color switch
    <div className={`pt-24 transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      
      {/* Hero Carousel */}
      <div className="relative w-full h-[450px] rounded-lg shadow-lg overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              className="w-full h-full object-cover brightness-75"
              alt={slide.title}
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-10 text-white">
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="text-lg mb-6 max-w-xl drop-shadow-lg">{slide.desc}</p>
              <Link
                to="/all-books"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
              >
                View All Books
              </Link>
            </div>
          </div>
        ))}

        {/* Manual Navigation */}
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
            }
            className={`btn btn-circle ${dark ? "bg-gray-800 border-gray-700 text-white" : ""}`}
          >
            ❮
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className={`btn btn-circle ${dark ? "bg-gray-800 border-gray-700 text-white" : ""}`}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Animated Section */}
      <div className="mt-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Best Seller Books of All Time
        </h2>
        <Skiper52 books={latestBooks.sort((a, b) => b.price - a.price).slice(0, 6)} />
      </div>

      {/* Latest Books Section */}
      <section className="my-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestBooks
            .sort((a, b) => b.price - a.price)
            .slice(0, 6)
            .map((book) => (
              <div
                key={book._id}
                className={`shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-all ${
                  dark ? "bg-gray-800 border border-gray-700" : "bg-white"
                }`}
              >
                <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className={`text-sm mb-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                    {book.description?.slice(0, 60)}...
                  </p>
                  <Link to={`/all-books/${book._id}`} className="text-blue-500 font-medium hover:underline">
                    View Book
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Coverage Section */}
      <section className={`my-16 py-12 transition-colors ${dark ? "bg-gray-800" : "bg-blue-50"}`}>
        <h2 className="text-3xl font-bold mb-8 text-center">Coverage</h2>
        <div className="max-w-6xl mx-auto flex justify-center px-6">
          <iframe
            title="Book Delivery Coverage"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14661.983442905383!2d90.39945298334569!3d23.777176307718305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b1f1c2e7b1%3A0x92a8a1c9f79f2d9d!2sDhaka!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className={`rounded-lg shadow-lg ${dark ? "grayscale invert opacity-80" : ""}`}
          />
        </div>
      </section>

      {/* Why Choose BookCourier */}
      <section className="my-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose BookCourier?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "Fast Delivery", d: "Get your books delivered in record time without any hassle." },
            { t: "Trusted Libraries", d: "We partner with verified libraries to ensure book quality and availability." },
            { t: "Affordable Prices", d: "Enjoy competitive prices with flexible delivery options." }
          ].map((item, idx) => (
            <div key={idx} className={`shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all ${
              dark ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}>
              <h3 className="font-semibold text-xl mb-2">{item.t}</h3>
              <p className={dark ? "text-gray-400" : "text-gray-600"}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 1 - Testimonials */}
      <section className={`my-16 py-12 transition-colors ${dark ? "bg-gray-900" : "bg-gray-100"}`}>
        <h2 className="text-3xl font-bold mb-8 text-center">What People Say</h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 px-6">
          <div className={`p-6 rounded-lg shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              "BookCourier saved me so much time! Highly recommended."
            </p>
            <p className="font-semibold mt-4 text-blue-500">— Sarah M.</p>
          </div>
          <div className={`p-6 rounded-lg shadow-lg ${dark ? "bg-gray-800" : "bg-white"}`}>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              "Quick delivery and great collection of books."
            </p>
            <p className="font-semibold mt-4 text-blue-500">— Ahmed K.</p>
          </div>
        </div>
      </section>

      {/* Extra Section 2 - Newsletter Signup */}
      <section className={`my-16 py-12 transition-colors ${dark ? "bg-gray-800" : "bg-blue-50"}`}>
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
          <p className={`mb-6 ${dark ? "text-gray-400" : "text-gray-700"}`}>
            Subscribe to our newsletter and never miss new books and offers.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className={`p-3 rounded-l-md border w-2/3 outline-none ${
                dark ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" : "border-gray-300"
              }`}
            />
            <button className="px-5 py-3 bg-blue-600 text-white rounded-r-md font-semibold hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/404-image.png";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  const { dark } = useTheme(); // Get global theme

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col`}>
      
      <Navbar />

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .floating-image {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">

        {/* Floating Image */}
        <img
          src={errorImg}
          alt="404 fun"
          className="mt-5 w-64 sm:w-80 floating-image"
        />

        <h1 className="text-4xl sm:text-5xl font-bold mt-6">
          404 - Page Not Found
        </h1>

        <p className="mt-4 text-lg opacity-80 max-w-md">
          Oops! Looks like the page you are looking for has floated away!
        </p>

        <Link
          to="/"
          className="mt-6 px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Back to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;

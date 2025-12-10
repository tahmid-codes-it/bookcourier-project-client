import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Eye, EyeOff } from "lucide-react";

import signinImg from "../assets/book_stack.png"; // you can reuse the same image
import logo from "../assets/google-logo-2025-6ffb.png";

const SignIn = () => {
  const { dark } = useTheme();
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .floating-img {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Main Container */}
      <div
        className={`w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row
          ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} relative`}
      >
        {/* BC Logo at top-left of the card */}
        <div className="absolute top-4 right-4 md:left-4 lg:left-4 z-10">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md">BC</span>
          </Link>
        </div>

        {/* Left Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-transparent">
          <img
            src={signinImg}
            alt="SignIn Banner"
            className="floating-img h-[400px] object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 mt-7 md:mt-0">
          <h2 className="text-3xl font-bold mb-2 mt-4">Welcome Back</h2>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-6`}>
            Sign in to your account to continue exploring thousands of books!
          </p>

          <form className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className={`input input-bordered w-full mt-1
                  ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  className={`input input-bordered w-full mt-1
                    ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />

                {/* Show/Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Main SignIn Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-lg"
            >
              Sign In
            </button>

            {/* Google SignIn Button */}
            <button
              type="button"
              className={`btn w-full mt-2 flex items-center gap-2 border
                ${dark ? "bg-gray-700 border-gray-500 text-white" : "bg-white border-gray-300"}`}
            >
              <img src={logo} alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            <p className="text-center mt-4 mb-7">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-600 font-semibold">
                Sign Up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // ✅ ADDED

import signinImg from "../assets/book_stack.png";

const SignIn = () => {
  const { dark } = useTheme();
  const { login } = useAuth(); // ✅ ADDED
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ FIX: update AuthContext instead of only localStorage
      login({
        email: data.email,
        role: data.role,
      });

      toast.success("Login successful!");

      // ✅ ROLE BASED REDIRECT
      if (data.role === "admin") {
        navigate("/all-users");
      } else if (data.role === "librarian") {
        navigate("/my-books");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
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

      <div
        className={`w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row
        ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"} relative`}
      >
        {/* Logo */}
        <div className="absolute top-4 left-4 z-10">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md">
              BC
            </span>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center">
          <img
            src={signinImg}
            alt="SignIn Banner"
            className="floating-img h-[400px] object-contain"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 mt-7 md:mt-0">
          <h2 className="text-3xl font-bold mb-2 mt-4">Welcome Back</h2>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-6`}>
            Sign in to your account to continue exploring thousands of books!
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input input-bordered w-full mt-1
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input input-bordered w-full mt-1
                  ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-lg"
            >
              Sign In
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

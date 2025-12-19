import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Eye, EyeOff } from "lucide-react";

import { auth } from "../firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { toast } from "react-toastify";

import signupImg from "../assets/book_stack.png";
import logo from "../assets/google-logo-2025-6ffb.png";

const SignUp = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  // 🔹 Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });

      toast.success("Account created successfully!");
      navigate("/"); // redirect after signup
    } catch (err) {
      toast.error(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Signup
  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup closed.";
      default:
        return "Signup failed. Please try again.";
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
        <div className="absolute top-4 right-4 md:left-4 lg:left-4 z-10">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md">BC</span>
          </Link>
        </div>

        {/* Left Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-transparent">
          <img
            src={signupImg}
            alt="Signup Banner"
            className="floating-img h-[400px] object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 mt-7 md:mt-0">
          <h2 className="text-3xl font-bold mb-2 mt-3">Create an Account</h2>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-6`}>
            Join BookCourier and explore thousands of books!
          </p>

          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className={`input input-bordered w-full mt-1
                  ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                required
                className={`input input-bordered w-full mt-1
                  ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  required
                  className={`input input-bordered w-full mt-1
                    ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
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

            {/* Main Signup Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 text-lg"
              disabled={loading}
            >
              {loading ? "Processing..." : "Create Account"}
            </button>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className={`btn w-full mt-2 flex items-center gap-2 border
                ${dark
                  ? "bg-gray-700 border-gray-500 text-white"
                  : "bg-white border-gray-300"}`}
              disabled={loading}
            >
              <img src={logo} alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>

            <p className="text-center mt-4 mb-7">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-600 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

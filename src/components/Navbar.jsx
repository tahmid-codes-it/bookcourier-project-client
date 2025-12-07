import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useTheme(); // Global theme

  return (
    <nav className={`w-full fixed top-0 left-0 shadow-md z-50 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md">BC</span>
          BookCourier
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/books" className="hover:text-blue-600">Books</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/login" className="hover:text-blue-600">Login / Register</Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden flex flex-col gap-4 p-4 border-t transition-colors
          ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/books" className="hover:text-blue-600">Books</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/login" className="hover:text-blue-600">Login / Register</Link>

          {/* Theme Toggle (Mobile) */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 border rounded-full w-fit transition-colors"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { dark, setDark } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav
      className={`w-full top-0 left-0 shadow-md z-50 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md">BC</span>
          BookCourier
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/all-books" className="hover:text-blue-600">All Books</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 border rounded-full transition-colors group
              hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {dark ? (
              <Sun size={20} />
            ) : (
              <Moon
                size={20}
                className="transition-colors group-hover:text-white"
              />
            )}
          </button>

          {/* Auth Section */}
          {!user ? (
            <Link to="/sign-in" className="hover:text-blue-600">
              Login / Register
            </Link>
          ) : (
            <div className="relative">
              {/* Profile Image */}
              <img
                src={user.photoURL || "https://i.ibb.co/9GdWwzN/user.png"}
                alt="User"
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-blue-500"
              />

              {/* Dropdown */}
              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-44 rounded-lg shadow-lg p-2
                    ${dark ? "bg-gray-800" : "bg-white"}`}
                >
                  <p className="text-sm px-2 py-1 truncate">
                    {user.displayName || "User"}
                  </p>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-2 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden flex flex-col gap-4 p-4 border-t transition-colors
          ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <Link to="/">Home</Link>
          <Link to="/all-books">All Books</Link>
          <Link to="/dashboard">Dashboard</Link>

          {!user ? (
            <Link to="/sign-in">Login / Register</Link>
          ) : (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-500"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 border rounded-full w-fit"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

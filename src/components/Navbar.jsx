import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Shield
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { dark, setDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  // ✅ SAFE LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setOpen(false);
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          <Link to="/about-us" className="hover:text-blue-600">About Us</Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
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
                  className={`absolute right-0 mt-2 w-52 rounded-lg shadow-lg p-2
                  ${dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                >
                  <p
                    className={`text-sm px-2 py-1 mb-1 truncate font-medium border-b
                    ${dark ? "border-gray-700" : "border-gray-200"}`}
                  >
                    {user.displayName || "User"}
                  </p>

                  {/* ADMIN MENU */}
                  {isAdmin ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-white dark:hover:bg-gray-700"
                      >
                        <span className="flex items-center gap-2">
                          <Shield size={16} />
                          Admin Dashboard
                        </span>
                      </Link>

                      <Link
                        to="/admin/books"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-white dark:hover:bg-gray-700"
                      >
                        Manage Books
                      </Link>

                      <Link
                        to="/admin/orders"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-white dark:hover:bg-gray-700"
                      >
                        Manage Orders
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* USER MENU */}
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-white dark:hover:bg-gray-700"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-white dark:hover:bg-gray-700"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/invoices"
                        onClick={() => setProfileOpen(false)}
                        className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-white dark:hover:bg-gray-700"
                      >
                        Invoices
                      </Link>
                    </>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 mt-1 text-red-500 hover:bg-red-100 hover:text-white dark:hover:bg-gray-700 rounded-md"
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
          className={`md:hidden flex flex-col gap-4 p-4 border-t
          ${dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/all-books" onClick={() => setOpen(false)}>All Books</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>

          {user && (
            isAdmin ? (
              <>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
                <Link to="/admin/books">Manage Books</Link>
                <Link to="/admin/orders">Manage Orders</Link>
              </>
            ) : (
              <>
                <Link to="/profile">My Profile</Link>
                <Link to="/my-orders">My Orders</Link>
                <Link to="/invoices">Invoices</Link>
              </>
            )
          )}

          {user ? (
            <button onClick={handleLogout} className="text-red-500 flex gap-2">
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link to="/sign-in">Login / Register</Link>
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

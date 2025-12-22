import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Shield,
  Users,
  BookOpen,
  User,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { dark, setDark } = useTheme();
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const isLibrarian = user?.role === "librarian";

  // 🔹 Handle Librarian toast
  useEffect(() => {
    if (user?.notify && !isAdmin) {
      // Only show toast if the user is not admin
      if (user.isLibrarian) {
        toast.info(
          <div>
            Your Librarian Access granted. Do you want to switch now?
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  setUser({ ...user, role: "librarian", notify: false });
                  localStorage.setItem(
                    "bc-auth",
                    JSON.stringify({ ...user, role: "librarian", notify: false })
                  );
                  toast.dismiss();
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setUser({ ...user, notify: false });
                  localStorage.setItem(
                    "bc-auth",
                    JSON.stringify({ ...user, notify: false })
                  );
                  toast.dismiss();
                }}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                No
              </button>
            </div>
          </div>,
          { autoClose: false }
        );
      } else {
        // If librarian removed, just show a simple toast
        toast.info("Your Librarian Access removed. You are now a User.");
        setUser({ ...user, notify: false });
        localStorage.setItem(
          "bc-auth",
          JSON.stringify({ ...user, notify: false })
        );
      }
    }
  }, [user, setUser, isAdmin]);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/sign-in");
  };

  return (
    <nav
      className={`w-full shadow-md z-50 transition-colors ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md">BC</span>
          BookCourier
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-9">
          <NavLink to="/" dark={dark}>Home</NavLink>
          <NavLink to="/all-books" dark={dark}>All Books</NavLink>
          <NavLink to="/about-us" dark={dark}>About Us</NavLink>

          {/* THEME TOGGLE */}
          <button onClick={() => setDark(!dark)} className="p-2 border rounded-full">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* AUTH */}
          {!user ? (
            <Link to="/sign-in" className="font-medium">
              Login / Register
            </Link>
          ) : (
            <div className="relative">
              {/* PROFILE BUTTON */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                  dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
              >
                {isAdmin ? (
                  <>
                    <Shield size={18} />
                    <span className="font-semibold">Welcome Admin</span>
                  </>
                ) : isLibrarian ? (
                  <>
                    <User size={18} />
                    <span className="font-semibold">Welcome Librarian</span>
                  </>
                ) : (
                  <>
                    <User size={18} />
                    <span className="font-semibold">{user.displayName || "User"}</span>
                  </>
                )}
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg p-2 ${
                    dark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {isAdmin && (
                    <>
                      <DropdownLink to="/all-users" icon={<Users size={16} />} dark={dark} text="All Users" />
                      <DropdownLink to="/manage-books" icon={<BookOpen size={16} />} dark={dark} text="Manage Books" />
                      <DropdownLink to="/my-profile" icon={<User size={16} />} dark={dark} text="My Profile" />
                    </>
                  )}

                  {isLibrarian && (
                    <>
                      <DropdownLink to="/my-books" dark={dark} text="My Books" />
                      <DropdownLink to="/all-orders" dark={dark} text="Orders" />
                      <DropdownLink to="/add-book" dark={dark} text="Add Book" />
                    </>
                  )}

                  {!isAdmin && !isLibrarian && (
                    <>
                      <DropdownLink to="/profile" dark={dark} text="My Profile" />
                      <DropdownLink to="/my-orders" dark={dark} text="My Orders" />
                      <DropdownLink to="/invoices" dark={dark} text="Invoices" />
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-gray-700"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col gap-2 p-4 ${
            dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          {/* THEME TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 border rounded-full w-max mb-2"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <MobileLink to="/" dark={dark} text="Home" />
          <MobileLink to="/all-books" dark={dark} text="All Books" />
          <MobileLink to="/about-us" dark={dark} text="About Us" />

          {!user ? (
            <MobileLink to="/sign-in" dark={dark} text="Login / Register" />
          ) : (
            <>
              {isAdmin && (
                <>
                  <MobileLink to="/all-users" dark={dark} text="All Users" />
                  <MobileLink to="/manage-books" dark={dark} text="Manage Books" />
                  <MobileLink to="/my-profile" dark={dark} text="My Profile" />
                </>
              )}

              {isLibrarian && (
                <>
                  <MobileLink to="/my-books" dark={dark} text="My Books" />
                  <MobileLink to="/all-orders" dark={dark} text="Orders" />
                  <MobileLink to="/add-book" dark={dark} text="Add Book" />
                </>
              )}

              {!isAdmin && !isLibrarian && (
                <>
                  <MobileLink to="/profile" dark={dark} text="My Profile" />
                  <MobileLink to="/my-orders" dark={dark} text="My Orders" />
                  <MobileLink to="/invoices" dark={dark} text="Invoices" />
                </>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-gray-700"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

/* Reusable desktop link */
const NavLink = ({ to, children, dark }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md transition-colors ${
      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
    }`}
  >
    {children}
  </Link>
);

/* Dropdown link */
const DropdownLink = ({ to, icon, text, dark }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
      dark ? "hover:bg-gray-700" : "hover:bg-gray-200"
    }`}
  >
    {icon} {text}
  </Link>
);

/* Mobile link */
const MobileLink = ({ to, text, dark }) => (
  <Link
    to={to}
    className={`px-3 py-2 rounded-md ${
      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
    }`}
  >
    {text}
  </Link>
);

export default Navbar;

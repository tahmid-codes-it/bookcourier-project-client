import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase/Firebase.config";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const { dark } = useTheme();
  const user = auth.currentUser;

  // 🔹 LOCAL STATE
  const [name, setName] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("user");
  const [roleRequestMsg, setRoleRequestMsg] = useState("");
  const [userId, setUserId] = useState(""); // store DB user _id

  // 🔹 FETCH USER DATA FROM BACKEND
  const fetchUserData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/users/${user.email}`
      );
      const data = await res.json();

      setRole(data.isLibrarian ? "librarian" : data.role);
      setUserId(data._id);

      // 🔹 Show toast if notify flag is true
      if (data.notify) {
        const switchRole = window.confirm(data.message);
        if (switchRole) {
          // Toggle role locally
          setRole(data.isLibrarian ? "librarian" : "user");
        }

        // Reset notify flag in backend
        await fetch(`http://localhost:3000/users/reset-notify/${data._id}`, {
          method: "PATCH",
        });
      }
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoPreview(user.photoURL || "");
      fetchUserData();
    }
  }, [user]);

  // 🔹 Image preview only
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  // 🔹 Update profile name
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await updateProfile(user, { displayName: name });
      setMessage("Profile updated successfully ✅");
    } catch (error) {
      setMessage("Failed to update profile ❌");
    }
  };

  // 🔹 Request Librarian Access
  const handleLibrarianRequest = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/users/request-librarian",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );

      if (res.ok) {
        setRoleRequestMsg(
          "Your request to become a Librarian has been sent. Please wait for admin approval ⏳"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-lg
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={
              photoPreview ||
              "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <p className="text-xl font-semibold">
              {user?.displayName || "Unnamed User"}
            </p>
            <p className="text-sm opacity-80">{user?.email}</p>
            <p className="mt-1 text-sm">
              <span className="font-medium">Role:</span>{" "}
              <span className="capitalize text-blue-500">{role}</span>
            </p>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`input input-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-200 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Photo (Preview)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`file-input file-input-bordered w-full
                ${dark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
            <p className="text-xs opacity-70 mt-1">
              * Image preview only (no upload yet)
            </p>
          </div>

          {message && (
            <p className="text-sm text-green-500 font-medium">{message}</p>
          )}

          <button type="submit" className="btn btn-primary w-full text-lg">
            Update Profile
          </button>
        </form>

        {/* 🔹 ROLE REQUEST SECTION */}
        {role === "user" && (
          <div
            className={`mt-10 p-5 rounded-xl border
            ${dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
          >
            <h3 className="text-xl font-semibold mb-2">Become a Librarian</h3>
            <p className="text-sm opacity-80 mb-4">
              Librarians can manage books and inventory. Your request will be
              reviewed by an admin.
            </p>

            <button
              onClick={handleLibrarianRequest}
              className="btn btn-outline btn-primary"
            >
              Request Librarian Access
            </button>

            {roleRequestMsg && (
              <p className="text-sm text-green-500 mt-3">{roleRequestMsg}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

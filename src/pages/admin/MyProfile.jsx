import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase/Firebase.config";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { dark } = useTheme();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);

  // Handle updating display name
  const handleUpdate = async () => {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      await user.updateProfile({ displayName });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`pt-24 px-6 min-h-screen transition-colors ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-lg transition-colors ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            dark ? "text-white" : "text-gray-800"
          }`}
        >
          My Profile
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Name:</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={`w-full p-3 rounded-md border transition-colors ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter display name"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email:</label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className={`w-full p-3 rounded-md border transition-colors cursor-not-allowed ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Role:</label>
            <input
              type="text"
              value="Admin"
              readOnly
              className={`w-full p-3 rounded-md border transition-colors cursor-not-allowed ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-300"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-6 py-3 rounded-md font-semibold text-white transition-colors ${
              dark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-600 hover:bg-blue-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 INITIAL LOAD
  useEffect(() => {
    const storedData = localStorage.getItem("bc-auth");

    if (storedData) {
      const parsed = JSON.parse(storedData);
      setUser({
        _id: parsed._id || null,
        email: parsed.email,
        role: parsed.role,
        displayName: parsed.displayName || (parsed.role === "admin" ? "Admin" : "User"),
        photoURL: parsed.photoURL || null,
        uid: parsed.uid || null,
        notify: parsed.notify || false,
        isLibrarian: parsed.isLibrarian || false,
        librarianRequest: parsed.librarianRequest || "none",
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          _id: null,
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || "User",
          photoURL: currentUser.photoURL || null,
          role: "user",
          notify: false,
          isLibrarian: false,
          librarianRequest: "none",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ LOGIN
  const login = (data) => {
    localStorage.setItem("bc-auth", JSON.stringify(data));
    setUser({
      _id: data._id || null,
      email: data.email,
      role: data.role,
      displayName: data.displayName || (data.role === "admin" ? "Admin" : "User"),
      photoURL: data.photoURL || null,
      uid: data.uid || null,
      notify: data.notify || false,
      isLibrarian: data.isLibrarian || false,
      librarianRequest: data.librarianRequest || "none",
    });
  };

  // ✅ LOGOUT
  const logout = async () => {
    localStorage.removeItem("bc-auth");
    await signOut(auth);
    setUser(null);
  };

  // ✅ UPDATE USER (for role toggle / displayName changes)
  const updateUser = (data) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem("bc-auth", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CrowdCanvas from "../../components/CrowdCanvas"; // ✅ added

const AllUsers = () => {
  const { user } = useAuth(); // logged-in admin
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  // 🔹 Toggle Librarian Access
  const toggleLibrarian = async (id, currentStatus) => {
    await fetch(`http://localhost:3000/users/toggle-librarian/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        isLibrarian: !currentStatus,
      }),
    });

    fetchUsers();
  };

  // 🔹 Make Admin
  const makeAdmin = async (id) => {
    await fetch(`http://localhost:3000/users/role/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: "admin" }),
    });

    fetchUsers();
  };

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <div className="relative"> {/* ✅ wrapper added */}

      {/* ✅ BACKGROUND ANIMATION */}
      <CrowdCanvas src="/images/peeps/all-peeps.png" />

      {/* 🔹 EXISTING UI (UNCHANGED) */}
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold mb-6">All Users</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Librarian</th>
                <th>Request</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.email}</td>

                  <td className="capitalize font-medium">{u.role}</td>

                  <td>
                    {u.isLibrarian ? (
                      <span className="badge badge-success">Yes</span>
                    ) : (
                      <span className="badge badge-ghost">No</span>
                    )}
                  </td>

                  <td>
                    {u.librarianRequest === "pending" ? (
                      <span className="badge badge-warning">Pending</span>
                    ) : (
                      <span className="badge badge-ghost">None</span>
                    )}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        toggleLibrarian(u._id, u.isLibrarian)
                      }
                      className={`btn btn-sm ${
                        u.isLibrarian
                          ? "btn-error"
                          : "btn-success"
                      }`}
                    >
                      {u.isLibrarian
                        ? "Remove Librarian"
                        : "Make Librarian"}
                    </button>

                    {u.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(u._id)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

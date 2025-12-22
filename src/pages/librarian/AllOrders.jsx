import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const AllOrders = () => {
  const { dark } = useTheme();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all orders + invoices for librarian
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/orders").then((res) => res.json()),
      fetch("http://localhost:3000/invoices").then((res) => res.json()),
    ])
      .then(([ordersData, invoicesData]) => {
        // Map invoices to match orders structure
        const paidOrders = invoicesData.map((inv) => ({
          ...inv,
          status: "paid",
        }));

        setOrders([...ordersData, ...paidOrders]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Update order status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  };

  // 🔹 Cancel order
  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      const res = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to cancel order");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading orders...</p>;
  }

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div
        className={`max-w-6xl mx-auto p-6 rounded-2xl shadow-lg
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-6">
          📦 Orders (Librarian)
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr
                className={`text-sm uppercase
                ${dark ? "text-gray-300" : "text-gray-600"}`}
              >
                <th>#</th>
                <th>Book</th>
                <th>User</th>
                <th>Email</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{order.bookTitle}</td>
                  <td>{order.userName}</td>
                  <td className="text-sm opacity-80">{order.userEmail}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>৳ {order.price}</td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge capitalize
                        ${
                          order.status === "pending"
                            ? "badge-warning"
                            : order.status === "shipped"
                            ? "badge-info"
                            : order.status === "delivered"
                            ? "badge-success"
                            : order.status === "paid"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="flex gap-2">
                    {(order.status === "pending" || order.status === "shipped") && (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`select select-sm ${dark ? "bg-gray-700 text-white" : ""}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        {order.status === "shipped" && <option value="delivered">Delivered</option>}
                      </select>
                    )}

                    {order.status !== "delivered" &&
                      order.status !== "cancelled" &&
                      order.status !== "paid" && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-sm btn-error"
                        >
                          Cancel
                        </button>
                      )}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

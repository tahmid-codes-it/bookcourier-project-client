import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const AllOrders = () => {
  const { dark } = useTheme();

  // 🔹 Mock orders (replace with API later)
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      bookName: "Clean Code",
      customer: "John Doe",
      date: "2025-12-01",
      price: 499,
      status: "pending",
    },
    {
      id: "ORD-1002",
      bookName: "You Don't Know JS",
      customer: "Jane Smith",
      date: "2025-12-02",
      price: 399,
      status: "shipped",
    },
    {
      id: "ORD-1003",
      bookName: "Refactoring",
      customer: "Alex Brown",
      date: "2025-12-03",
      price: 599,
      status: "delivered",
    },
  ]);

  // 🔹 Cancel order
  const handleCancel = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: "cancelled" }
          : order
      )
    );
  };

  // 🔹 Change order status
  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

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
                <th>Order ID</th>
                <th>Book</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td className="font-semibold">{order.bookName}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
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
                            : "badge-error"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="flex gap-2">
                    {/* Status Dropdown */}
                    {(order.status === "pending" ||
                      order.status === "shipped") && (
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className={`select select-sm
                          ${dark ? "bg-gray-700 text-white" : ""}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        {order.status === "shipped" && (
                          <option value="delivered">
                            Delivered
                          </option>
                        )}
                      </select>
                    )}

                    {/* Cancel Button */}
                    {order.status !== "delivered" &&
                      order.status !== "cancelled" && (
                        <button
                          onClick={() => handleCancel(order.id)}
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
                  <td colSpan="7" className="text-center py-6">
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

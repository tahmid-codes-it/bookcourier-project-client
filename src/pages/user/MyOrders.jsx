import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const MyOrders = () => {
  const navigate = useNavigate();
  const { dark } = useTheme();

  const [orders, setOrders] = useState([
    {
      id: "1",
      title: "Atomic Habits",
      orderDate: "2025-01-10",
      status: "pending",
    },
    {
      id: "2",
      title: "Deep Work",
      orderDate: "2025-01-05",
      status: "paid",
    },
    {
      id: "3",
      title: "Clean Code",
      orderDate: "2025-01-02",
      status: "cancelled",
    },
  ]);

  const handleCancel = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: "cancelled" }
          : order
      )
    );
  };

  const handlePayNow = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: "paid" }
          : order
      )
    );
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div
        className={`overflow-x-auto shadow rounded-lg
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <table className="table w-full">
          <thead className={`${dark ? "bg-gray-700" : "bg-gray-200"}`}>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Order Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <td>{index + 1}</td>
                <td className="font-medium">{order.title}</td>
                <td>{order.orderDate}</td>

                <td>
                  {order.status === "pending" && (
                    <span className="badge badge-warning">Pending</span>
                  )}
                  {order.status === "paid" && (
                    <span className="badge badge-success">Paid</span>
                  )}
                  {order.status === "cancelled" && (
                    <span className="badge badge-error">Cancelled</span>
                  )}
                </td>

                <td className="text-center space-x-2">
                  {order.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handlePayNow(order.id)}
                        className="btn btn-sm btn-success"
                      >
                        Pay Now
                      </button>
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;

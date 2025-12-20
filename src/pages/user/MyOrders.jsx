import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const MyOrders = () => {
  const { user } = useAuth();
  const { dark } = useTheme();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [user]);

  const handleCancelOrder = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:3000/orders/cancel/${id}`, {
      method: "PATCH",
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "cancelled" } : o))
      );
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const res = await fetch(
      `http://localhost:3000/orders/pay/${selectedOrder._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod }),
      }
    );

    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o._id !== selectedOrder._id));
      setSelectedOrder(null);
      setPaymentMethod("");
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading orders...</p>;
  }

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto rounded-xl shadow-lg p-6 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <p className="opacity-70">No active orders</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={order.bookImage}
                      alt={order.bookTitle}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <span>{order.bookTitle}</span>
                  </td>

                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td>
                    <span className="font-semibold text-yellow-500">
                      Order Placed
                    </span>
                  </td>

                  <td>
                    <span className="font-semibold text-orange-500">
                      unpaid
                    </span>
                  </td>

                  <td>
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn btn-sm btn-error mr-2"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="btn btn-sm btn-primary"
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAYMENT MODAL */}
      {selectedOrder && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Confirm Payment</h3>

            <select
              className="select select-bordered w-full mb-4"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option>Bkash</option>
              <option>Nagad</option>
              <option>Rocket</option>
              <option>Bank</option>
            </select>

            <p className="text-sm opacity-70 mb-4">
              <strong>N.B:</strong> Book Price 120tk + Delivery 60tk = 180tk
            </p>

            <div className="modal-action">
              <button
                onClick={handleConfirmPayment}
                className="btn btn-success"
              >
                Confirm Payment
              </button>

              <button onClick={() => setSelectedOrder(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyOrders;

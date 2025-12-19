import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase/Firebase.config";

const Invoices = () => {
  const { dark } = useTheme();
  const user = auth.currentUser;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // 🔹 Replace with real backend API later
    fetch(`http://localhost:3000/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300
      ${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <div
        className={`max-w-6xl mx-auto p-8 rounded-2xl shadow-lg
        ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <h2 className="text-3xl font-bold mb-6">Invoices</h2>

        {loading ? (
          <p className="text-center py-10">Loading invoices...</p>
        ) : payments.length === 0 ? (
          <p className="text-center py-10 opacity-70">
            No payments found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr
                  className={`text-left
                  ${dark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <th>#</th>
                  <th>Payment ID</th>
                  <th>Book</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td>{index + 1}</td>
                    <td className="font-mono text-sm">
                      {payment._id}
                    </td>
                    <td>{payment.bookTitle || "—"}</td>
                    <td className="font-semibold">
                      ৳ {payment.amount}
                    </td>
                    <td>
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;

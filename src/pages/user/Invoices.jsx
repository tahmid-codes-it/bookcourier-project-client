import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase/Firebase.config";

const Invoices = () => {
  const { dark } = useTheme();
  const user = auth.currentUser;
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/invoices?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  return (
    <div
      className={`min-h-screen px-6 py-10 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto p-8 rounded-2xl shadow-lg ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6">Invoices</h2>

        {loading ? (
          <p className="text-center py-10">Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p className="text-center py-10 opacity-70">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr
                  className={`text-left ${
                    dark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <th>#</th>
                  <th>Payment ID</th>
                  <th>Book</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={invoice._id}
                    className={`transition ${
                      dark
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-500 hover:text-white"
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td className="font-mono text-sm">{invoice.paymentId}</td>
                    <td>{invoice.bookTitle || "—"}</td>
                    <td>{invoice.paymentMethod || "—"}</td>
                    <td className="font-semibold">৳ 180</td>
                    <td>{new Date(invoice.paidAt).toLocaleDateString()}</td>
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

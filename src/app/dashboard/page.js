"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [form, setForm] = useState({
    date: "",
    category: "sonali",
    whole_sale_price: "",
    retail_sale_price: "",
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success"); // or 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/chicken/daily-price/today`,
        form
      );
      setMessage("✅ Data saved successfully!");
      setMessageType("success");
      setForm({
        date: "",
        category: "sonali",
        whole_sale_price: "",
        retail_sale_price: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit data.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          🐔 Admin Dashboard — Add Chicken Prices
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sonali">Sonali Murgi</option>
              <option value="broylar">Broylar Murgi</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Wholesale Price (TK)
              </label>
              <input
                type="number"
                name="whole_sale_price"
                value={form.whole_sale_price}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Retail Price (TK)
              </label>
              <input
                type="number"
                name="retail_sale_price"
                value={form.retail_sale_price}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            ➕ Save Data
          </button>
        </form>
      </div>
    </div>
  );
}

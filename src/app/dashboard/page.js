"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [form, setForm] = useState({
    date: "",
    broylar: {
      whole_sale_price: "",
      retail_sale_price: "",
    },
    sonali: {
      whole_sale_price: "",
      retail_sale_price: "",
    },
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const handleChange = (e, category, type) => {
    if (category) {
      setForm({
        ...form,
        [category]: {
          ...form[category],
          [type]: e.target.value,
        },
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
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
        broylar: {
          whole_sale_price: "",
          retail_sale_price: "",
        },
        sonali: {
          whole_sale_price: "",
          retail_sale_price: "",
        },
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
          🐔 Admin Dashboard — Add Daily Chicken Prices
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Broylar */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              🐥 ব্রয়লার মুরগী
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  পাইকারি দাম (TK)
                </label>
                <input
                  type="number"
                  value={form.broylar.whole_sale_price}
                  onChange={(e) =>
                    handleChange(e, "broylar", "whole_sale_price")
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  খুচরা দাম (TK)
                </label>
                <input
                  type="number"
                  value={form.broylar.retail_sale_price}
                  onChange={(e) =>
                    handleChange(e, "broylar", "retail_sale_price")
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sonali */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              🐓 সোনালী মুরগী
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  পাইকারি দাম (TK)
                </label>
                <input
                  type="number"
                  value={form.sonali.whole_sale_price}
                  onChange={(e) =>
                    handleChange(e, "sonali", "whole_sale_price")
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  খুচরা দাম (TK)
                </label>
                <input
                  type="number"
                  value={form.sonali.retail_sale_price}
                  onChange={(e) =>
                    handleChange(e, "sonali", "retail_sale_price")
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
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

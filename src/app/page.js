"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [selectedType, setSelectedType] = useState("sonali");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!selectedType) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/chicken/daily-price`,
        {
          params: {
            category: selectedType,
            startDate,
            endDate,
          },
        }
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType, startDate, endDate]);

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "পাইকারি মুল্য",
        data: data.map((item) => item.whole_sale_price),
        backgroundColor: "rgba(20, 162, 20, 1)",
        borderColor: "rgba(20, 162, 20, 1)",
      },
      {
        label: "খুচরা মুল্য",
        data: data.map((item) => item.retail_sale_price),
        backgroundColor: "rgba(255, 50, 50, 1)",
        borderColor: "rgba(255, 50, 50, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // <- Allow height resizing
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `${
          selectedType === "sonali" ? "সোনালী মুরগী" : "ব্রয়লার মুরগী"
        } প্রতি কেজি দাম`,
      },
    },
  };

  const date = () => {
    const now = new Date();
    const date = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const date_format = `${date}/${month}/${year}`;
    return date_format;
  };

  return (
    <>
      <marquee className="bg-red-500 text-white py-4">
        বিঃদ্রঃ এখানে প্রতিদিনের মুল্য আপডেট করা হয়{" "}
        <Link
          className="text-[#ffff00] font-bold"
          href={
            "https://dam.gov.bd/site/page/77c3d769-4cc5-43a4-bb9d-c82e51fdc292"
          }
        >
          <i>বাংলাদেশ কৃষি অধিদপ্তর</i>
        </Link>{" "}
        এর মুল্য তালিকা অনুযায়ী। অঞ্চলভেদে মুরগীর মুল্যের কিছুটা তারতম্য হতে
        পারে। আজকের তারিখঃ {date()}
      </marquee>
      <div className="py-5 min-h-[calc(100vh-80px)] overflow-hidden p-6 lg:p-10">
        <h1 className="text-center font-bold text-3xl my-5">
          🐔 দৈনিক মুরগীর দাম প্রতি কেজি 🐔
        </h1>
        <h2 className="text-xl font-bold text-center">পাইকারি এবং খুচরা</h2>

        <div className="mt-5 flex flex-wrap justify-between gap-5">
          <div>
            <label className="mr-1">নির্বাচিত :</label>
            <select
              className="border"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="sonali">সোনালী মুরগী</option>
              <option value="broylar">ব্রয়লার মুরগী</option>
            </select>
          </div>

          <div className="flex gap-5">
            <div>
              <label className="mr-1">Start Date:</label>
              <input
                className="border"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="mr-1">End Date:</label>
              <input
                className="border"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          {loading ? (
            <p className="my-10 text-center font-bold uppercase">
              Loading data...
            </p>
          ) : (
            <div className="w-full overflow-hidden">
              <div className="w-full h-[550px] md:h-[450px] lg:h-[400px] xl:h-[580px] bg-gray-200 p-4 rounded-xl">
                <Line data={chartData} options={options} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

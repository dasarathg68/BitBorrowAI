"use client";

import { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Score",
      data: [65, 70, 75, 72, 78, 85],
      borderColor: "hsl(var(--primary))",
      backgroundColor: "hsla(var(--primary), 0.1)",
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.1,
      fill: true,
    },
  ],
};

export function ReputationHistory() {
  const [chartHeight, setChartHeight] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartHeight(200);
      } else if (width < 1024) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "hsl(var(--bc))",
        },
        grid: {
          color: "hsl(var(--bc) / 0.1)",
        },
      },
      x: {
        ticks: {
          color: "hsl(var(--bc))",
        },
        grid: {
          color: "hsl(var(--bc) / 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "hsl(var(--b1))",
        titleColor: "hsl(var(--bc))",
        bodyColor: "hsl(var(--bc))",
        borderColor: "hsl(var(--bc) / 0.1)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl mb-2 sm:mb-4">
          Score History
        </h2>
        <div className="w-full" style={{ height: `${chartHeight}px` }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

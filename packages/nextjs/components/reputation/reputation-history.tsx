"use client";

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
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Score",
      data: [65, 70, 75, 72, 78, 85],
      borderColor: "hsl(var(--primary))",
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.1,
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
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
    },
  },
};

export function ReputationHistory() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Score History</h2>
      </div>
      <div className="card-body">
        <div className="h-[200px] w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

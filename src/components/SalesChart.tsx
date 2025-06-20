import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Define an interface for the individual data points
interface SalesDataPoint {
  month: string;
  sales: number;
}

// Define the props interface for the SalesChart component
interface SalesChartProps {
  data: SalesDataPoint[];
  title?: string; // Make title optional
  subtitle?: string; // Optional subtitle
  growthPercentage?: string; // Optional growth percentage
}

const SalesChart: React.FC<SalesChartProps> = ({
  data,
  title = "Sales Overview", // Default title
  subtitle = "Monthly performance", // Default subtitle
  growthPercentage,
}) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Sales",
        data: data.map((d) => d.sales),
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "rgba(245, 158, 11, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y}k`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: "#4B5563", // gray-700 for month labels
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB", // gray-200 for y-axis grid lines
        },
        ticks: {
          callback: function (value: string | number) {
            return `$${value}k`;
          },
          color: "#4B5563",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        {growthPercentage && (
          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">{growthPercentage}</span>
          </div>
        )}
      </div>

      {/* Chart.js Bar Chart */}
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesChart;

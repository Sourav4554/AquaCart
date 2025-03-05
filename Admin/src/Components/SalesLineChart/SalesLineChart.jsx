import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from "chart.js";
import { Materials } from "../../Context/Context";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesLineChart = () => {
  const { salesData } = useContext(Materials) || {};

  const chartData = {
    labels: salesData?.labels?.length ? salesData.labels : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Sales (₹)",
        data: salesData?.revenew?.length ? salesData.revenew : [12000, 18000, 15000, 22000, 25000, 30000],
        borderColor: "green",
        backgroundColor: "blue",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        title: { display: true, text: "Revenue (₹)" },
        ticks: {
          color: "green", 
        },
        grid: {
          color: "black",
        },
      },
      x: {
        title: { display: true, text: "Time (Months)" },
        ticks: {
          color: "purple", 
        },
        grid: {
          color: "black", // X-axis grid lines color
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SalesLineChart;

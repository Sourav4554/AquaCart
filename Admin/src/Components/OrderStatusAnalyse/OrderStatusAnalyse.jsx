import React, { useContext, useEffect, useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Materials } from "../../Context/Context"; // Importing Context

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = () => {
  const { orderStatusData } = useContext(Materials);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!orderStatusData) return;

    setChartData({
      labels: orderStatusData.labels?.length
        ? orderStatusData.labels
        : ["Pending", "Completed", "Out for Delivery"],
      datasets: [
        {
          data: orderStatusData.data?.length ? orderStatusData.data : [1, 1, 1, 1],
          backgroundColor: ["#f39c12", "#2ecc71", "#e74c3c", "#3498db"],
          hoverBackgroundColor: ["#e67e22", "#27ae60", "#c0392b", "#2980b9"],
          borderWidth: 1,
        },
      ],
    });
  }, [orderStatusData]); 

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, 
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  }), []); 

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "300px", height: "300px", margin: "10px 10px" }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderStatusChart;

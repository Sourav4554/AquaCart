import React, { useContext, useEffect, useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Materials } from "../../Context/Context"; // Importing Context

ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentAnalyze = () => {
  const { paymentMethodData } = useContext(Materials);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!paymentMethodData) return;

    setChartData({
      labels: paymentMethodData.labels?.length
        ? paymentMethodData.labels
        : ["Razorpay", "Stripe", "COD"],
      datasets: [
        {
          data: paymentMethodData.data?.length ? paymentMethodData.data : [1, 1, 1],
          backgroundColor: ["#3498db", "#2ecc71", "#f39c12"],
          hoverBackgroundColor: ["#2980b9", "#27ae60", "#e67e22"],
          borderWidth: 1,
        },
      ],
    });
  }, [paymentMethodData]); 
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
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default PaymentAnalyze;

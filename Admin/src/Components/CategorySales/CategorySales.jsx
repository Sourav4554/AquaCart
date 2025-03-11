import React, { useContext,useEffect } from 'react'
import { Materials } from '../../Context/Context'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const CategorySales = () => {
const {  categorySalesdata,setCategorySales,orders}=useContext(Materials)
useEffect(() => {
    const salesMap = {};
    if (orders.length > 0) {
      orders.forEach((order) => {
        order.items.forEach((item) => {
            salesMap[item.category] = (salesMap[item.category] || 0) + item.quantity;
        });
      });
      setCategorySales({
        category: Object.keys(salesMap), 
        sales: Object.values(salesMap), 
      });
    }
  }, [orders]); 

  const chartData = {
    labels: categorySalesdata.category.length?categorySalesdata.category : ["Goldfish", "Betta", "Guppy"],
    datasets: [
      {
        label: "Sales per Category",
        data: categorySalesdata.sales.length ? categorySalesdata.sales : [50, 30, 20],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#FF5722"],

        borderWidth: 1,
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
        title: { display: true, text: "Sales Count" },
        ticks: {
            color: "green", 
          },
      },
     
      x: {
        title: { display: true, text: "Fish Categories" },
        ticks: {
            color: "purple", 
          },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default CategorySales
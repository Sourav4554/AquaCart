import React, { useContext, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Pages/Login/Login';
import { Materials } from './Context/Context';
import Product from './Pages/Product/Product';
import DashBoard from './Pages/DashBoard/DashBoard';
import { Box } from '@mui/material';
import Customer from './Pages/Customer/Customer';
import Order from './Pages/Order/Order';
import Analytic from './Pages/Analytics/Analytic';
import AddProduct from './Pages/AddProduct/AddProduct';
import UpdateProduct from './Pages/UpdateProduct/UpdateProduct';


const App = () => {
  const {showLogin}=useContext(Materials)

  return (
    
      <div>
        <ToastContainer/>
        {showLogin ? (
        <>
         
          <Navbar />
          <Box sx={{ display: "flex", height: "90vh" }}>
          <Sidebar />
          <Box sx={{ flexGrow: 1, padding: 2, overflowY: "auto" }}>
          <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/products" element={<Product />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/analytics" element={<Analytic />} />
              <Route path="/productadd" element={<AddProduct />} />
              <Route path='/updateproduct/:id' element={<UpdateProduct/>}/>
            </Routes>
            </Box>
          </Box>
          </>
        ) : (
          
          <Routes>
            <Route path="/" element={<Login  />} />
            
          </Routes>
        )}
      </div>
 
  );
};

export default App;

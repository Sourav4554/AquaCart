import React, { useContext, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Pages/Login/Login';
import { Materials } from './Context/Context';

const App = () => {
  const {showLogin}=useContext(Materials)

  return (
    <BrowserRouter>
      <div>
        <ToastContainer/>
        {showLogin ? (
        <>
         
          <Navbar />
          <Sidebar />
          </>
        ) : (
          
          <Routes>
            <Route path="/" element={<Login  />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;

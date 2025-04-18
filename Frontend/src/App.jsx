import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Search from './Component/Search/Search';
import Collections from './Pages/Collections/Collections';
import Footer from './Component/Footer/Footer';
import Cart from './Pages/Cart/Cart';
import Product from './Pages/Product/Product';
import ScrollToTop from './Component/ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import WishList from './Pages/Wishlist/WishList';
import Login from './Pages/Login/Login';
import Email from './Pages/Email/Email';
import Checkout from './Pages/Checkout/Checkout';
import Order from './Pages/Order/Order';
import Verifyorder from './Pages/VerifyOrder/Verifyorder';
import AquaAi from './Pages/AquaAi/AquaAi';
import Loader from './Component/Loader/Loader';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate 2-second loading
  }, []);

  return (
    <div>
      <BrowserRouter>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar />
            <ToastContainer autoClose={4000} limit={1} />
            <Search />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:productid" element={<Product />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/email" element={<Email />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/myorder" element={<Order />} />
              <Route path="/verify" element={<Verifyorder />} />
              <Route path="/aquaai" element={<AquaAi />} />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

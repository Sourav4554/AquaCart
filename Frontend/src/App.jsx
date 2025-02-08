import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import {Routes,Route, BrowserRouter}from 'react-router-dom'
import Search from './Component/Search/Search'
import Collections from './Pages/Collections/Collections'
import Footer from './Component/Footer/Footer'
import Cart from './Pages/Cart/Cart'
import Product from './Pages/Product/Product'
import ScrollToTop from './Component/ScrollToTop/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import WishList from './Pages/Wishlist/WishList'
import Login from './Pages/Login/Login'
import Email from './Pages/Email/Email'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <ToastContainer/>
      <Search/>
      <ScrollToTop/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/collections' element={<Collections/>}/>
        <Route path='/cart' element={<Cart/>}/>
         <Route path='/product/:productid' element={<Product/>}/> 
         <Route path='/wishlist' element={<WishList/>}/>
         <Route path='/login' element={<Login />}/>
         <Route path='/email' element={<Email/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>    
    </div>
  )
}

export default App
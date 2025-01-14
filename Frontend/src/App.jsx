import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import {Routes,Route, BrowserRouter}from 'react-router-dom'
import Search from './Component/Search/Search'
import Collections from './Pages/Collections/Collections'
import Footer from './Component/Footer/Footer'
import Cart from './Pages/Cart/Cart'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Search/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/collections' element={<Collections/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>    
    </div>
  )
}

export default App
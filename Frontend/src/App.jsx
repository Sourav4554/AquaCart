import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import {Routes,Route, BrowserRouter}from 'react-router-dom'
import Search from './Component/Search/Search'
import Collections from './Pages/Collections/Collections'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Search/>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/collections' element={<Collections/>}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  )
}

export default App
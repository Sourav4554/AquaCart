import React from 'react'
import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import {Routes,Route, BrowserRouter}from 'react-router-dom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'element={<Home/>}/>
      </Routes>
      </BrowserRouter>
 
    </div>
  )
}

export default App
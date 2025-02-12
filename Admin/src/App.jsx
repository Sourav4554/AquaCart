import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <div className="sidebar">
        <Sidebar/>
      </div>
    </div>
  )
}

export default App
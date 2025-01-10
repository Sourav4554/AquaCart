import React from 'react'
import Header from '../../Component/Header/Header'
import About from '../../Component/About/About'
import Promotion from '../../Component/Promotion/Promotion'
import Gallery from '../../Component/Gallery/Gallery'
const Home = () => {
  return (
    <div>
        <Header/>
        <About/>
        <Promotion/>
        <Gallery/>
    </div>
  )
}

export default Home
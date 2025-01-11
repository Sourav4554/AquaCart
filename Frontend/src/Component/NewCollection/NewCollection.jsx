import React, { useContext, useEffect, useState } from 'react'
import './NewCollection.css'//css for styling the newcollection
import Card from '../Card/Card'//card component
import { settings1 } from '../../Utilities/Carousel'
import Slider from 'react-slick'// this is the library for carousel slider effect
import { ProductContext } from '../../Context/ProductContext'

const NewCollection = () => {
const {ProductLists}=useContext(ProductContext);
const[newcollection,setNewCollection]=useState([]);
 useEffect(()=>{
 const sliceCards=ProductLists.slice(0,8);
 setNewCollection(sliceCards)
 },[])
  return (
    <div className='main-container-newcollection'>
        <div className="container-1-for-heaing">
          <h2>NEW COLLECTIONS</h2>
          <p>Discover the latest arrivals of vibrant ornamental fish, Find your perfect aquatic addition today!</p>
        </div>
        <div className="container-2-for-items">
             <div className="card-div-for-newcollection">
               
                 <Slider {...settings1}>
                   {

                 newcollection.map((item,index)=>{
                 return(
                     <Card key={index} image={item.image} name={item.name} description1={item.description1} price={item.price} stock={item.stock}/>
                     )
                 })
                }   
                </Slider> 
             </div>
        </div>
    </div>
  )
}

export default NewCollection
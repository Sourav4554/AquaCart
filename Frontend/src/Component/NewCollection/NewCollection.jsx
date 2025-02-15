import React, { useContext, useEffect, useState } from 'react'
import './NewCollection.css'//css for styling the newcollection
import Card from '../Card/Card'//card component
import { settings1 } from '../../Utilities/Carousel'
import Slider from 'react-slick'// this is the library for carousel slider effect
import { ProductContext } from '../../Context/ProductContext'//products from context api
import ScrollAnimation from 'react-animate-on-scroll'//library for scroll animation
import'animate.css' //animation file
const NewCollection = () => {
const {fishList}=useContext(ProductContext);
//state variable for store new collection
const[newcollection,setNewCollection]=useState([]);
//slice new 8 card and store in new cllecctions
 useEffect(()=>{
 const sliceCards=fishList.slice(0,8);
 setNewCollection(sliceCards)
 },[])
  return (
    <div className='main-container-newcollection'>
        <div className="container-1-for-heaing">
          <h2>NEW COLLECTIONS</h2>
          <p>Discover the latest arrivals of vibrant ornamental fish, Find your perfect aquatic addition today!</p>
        </div>
        <div className="container-2-for-items">
            <ScrollAnimation animateIn='animate__backInRight'>
            <div className="card-div-for-newcollection">
               
               <Slider {...settings1}>
                 {

               newcollection.map((item,index)=>{
               return(
                   <Card key={index} image={item.image} name={item.name} description1={item.description1} price={item.price} stock={item.stock} _id={item._id}/>
                   )
               })
              }   
              </Slider> 
           </div>
            </ScrollAnimation>
        </div>
    </div>
  )
}

export default NewCollection
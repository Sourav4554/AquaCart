import React, { useContext, useState } from 'react';//import usestate and usecontext
import './Gallery.css';// css file for style the gallery component
import ScrollAnimation from 'react-animate-on-scroll';// animation at the time of scroll
import Slider from 'react-slick'// this is the library for carousel slider effect
import 'animate.css/animate.min.css'; //used for animations
import "slick-carousel/slick/slick.css";//css file for slider
import "slick-carousel/slick/slick-theme.css";//css file for slider
import {ProductContext} from '../../Context/ProductContext';//context
import { settings } from '../../Utilities/Carousel';//setting for the slider
const Gallery = () => {
//The products from the context page
const {fishList}=useContext(ProductContext)
if (fishList.length === 0) {
  return <p>Loading product...</p>; // ✅ Show a loading message
}
//Store the products in a usestate variable
const [allProducts,setAllProducts]=useState(fishList);
  return (
    <div className="maindiv-for-gallery">
      <ScrollAnimation animateIn='animate__fadeInUp' animateOnce>
        <div className="heading-div">
          <h2 className="head-1">AQUATIC BEAUTY</h2>
          <p className="para-1">
          Dive into the enchanting world of vibrant marine life. Explore a stunning array of aquatic wonders and colorful underwater beauty.
          </p>
        </div>
        </ScrollAnimation>
      <ScrollAnimation animateIn="animate__backInRight" animateOnce={true}>
        <div className="card-div">
          {/*Mapping throug each slide */}
        <Slider {...settings}>
        {
        allProducts.map((item,index)=>{
        return(
            <div className="card" key={index}>
         <img src={item.image} alt="" />
         <div className="for-fishdetails">
           <h3 className="for-fishname">{item.name}</h3>
           <p className="for-fishdescription">{item.description1}</p>
         </div>
       </div>
          )})
        }
          </Slider>
        </div>
      </ScrollAnimation>
    </div>
  );
};
export default Gallery;

import React, { useState, useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import { Requirements } from '../../assets/Assets';
import { motion, useScroll } from "framer-motion";
import './Navbar.css';
import { ProductContext } from '../../Context/ProductContext';
const Navbar = () => {
  const { scrollYProgress } = useScroll();//used for animation on scroll navbar
 // State to manage the active navbar state (for listing nav details)
const [active,setActive]=useState(true);
// State to manage the style for active state in the navbar
const [style,setStyle]=useState('')
// State to change navbar color based on scroll position
const[color,setColor]=useState(true)
// Get the current location from react-router to handle navigation-based changes
const location=useLocation();
//take the usestate function used for search visibility
const{setShowSearch}=useContext(ProductContext)
// Prevent page refresh when a navigation link is clicked
const preventRefreshig=(e)=>{
e.preventDefault();
}
 // Function to handle color change based on scrolling
const colorChange=()=>{
const scroll=window.scrollY;
  // Set the color state based on the scroll position
if(scroll===0){
setColor(true)
}else{
setColor(false)
}
}
 // useEffect to handle scroll event listener on the homepage
useEffect(()=>{
if(location.pathname==='/'){
window.addEventListener('scroll',colorChange)
return ()=>{
window.removeEventListener('scroll',colorChange)
};
}
else{
setColor(false);
}
},[location.pathname])

  return (
    <div>
         {/* Navbar container with dynamic color change based on scroll position */}
        <div className={color?"parent-navbar":"changecolor"}>
            <div className='for-logo'>
             <Link to='/'><img src={Requirements.logo} alt="" /></Link>
            </div>
             {/* Navbar icons section */}
            <div className='for-icons'>
            <Link to='/collections'> <img  src={Requirements.searchicon} alt="" onClick={()=>{setStyle('search');setShowSearch(true)}} className={style==='search'?"active":""} /></Link>
            <Link to='/cart'><img src={Requirements.carticon} alt="" onClick={()=>setStyle('cart')} className={style==='cart'?"active":""}/></Link>
           <Link to='wishlist'><img src={Requirements.wishlist} alt="" onClick={()=>setStyle('wishlist')}className={style==='wishlist'?"active":""}/></Link>
             {/* Toggle the navigation list based on active state */}
             {
             active?(
            <img src={Requirements.list} alt="" onClick={()=>{setActive(false)}}/>
            ):(
            <>
            <img src={Requirements.cross} alt="" onClick={()=>{setActive(true)}}/>
            {/*for list navbar details */}
             <div className={color?"for-list":"for-list-colorchange"}>
            <ul>
            <li  className={`navbar-content-li ${style === 'home' ? 'active' : ''}`} onClick={(e)=>{preventRefreshig(e);setStyle('home')}} ><Link to='/' >Home</Link></li>
                <li className='navbar-content-li'><a href="#" onClick={(e)=>{preventRefreshig(e);setStyle('about')} }className={style==='about'?"active":""}>About</a></li>
                <li  className={`navbar-content-li ${style === 'product' ? 'active' : ''}`} onClick={(e)=>{preventRefreshig(e);setStyle('product')}} ><Link to='/collections' >Product</Link></li>
                <li className='navbar-content-li'><a href="#" onClick={(e)=>{preventRefreshig(e);setStyle('ai')} }className={style==='ai'?"active":""}>Aqua Ai</a></li>
                <li className='navbar-content-li'><a href="#" onClick={(e)=>{preventRefreshig(e);setStyle('contact')}} className={style==='contact'?"active":""}>Contact</a></li>
            </ul>
            </div> 
            </>
            )
             }
             {/*Login button */}
             <button className='login-button'>Login</button> 
            </div>
        </div>
        <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}

export default Navbar
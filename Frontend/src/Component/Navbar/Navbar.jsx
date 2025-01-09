import React, { useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'
import { Requirements } from '../../assets/Assets';
import './Navbar.css';
const Navbar = () => {
 // State to manage the active navbar state (for listing nav details)
const [active,setActive]=useState(true);
// State to manage the style for active state in the navbar
const [style,setStyle]=useState('')
// State to change navbar color based on scroll position
const[color,setColor]=useState(true)
// Get the current location from react-router to handle navigation-based changes
const location=useLocation();
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
             <img src={Requirements.logo} alt="" />
            </div>
             {/* Navbar icons section */}
            <div className='for-icons'>
             <img src={Requirements.searchicon} alt="" onClick={()=>setStyle('search')} className={style==='search'?"active":""}/>
             <img src={Requirements.carticon} alt="" onClick={()=>setStyle('cart')} className={style==='cart'?"active":""}/>
             <img src={Requirements.wishlist} alt="" onClick={()=>setStyle('wishlist')}className={style==='wishlist'?"active":""}/>
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
                <li className='navbar-content-li'><a href="#" onClick={(e)=>{preventRefreshig(e);setStyle('home')}}className={style==='home'?"active":""}>Home</a></li>
                <li className='navbar-content-li'><a href="#" onClick={(e)=>{preventRefreshig(e);setStyle('about')} }className={style==='about'?"active":""}>About</a></li>
                <li className='navbar-content-li'><a href="#" onClick={(e)=>{preventRefreshig(e);setStyle('product')}} className={style==='product'?"active":""}>Product</a></li>
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
    </div>
  )
}

export default Navbar
import React, { useState } from 'react';
import { Requirements } from '../../assets/Assets';
import './Navbar.css';
const Navbar = () => {
const [active,setActive]=useState(true);//state for listing nav details
const [style,setStyle]=useState('')//state for active state

  return (
    <div>
        <div className="parent-navbar">
          {/* for logo left section*/}
            <div className='for-logo'>
             <img src={Requirements.logo} alt="" />
            </div>
            {/*for icons mid section*/}
            <div className='for-icons'>
             <img src={Requirements.searchicon} alt="" onClick={()=>setStyle('search')} className={style==='search'?"active":""}/>
             <img src={Requirements.carticon} alt="" onClick={()=>setStyle('cart')} className={style==='cart'?"active":""}/>
             <img src={Requirements.wishlist} alt="" onClick={()=>setStyle('wishlist')}className={style==='wishlist'?"active":""}/>
             {
             active?(
            <img src={Requirements.list} alt="" onClick={()=>{setActive(false)}}/>
            ):(
            <>
            <img src={Requirements.cross} alt="" onClick={()=>{setActive(true)}}/>
            {/*for list navbar details */}
             <div className='for-list'>
            <ul>
                <li><a href="#" onClick={(e)=>{e.preventDefault();setStyle('home')}}className={style==='home'?"active":""}>Home</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault();setStyle('about')} }className={style==='about'?"active":""}>About</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault();setStyle('product')}} className={style==='product'?"active":""}>Product</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault();setStyle('ai')} }className={style==='ai'?"active":""}>Aqua Ai</a></li>
                <li><a href="#" onClick={(e)=>{e.preventDefault();setStyle('contact')}} className={style==='contact'?"active":""}>Contact</a></li>
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
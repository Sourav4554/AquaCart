import React, { useContext, useEffect, useState } from 'react';
import { Requirements } from '../../assets/Assets';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';
import { motion, useScroll } from "framer-motion";

const Navbar = () => {
const { scrollYProgress } = useScroll();//used for animation on scroll navbar
const [active,setActive]=useState(true);//state for listing nav details
const{setShowSearch,token,createToken,userData,cartData,cartNumbers,setCartNumbers}=useContext(ProductContext)
const [style,setStyle]=useState('')//state for active state
const[color,setColor]=useState(true)//state for color in scrolling time
const location=useLocation();//taking the location
const navigate=useNavigate()
useEffect(()=>{
setCartNumbers((prev)=>Object.keys(cartData).length)
console.log(cartNumbers)
},[cartData])
//function for prevent page refreshing
const preventRefreshig=(e,sectionId)=>{
e.preventDefault();
console.log(sectionId)
const section = document.getElementById(sectionId);
if (section) {
  section.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly
}
}
//function for changing the color change on scrolling
const colorChange=()=>{
const scroll=window.scrollY;
if(scroll===0){
setColor(true)
}else{
setColor(false)
}
}

//function for logout
const logOut=()=>{
sessionStorage.removeItem("token")
createToken('');
navigate('/')
window.location.reload()
}
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
        <div className={color?"parent-navbar":"changecolor"} >
          {/* for logo left section*/}
            <div className='for-logo'>
            <Link to='/'> <img src={Requirements.logo} alt="" /></Link>
            </div>
            {/*for icons mid section*/}
            <div className='for-icons'>
            <Link to='/collections'> <img  src={Requirements.searchicon} alt="" onClick={()=>{setStyle('search');setShowSearch(true)}} className={style==='search'?"active":""} /></Link>
            <Link to='/cart'> <img src={Requirements.carticon} alt="" onClick={()=>setStyle('cart')} className={style==='cart'?"active":""}/><span className='number'>{cartNumbers}</span></Link>
            <Link to='/wishlist'> <img src={Requirements.wishlist} alt="" onClick={()=>setStyle('wishlist')}className={style==='wishlist'?"active":""}/></Link>
             {
             active?(
            <img src={Requirements.list} alt="" onClick={()=>{setActive(false)}}/>
            ):(
            <>
            <img src={Requirements.cross} alt="" onClick={()=>{setActive(true)}}/>
            {/*for list navbar details */}
             <div className={color?"for-list":"for-list-colorchange"}>
            <ul>
                <li  className={`navbar-content-li ${style === 'home' ? 'active' : ''}`} onClick={(e)=>{preventRefreshig(e,'home');setStyle('home')}} ><Link to='/' >Home</Link></li>
                <li className={`navbar-content-li ${style=='about'?'active':''}`} onClick={(e)=>{preventRefreshig(e,'about');setStyle('about')}} ><Link to='/' >About</Link> </li>
                <li  className={`navbar-content-li ${style === 'product' ? 'active' : ''}`} onClick={(e)=>{preventRefreshig(e);setStyle('product')}} ><Link to='/collections' >Product</Link></li>
                <li  className={`navbar-content-li ${style === 'ai' ? 'active' : ''}`} onClick={(e)=>{preventRefreshig(e);setStyle('ai')}} ><Link to='/aquaai' >Aqua Ai</Link></li>
                <li className='navbar-content-li'><a href="#footer" onClick={(e)=>{preventRefreshig(e,'footer');setStyle('contact')}} className={style==='contact'?"active":""}>Contact</a></li>
            </ul>
            </div> 
            </>
            )
             }
             {/*Login button */}
             {
             !token?(
           <Link to='/login'> <button className='login-button'>Login</button> </Link>
           ):(
           <>
             <div className='after-login-div'>
              <p>{userData && userData.name ? userData.name.charAt(0).toUpperCase():""}</p>
              <div  className={color?"sub":"for-list-sub"}>
              <li onClick={logOut} className='list'>logout</li>
              <li className='list'><Link to='/myorder'>Orders</Link></li>
             </div>
             </div>
           
           </>
             
            )
             }
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
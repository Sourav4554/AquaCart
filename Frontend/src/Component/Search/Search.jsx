import React, { useContext, useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";//search icon
import { RxCross1 } from "react-icons/rx"; //cross icon
import './Search.css'
import { ProductContext } from '../../Context/ProductContext';
import { useLocation } from 'react-router-dom';
const Search = () => {
const{showSearch,setShowSearch}=useContext(ProductContext);
const[visible,setVisible]=useState(false)
const location=useLocation();

useEffect(()=>{
location.pathname==='/collections'?setVisible(true):setVisible(false)
},[location])

  return (
    showSearch && visible?(
    <div className='main-div-for-search'>
        <div className="for-search">
            <input type="text" placeholder='search'/>
            <IoIosSearch className='search-icon'/>
        </div>
        <RxCross1 className='cross-icon' onClick={()=>{setVisible(false)}}/>
    </div>
    ):(null)
  )
}

export default Search
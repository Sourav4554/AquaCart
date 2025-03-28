import React, { useContext, useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";//search icon
import { RxCross1 } from "react-icons/rx"; //cross icon
import './Search.css'
import { ProductContext } from '../../Context/ProductContext';
import { useLocation } from 'react-router-dom';
const Search = () => {
const{showSearch,setShowSearch,searchValue,setSearchValue}=useContext(ProductContext);
const[visible,setVisible]=useState(false)
const location=useLocation();

useEffect(()=>{
location.pathname==='/collections'?setVisible(true):setVisible(false)
},[location,setShowSearch])

  return (
    showSearch && visible?(
    <div className='main-div-for-search'>
        <div className="for-search">
            <input type="text" placeholder='search' onChange={(e)=>setSearchValue(e.target.value)} value={searchValue}/>
            <IoIosSearch className='search-icon'/>
            <RxCross1 className='cross-icon-search' onClick={()=>{setVisible(false);setShowSearch(false);setSearchValue('')}}/>
        </div>
        
    </div>
    ):(null)
  )
}

export default Search
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import './Search.css'
const Search = () => {
  return (
    <div className='main-div-for-search'>
        <div className="for-search">
            <input type="text" placeholder='search'/>
            <IoIosSearch className='search-icon'/>
        </div>
        <RxCross1 className='cross-icon'/>
    </div>
  )
}

export default Search
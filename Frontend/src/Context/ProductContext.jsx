import React, { createContext, useState } from 'react';
import {ProductLists} from '../assets/Assets'
export const ProductContext=createContext(null)
const ProductContextProvider = ({children}) => {
  //state for managing search bar visibility
const[showSearch,setShowSearch]=useState(false);
//state for managing values in a search bar
const[searchValue,setSearchValue]=useState('')
const Element={
ProductLists,
showSearch,
setShowSearch,
searchValue,
setSearchValue,
}
  return (
    <div>
    <ProductContext.Provider value={Element}>
     {children}
    </ProductContext.Provider>
    </div>
  )
}

export default ProductContextProvider
import React, { createContext, useState } from 'react';
import {ProductLists} from '../assets/Assets'
export const ProductContext=createContext(null)
const ProductContextProvider = ({children}) => {
  //state for managing search bar visibility
const[showSearch,setShowSearch]=useState(false);
const Element={
ProductLists,
showSearch,
setShowSearch,
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
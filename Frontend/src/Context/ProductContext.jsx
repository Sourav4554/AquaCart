import React, { createContext } from 'react';
import {ProductLists} from '../assets/Assets'
export const ProductContext=createContext(null)
const ProductContextProvider = ({children}) => {
const Element={
ProductLists,
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
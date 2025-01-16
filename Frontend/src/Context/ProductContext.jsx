import React, { createContext, useState } from 'react';
import {ProductLists} from '../assets/Assets'
export const ProductContext=createContext(null)
const ProductContextProvider = ({children}) => {
  //state for managing search bar visibility
const[showSearch,setShowSearch]=useState(false);
//state for managing values in a search bar
const[searchValue,setSearchValue]=useState('')
//state for managing the visibility of review adding popup
const[showReviewContainer,setShowReviewContainer]=useState(false)
//state for store the all reviews
const[allReview,setAllReview]=useState([]);
const Element={
ProductLists,
showSearch,
setShowSearch,
searchValue,
setSearchValue,
showReviewContainer,
setShowReviewContainer,
allReview,
setAllReview
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
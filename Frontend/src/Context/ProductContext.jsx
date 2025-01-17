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
//manage cartdata
const[cartData,setCartData]=useState({})

//add to cart
const addToCart=(itemId)=>{
if(!cartData[itemId]){
setCartData(prev=>({...prev,[itemId]:1}))
}
else{
setCartData((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
}

//remove from cart
const removeFromCart=(itemId)=>{
setCartData((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}

//delete cart data
const deleteCartData=(itemId)=>{
setCartData((prev)=>({...prev,[itemId]:0}))
}

//calculate total amount in cart
const calculateTotalAmout=()=>{
let TotalAmount=0;
for(const item in cartData){
if(cartData[item]>0){
let itemInformation=ProductLists.find(product=>product._id===Number(item))
TotalAmount+=itemInformation.price*cartData[item]
}
}
return TotalAmount;
}


const Element={
ProductLists,
showSearch,
setShowSearch,
searchValue,
setSearchValue,
showReviewContainer,
setShowReviewContainer,
allReview,
setAllReview,
cartData,
setCartData,
addToCart,
removeFromCart,
deleteCartData,
calculateTotalAmout
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
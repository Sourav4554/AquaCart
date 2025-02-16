import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
export const ProductContext=createContext(null)
const ProductContextProvider = ({children}) => {
//backend url
const backendUrl='http://localhost:4000'
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
//manage wishlist data
const[wishListData,setWishListData]=useState({})
//manage jwttoken
const[token,createToken]=useState('');
//manage visibility of otp container
const [showOtpContainer, setShowOtpContainer] = useState(false);
//manage userdata
const[userData,setUserData]=useState({})
//storing fish list
const[fishList,setFishList]=useState([])
//add to cart
const addToCart=async(itemId)=>{
if(!cartData[itemId]){
setCartData(prev=>({...prev,[itemId]:1}))
}
else{
setCartData((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
await axios.post(`${backendUrl}/api/cart/addcart`,{productId:itemId},{headers:{Authorization: `Bearer ${token}`,}})
}

//remove from cart
const removeFromCart=async(itemId)=>{
setCartData((prev)=>({...prev,[itemId]:prev[itemId]-1}))
await axios.post(`${backendUrl}/api/cart/removecart`,{productId:itemId},{headers:{Authorization: `Bearer ${token}`,}})
}

//delete cart data
const deleteCartData=async(itemId)=>{
setCartData((prev)=>({...prev,[itemId]:0}))
await axios.delete(`${backendUrl}/api/cart/deletecart`,{data:{ productId: itemId },headers:{Authorization: `Bearer ${token}`,}})
}

//fetch cartdata
const fetchCartData=async(token)=>{
try {
  const {data}=await axios.get(`${backendUrl}/api/cart/cartdata`,{headers:{Authorization: `Bearer ${token}`,}})
  if(data.success){
  setCartData(data.message)
  }
} catch (error) {
  console.log(error)
}
}

//calculate total amount in cart
 const calculateTotalAmout=()=>{
 let TotalAmount=0;
 if(!fishList|| fishList.length===0){
 return TotalAmount;
 }
 for(const item in cartData){
 if(cartData[item]>0){
 let itemInformation=fishList.find(product=>product._id===item)
 if (itemInformation) {  
  TotalAmount += itemInformation.price * cartData[item];
} 
 }
 }
 return TotalAmount;
}

//add to wishlist
const addToWish=(itemId)=>{
  setWishListData((prev)=>({...prev,[itemId]:1}))
  }
  
//delete from wishlist
  const deleteFromWish=(itemId)=>{
    setWishListData((prev)=>({...prev,[itemId]:0}))
  }

//fetch the name of user
  const fetchUserData=async(token)=>{

    try {
      const {data}=await axios.post(`${backendUrl}/api/user/userdata`,{},{headers:{Authorization: `Bearer ${token}`,}})
      if(data.success){
     setUserData(data.message)
      }
    } catch (error) {
     
       console.log(error)
    }
    }

    //fetch fish list from backend
    const FetchFishList=async()=>{
      const {data}=await axios.get(`${backendUrl}/api/fish/list-fish`,{})
     try {
      if(data.succes){
        setFishList(data.message)
        }
        else{
        console.log('error'+data.message)
        }
     } catch (error) {
      console.error("Fetch Error:", error.message || error);
     }
      }

  


    useEffect(()=>{
    async function loadData(){
    if(sessionStorage.getItem("token")){
    createToken(sessionStorage.getItem('token'))
    await fetchUserData(sessionStorage.getItem('token'))
    await fetchCartData(sessionStorage.getItem('token'))
    }
    await  FetchFishList();
  }
    loadData();
    },[])


const Element={
fishList,
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
calculateTotalAmout,
wishListData,
setWishListData,
addToWish,
deleteFromWish,
backendUrl,
token,
createToken,
userData,
showOtpContainer,
setShowOtpContainer
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
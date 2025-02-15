import React, { useContext } from 'react'
import './WishList.css'
import { RxCross1 } from "react-icons/rx";
import { ProductContext } from '../../Context/ProductContext'
import { toast } from 'react-toastify';
const WishList = () => {
const{fishList,addToCart,cartData, wishListData,deleteFromWish}=useContext(ProductContext)

//check data already in cart and stock update
const HandleAddToCart=(_id,stock)=>{
if(!stock){
toast.error("Out Of Stock")
}
else{
if(cartData[_id]){
toast.info("Item Already in Cart")
}
else{
addToCart(_id)
toast.success("Added to Cart")
}
}}
  return (
    <div className='main-container-for-wish-list'>
     <div className="for-heading">
        <h4>My wishList</h4>
     </div>
   
     <div className="for-wish-items">
        {
        fishList.map((item,index)=>{
            if(wishListData[item._id]){
        return(
            <div className='wish-items' key={index}>
          
              <img src={item.image} alt="" />
              
              <p className='font-weight'>{item.name}</p>
              <p>{item.category}</p>
              <p className='font-weight'>₹{item.price}</p>
              <p><span style={{backgroundColor: item.stock ? "green" : "red",}}></span>{item.stock  ? 'In Stock' : 'Out of Stock'}</p>
              <li className='add-cart-button-wishlist' onClick={()=>{HandleAddToCart(item._id,item.stock)}}>Add Cart</li>
              <RxCross1 className='wish-cross' onClick={()=>{ deleteFromWish(item._id)}}/>
            </div>
            )}
        })
        }
     </div>
    </div>
  )
}

export default WishList
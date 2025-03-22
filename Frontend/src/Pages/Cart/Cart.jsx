import React, { useContext,useEffect,useState } from 'react'
import './Cart.css'
import {toast} from 'react-toastify'
import { ProductContext } from '../../Context/ProductContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate=useNavigate();
  const {fishList,cartData,addToCart,removeFromCart,deleteCartData,calculateTotalAmout,token,userData,backendUrl,promocodeDiscount,setPromocodeDiscount}=useContext(ProductContext);
  //state for store promocode
  const[promocode,setPromocode]=useState('')
  //state for display offer message in carttotal
const[display,setDisplay]=useState(false)
 //function for send promocode
 const sendPromocode=async()=>{
try {
  const email=userData&&userData.email?userData.email:'';
  if(calculateTotalAmout()<2000){
  toast.info('subtotal is less than 2000');
  return;
  }
  else{
  const {data}=await axios.post(`${backendUrl}/api/promo/fetch`,{email},{headers:{Authorization: `Bearer ${token}`,}})
  if(data.success){
  toast.success(data.message);
  setPromocode('')
  }
  else{
  toast.error(data.message)
  }
  }
} catch (error) {
  toast.error(error.response.data.message)
}
}
//function for submit promocode
const submitPromoCode=async()=>{
  if(calculateTotalAmout()<2000){
    toast.error('subtotal is less than 2000');
    return;
    }
try {
  const {data}=await axios.post(`${backendUrl}/api/promo/apply`,{promocode},{headers:{Authorization: `Bearer ${token}`,}})
  if(data.success){
  toast.success(data.message);
  setPromocodeDiscount(data.discountPercentage)
  sessionStorage.setItem('discount',data.discountPercentage);
  setDisplay(true)
  setPromocode('')
  }
  else{
  toast.error(data.message)
  }
} catch (error) {
  toast.error(error.response.data.message)
}
}

const checkOutHandler=()=>{

if(!calculateTotalAmout()){
toast.info('No cart items');
}
else{
navigate('/checkout')
}
}

 useEffect(()=>{
if(calculateTotalAmout()<2000){
setDisplay(false);
sessionStorage.removeItem('discount');
setPromocodeDiscount(0)
}
},[cartData])



  return (
    <div className='cart'>
      {/*cart section */}
     <div className="cart-items">
     <div className="cart-items-list">
      <p>image</p>
      <p>name</p>
      <p>Category</p>
      <p>price</p>
      <p>quantity</p>
      <p>total</p>
  
     </div>
 
     {Object.keys(cartData).length === 0 ?(
     
     <h1 className='empty-cart'>No items in the cart</h1>):(
     fishList.map((item,index)=>{
      if(cartData[item._id]>0){
    return(
      <div className="cart-items-list-1 " key={index}>
       <img src={item.image} alt="" />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>₹{item.price}</p>
      <div className="quantity-container">
  <span onClick={()=>{removeFromCart(item._id)}}>-</span>
  <span>{cartData[item._id]}</span>
  <span onClick={()=>{addToCart(item._id)}}>+</span>
</div>
      <p>₹{cartData[item._id]*item.price}</p>
      <p className='button' onClick={()=>{deleteCartData(item._id)}}>remove</p>
      </div>
      )
    }
    })
     )
     }
     </div>
     {/*cart total section */}
     <div className="cart-bottom">
    <div className="cart-total">
      <h2>Cart Total</h2>
      {
      display&& token && <p className='promo-offer'>you got {promocodeDiscount}% offer from promocode</p>
      }
      <div>
        <div className="cart-total-details">
          <p>Subtotals</p>
          <p>₹{calculateTotalAmout()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
        <p>Delivery Fee</p>
          <p>₹{calculateTotalAmout()===0?0:50}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>₹{calculateTotalAmout()===0?0:calculateTotalAmout()+50}</p>
        </div>
      </div>
 
      <button onClick={()=>{checkOutHandler()}}>PROCEED TO CHECKOUT</button>
    
    </div> 
    {/*promocode section */}
    <div className="cart-promocode">
      <div >
       
        <p className='condition'><b>condition1</b>:subtotal greater than 2000</p>
        <p className='condition'><b>condition2</b>:if you are ready for a purchase only use promocode </p>
        <p className='condition'><b>condition3</b>:Do not refresh or go to other pages after apply promocodes</p>
        <p className='condition'><b>condition4</b>:Do not decrease subtotal below 2000 after apply promocode</p>

        <p>Enter Your Promocode here</p>
        <div className='cart-promocode-input'>
          <input type="text" placeholder='promocode' name='promocode' value={promocode} onChange={(e)=>setPromocode(e.target.value)}/>
          <button onClick={()=>submitPromoCode()}>Submit</button>
        </div>
       <button className='button-send-promocode' onClick={()=>sendPromocode()}>Send Promocode in Mail</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Cart
import React, { useContext, useState } from 'react'
import { FaCcStripe, FaCashRegister } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import './Checkout.css'
import { ProductContext } from '../../Context/ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
const {calculateTotalAmout,cartData,fishList,backendUrl,token,setCartData,fetchMyOrders}=useContext(ProductContext);
const navigate=useNavigate()
const[payMethod,setPayMethod]=useState('cod');
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        district: "",
        phone: "",
      });
 //store data from the form
 const onchangeHandler = (event) => {
    const {name,value} = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

//function for razorpay setup
 const initPay=(order)=>{
const options={
key:import.meta.env.VITE_RAZORPAY_KEY_ID,
amount:order.amount,
currency:order.currency,
name:"Order Payment",
description:"Order Payment",
order_id:order.id,
receipt:order.receipt,
handler:async(response)=>{
try {
  const {data}=await axios.post(`${backendUrl}/api/order/verify-razorpay`,response,{headers:{Authorization: `Bearer ${token}`,}})
  if(data.success){
  toast.success(data.message)
  await fetchMyOrders(token);
  setCartData({})
  navigate('/myorder')
  }else{
  navigate('/')
  }
} catch (error) {
  navigate('/')
}
}
}
const razorpay=new window.Razorpay(options)
razorpay.open();
}
//function for order
const submitHandler=async(e)=>{
  e.preventDefault();
  if( Object.keys(cartData).length === 0){
  toast.info("No items in Cart");
  return;
  }

  
try {
let orderItems=[];
for(const item in cartData){
const products=fishList.find((product)=>product._id===item)
if(products){
orderItems.push({...products,quantity:cartData[item]})
}
}
const orderData={
items:orderItems,
amount:calculateTotalAmout()+50,
address:data
}
switch(payMethod){
  case 'cod':
      const {data}=await axios.post(`${backendUrl}/api/order/cod`,orderData,{headers:{Authorization: `Bearer ${token}`,}})
      if(data.success){
      toast.success(data.message);
      setCartData({})
      await fetchMyOrders(token);
      navigate('/myorder')
      }
      else{
      toast.error(data.message)
      }
      break;
  case 'stripe':
    const response=await axios.post(`${backendUrl}/api/order/stripe`,orderData,{headers:{Authorization: `Bearer ${token}`,}})
    if(response.data.success){
    const session_url=response.data.message;
    window.location.replace(session_url);
    }else{
    toast.error(response.data.message)
    }
    break;
  case 'razorpay':
    const razorpayresponce=await axios.post(`${backendUrl}/api/order/razorpay`,orderData,{headers:{Authorization: `Bearer ${token}`,}})
    if(razorpayresponce.data.success){
        initPay(razorpayresponce.data.message)
    }
    break;
}   
} catch (error) {
  // toast.error(error.response.data.message)
  console.log(error)
}
}
  return (
    <form className="place-order" onSubmit={submitHandler}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multy-fields">
          <input type="text" name="firstName" placeholder='First name' value={data.firstName} onChange={onchangeHandler} required />
          <input type="text" name="lastName" placeholder='Last name' value={data.lastName} onChange={onchangeHandler} required />
        </div>
        <input type="email" placeholder='Email address' name='email' value={data.email} onChange={onchangeHandler} required />
        <input type="text" placeholder='Street' name='street' value={data.street} onChange={onchangeHandler} required />
        <div className="multy-fields">
          <input type="text" name="city" placeholder='City' value={data.city} onChange={onchangeHandler} required />
          <input type="text" name="state" placeholder='State' value={data.state} onChange={onchangeHandler} required />
        </div>
        <div className="multy-fields">
          <input type="number" name="pincode" placeholder='Pin Code' value={data.pincode} onChange={onchangeHandler} required />
          <input type="text" name="district" placeholder='District' value={data.district} onChange={onchangeHandler} required />
        </div>
        <input type="tel" placeholder='Phone' name='phone' value={data.phone}pattern="(\+91)?[6-9][0-9]{9}" onChange={onchangeHandler} required />
      </div>
      <div className="place-order-right">
        <div className="cart-total-1">
          <h2>Cart Total</h2>
          
            <div className="cart-total-details">
              <p>Subtotals</p>
              <p>₹{calculateTotalAmout()?calculateTotalAmout():0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{calculateTotalAmout()?calculateTotalAmout()+50:0}</p>
              </div>
            <hr/>
          
            
          <div className="payment-options">
          <button type="submit" className="main-pay-button cash" onClick={()=>setPayMethod('cod')}>
            <FaCashRegister size={18} style={{ marginRight: "8px" }} />
            Cash on Delivery
          </button>

          <button type="submit" className="main-pay-button razorpay" onClick={()=>setPayMethod('razorpay')}>
            <SiRazorpay size={18} style={{ marginRight: "8px" }} />
            Pay with Razorpay
          </button>


          <button type="submit" className="main-pay-button stripe" onClick={()=>setPayMethod('stripe')}>
            <FaCcStripe size={18} style={{ marginRight: "8px" }} />
            Pay with Stripe
          </button>
          </div>
          
        </div>
      </div>
    </form>
  )
}

export default Checkout
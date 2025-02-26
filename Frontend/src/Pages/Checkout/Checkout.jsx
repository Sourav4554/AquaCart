import React, { useContext, useState } from 'react'
import { FaCcStripe, FaCashRegister } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import './Checkout.css'
import { ProductContext } from '../../Context/ProductContext';
const Checkout = () => {
const {calculateTotalAmout}=useContext(ProductContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
      });
 //store data from the form
 const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  
  };

  return (
    <form className="place-order" >
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multy-fields">
          <input type="text" name="firstName" placeholder='First name' value={data.firstName} onChange={onchangeHandler} required />
          <input type="text" name="lastName" placeholder='Last name' value={data.lastName} onChange={onchangeHandler} required />
        </div>
        <input type="text" placeholder='Email address' name='email' value={data.email} onChange={onchangeHandler} required />
        <input type="text" placeholder='Street' name='street' value={data.street} onChange={onchangeHandler} required />
        <div className="multy-fields">
          <input type="text" name="city" placeholder='City' value={data.city} onChange={onchangeHandler} required />
          <input type="text" name="state" placeholder='State' value={data.state} onChange={onchangeHandler} required />
        </div>
        <div className="multy-fields">
          <input type="text" name="pincode" placeholder='Pin Code' value={data.pincode} onChange={onchangeHandler} required />
          <input type="text" name="country" placeholder='Country' value={data.country} onChange={onchangeHandler} required />
        </div>
        <input type="text" placeholder='Phone' name='phone' value={data.phone} onChange={onchangeHandler} required />
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
          <button type="submit" className="main-pay-button cash">
            <FaCashRegister size={18} style={{ marginRight: "8px" }} />
            Cash on Delivery
          </button>

          <button type="submit" className="main-pay-button razorpay">
            <SiRazorpay size={18} style={{ marginRight: "8px" }} />
            Pay with Razorpay
          </button>


          <button type="submit" className="main-pay-button stripe">
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
import React, { useContext } from 'react'
import './Cart.css'
import { ProductContext } from '../../Context/ProductContext'

const Cart = () => {
  const {fishList,cartData,addToCart,removeFromCart,deleteCartData,calculateTotalAmout}=useContext(ProductContext)

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
 
     {
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
     
     }
     </div>
     {/*cart total section */}
     <div className="cart-bottom">
    <div className="cart-total">
      <h2>Cart Total</h2>
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
 
      <button >PROCEED TO CHECKOUT</button>
    
    </div> 
    {/*promocode section */}
    <div className="cart-promocode">
      <div >
        <p>Enter Your Promocode here </p>
        <div className='cart-promocode-input'>
          <input type="text" placeholder='promocode'/>
          <button>Submit</button>
        </div>
        <button className='button-send-promocode'>Send Promocode in Mail</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Cart
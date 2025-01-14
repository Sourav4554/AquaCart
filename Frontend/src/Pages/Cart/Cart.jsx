import React, { useContext } from 'react'
import './Cart.css'
import { ProductContext } from '../../Context/ProductContext'

const Cart = () => {
  const {ProductLists}=useContext(ProductContext)

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
     ProductLists.map((item,index)=>{
    return(
      <div className="cart-items-list-1 " key={index}>
       <img src={item.image} alt="" />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>{item.price}</p>
      <div className="quantity-container">
  <span>-</span>
  <span>5</span>
  <span>+</span>
</div>
      <p>56576</p>
      <p className='button'>remove</p>
      </div>
      )
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
          <p>9</p>
        </div>
        <hr />
        <div className="cart-total-details">
        <p>Delivery Fee</p>
          <p>8</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>8</p>
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
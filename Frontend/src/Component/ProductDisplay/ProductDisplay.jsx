import React from 'react'
import './ProductDisplay.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
import { FaHeartCirclePlus } from "react-icons/fa6";

  // Import default styles for zoom
const ProductDisplay = ({product}) => {
  return (
    <div className='product-display-main'>
    <div className="for-product-display">
<div className="for-small-image">
  <img src={product.image} alt="" />
</div>
<div className="for-large-image">
   <img src={product.image} alt="" /> 

</div>
<div className="for-product-details">
  <h3>{product.name}</h3>
  <h4>Category:{product.category}</h4>
  <div className="for-star">
           <Rating 
          defaultValue={4.5}
          count={5}
          shape='star'
          readOnly={true}
          size='24px'
          classNames='rating'
          />
  </div>
  <p className='product-price'>₹{product.price}</p>
  <p className='description-2'>{product.description2}</p>
  <div className="cart-and-wish">
  <span className='add-to-cart'>Add to Cart</span>
 <FaHeartCirclePlus className='wish-icon'/>
  </div>
  <hr className='hr'/>
  <li className='lists-promo'>100% Original product.</li>
  <li className='lists-promo'>Cash on delivery is available on this product.</li>
  <li className='lists-promo'>we Provide good quality fishes</li>
</div>
    </div>






    </div>
  )
}

export default ProductDisplay
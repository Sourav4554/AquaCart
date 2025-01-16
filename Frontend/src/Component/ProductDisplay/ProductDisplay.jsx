import React, { useContext,useState } from 'react'
import './ProductDisplay.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
import { FaHeartCirclePlus } from "react-icons/fa6";
import { ProductContext } from '../../Context/ProductContext';
import Review from '../Review/Review';

const ProductDisplay = ({product}) => {
const {showReviewContainer,setShowReviewContainer,allReview}=useContext(ProductContext);
//state for managing styles and googlle description and review
    const[changeDes,setChangeDes]=useState('Description')
  return (
    <div className='product-display-main'>
          {showReviewContainer&& <Review/>}
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

    <div className="for-description-and-review">
<div className="for-review-and-description-button">
  <li className={changeDes==='Description'?'desc-button-active':"desc-button"} onClick={()=>setChangeDes('Description')}>Description</li>
  <li className={changeDes==='Reviews'?'review-button-active':'review-button'} onClick={()=>setChangeDes('Reviews')}>Reviews</li>
  <li className='add-review' onClick={()=>setShowReviewContainer(true)}>Add-Review</li>
</div>
<div className="fordescription-and-review">
  {changeDes==='Description'?(
  <p>{product.description3}</p>
  ):(
  allReview.reverse().map((item,index)=>{
  return(
    <>
    <div className="rating-div">
    <p className='name'>{item.name}</p>
 
        <Rating 
          defaultValue={item.rating}
          count={5}
          shape='star'
          readOnly={true}
          size='24px'
          classNames='rating'
          />
      <p className='comment'>{item.comment}</p>
    </div>
    </>
    )
  })
  )
}
</div>
</div>





    </div>
  )
}

export default ProductDisplay
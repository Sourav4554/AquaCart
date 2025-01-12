import React from 'react'
import './Card.css'
import ReactStars from 'react-rating-stars-component'//react star rating 
const Card = ({key,image,name,description1,price,stock}) => {
  return (
    // logic for stock and out of stock 
    <div className={`product-card ${!stock ? 'out-of-stock' : ''}`} key={key}>
        <div class="product-image">
          <img src={image} alt="Product Image"/>
        </div>
        {
        !stock&&<div className='stock'>OUT OF STOCK</div>
        }
        <div class="product-info">
          <h3>{name}</h3>
          <p class="product-description">{description1}.</p>
         <div className='star-and-price'>
          {/*Star rating component*/}
         <ReactStars
         count={5}
         size={18}
         activeColor="#ffd700"
          value={4.5}
          edit={false}
          />
          <p class="product-price"> ₹{price}</p>
         </div>
        </div>
      </div>
    
  )
}

export default Card
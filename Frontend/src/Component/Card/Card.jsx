import React from 'react'
import './Card.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
const Card = ({image,name,description1,price,stock,rating=4.5}) => {
  return (
    // logic for stock and out of stock 
    <div className={`product-card ${!stock ? 'out-of-stock' : ''}`} >
        <div className="product-image">
          <img src={image} alt="Product Image"/>
        </div>
        {
        !stock&&<div className='stock'>OUT OF STOCK</div>
        }
        <div className="product-info">
          <h3>{name}</h3>
          <p className="product-description">{description1}.</p>
         <div className='star-and-price'>
          {/*Star rating component*/}
          <Rating 
          defaultValue={4.5}
          count={5}
          shape='star'
          readOnly={true}
          size='18px'
          />
        
          <p className="product-price"> ₹{price}</p>
         </div>
        </div>
      </div>
    
  )
}

export default Card
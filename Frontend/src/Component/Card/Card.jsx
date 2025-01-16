import React from 'react'
import './Card.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
import { Link } from 'react-router-dom'//used for routing
const Card = ({image,name,description1,price,stock,_id}) => {
  return (
    // logic for stock and out of stock 
    <Link to={`/product/${_id}`}>
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
    </Link>
  )
}

export default Card
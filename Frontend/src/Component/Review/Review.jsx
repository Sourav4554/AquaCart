import React, { useContext, useState } from 'react'
import'./Review.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
import { FaTimes } from "react-icons/fa";
import { ProductContext } from '../../Context/ProductContext';
const Review = () => {
const{setAllReview,setShowReviewContainer}=useContext(ProductContext);
//default rating values
const[review,setReview]=useState({name:"",rating:0,comment:""});
//take values from the review form
const handleChange=(e)=>{
e.preventDefault();
const {name,value}=e.target;
setReview({...review,[name]:value})
}
//take the rating value
const handleRatingChange=(newRating)=>{
setReview({...review,rating:newRating})
}
//store the values to a review state at the time of submit
const handleSubmit=(e)=>{
e.preventDefault();
setAllReview((prev)=>([...prev,review]))
}
  return (
    <div className='review-main-container'>
 
      <div className="review-child-container">
     <div className="review-form">
     <FaTimes size={30} color="black" className='cross-icon' onClick={()=>setShowReviewContainer(false)}/>
     <form action="" onSubmit={handleSubmit}>
     <input type="text" placeholder='Enter Your Name' value={review.name} name="name" onChange={handleChange}required/>
      {/* <ReactStars
         count={5}
         size={24}
         activeColor="#ffd700"
          value={review.rating}
          edit={true}
          onChange={handleRatingChange}
          classNames='review-1'
          /> */}
           <Rating 
          defaultValue={review.rating}
          count={5}
          shape='star'
          readOnly={false}
          onChange={handleRatingChange}
          size='24px'
          classNames='rating'
          />
          <textarea name="comment" id="" cols="20" rows="10" placeholder='Enter your Valuable Comments' value={review.comment} onChange={handleChange} required></textarea>
          <button type="submit" className="add-review-button"> Add Review</button>
     </form>
     </div>
      </div>
    </div>
  )
}

export default Review
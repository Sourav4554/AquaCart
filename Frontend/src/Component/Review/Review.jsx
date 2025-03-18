import React, { useContext, useState } from 'react'
import'./Review.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
import { FaTimes } from "react-icons/fa";
import { ProductContext } from '../../Context/ProductContext';
import {toast} from 'react-toastify'
import axios from 'axios'


const Review = () => {
const{setShowReviewContainer,backendUrl,token,productId,fetchReview}=useContext(ProductContext);
//default rating values
const[review,setReview]=useState({rating:0,comment:""});
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
const handleSubmit=async(e)=>{
e.preventDefault();
if(!token){
toast.info('please login before adding review')
return;
}
try {
  const{data}=await axios.post(`${backendUrl}/api/review/add`,{productId,rating:review.rating,comment:review.comment},{headers:{Authorization: `Bearer ${token}`,}})
  if(data.success){
    toast.success(data.message)
    fetchReview(productId)
    setShowReviewContainer(false)
  }else{
  toast.error(data.message)
  }
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
}
}
  return (
    <div className='review-main-container'>
 
      <div className="review-child-container">
     <div className="review-form">
     <FaTimes size={30} color="black" className='cross-icon' onClick={()=>setShowReviewContainer(false)}/>
     <form  onSubmit={handleSubmit}>
     {/* <input type="text" placeholder='Enter Your Name' value={review.name} name="name" onChange={handleChange}required autoComplete='name'/> */}
           <Rating 
          defaultValue={review.rating}
          count={5}
          shape='star'
          readOnly={false}
          onChange={handleRatingChange}
          size='24px'
          classNames='rating'
          />
          <textarea name="comment"  cols="20" rows="10" placeholder='Enter your Valuable Comments' value={review.comment} onChange={handleChange} required autoComplete='off'></textarea>
          <button type="submit" className="add-review-button"> Add Review</button>
     </form>
     </div>
      </div>
    </div>
  )
}

export default Review
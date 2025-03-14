import React, { useContext,useEffect,useState } from 'react'
import './ProductDisplay.css'
import { Rating } from 'react-custom-rating-component'//react star rating 
import { FaHeartCirclePlus } from "react-icons/fa6";
import { ProductContext } from '../../Context/ProductContext';
import { toast } from 'react-toastify';//used for toastify messages
import Review from '../Review/Review';
import Card from '../Card/Card';
import axios from 'axios'
const ProductDisplay = ({product}) => {
const {showReviewContainer,backendUrl,setShowReviewContainer,fishList,addToCart,cartData,addToWish,wishListData,token,setProducId}=useContext(ProductContext);
//state for managing styles and googlle description and review
    const[changeDes,setChangeDes]=useState('Description')
    //state for store the all reviews
const[allReview,setAllReview]=useState([]);
  //state for store the current category of the product
    const[relatedProductCategory,setRelatedProductCategory]=useState(product.category)
  //filter the product based on the category
const RelatedProducts=fishList.filter((item)=>item.category===relatedProductCategory);
//take only 4 products
const sliceRelatedProducts=RelatedProducts.slice(0,4);

//function for check cartdata already in cart
const handleAddToCart=(_id)=>{
  if(!token){
  toast.error('please login before adding to cart');
  return;
  }
  if(cartData[_id]>0){
  toast.info("Item Already in the Cart")
  }
  else{
  addToCart(_id)
  toast.success("Added to Cart")
  }
  }

  //check for wishlist-data already in wishlist
  const handleAddToWish=(_id)=>{
    if(!token){
      toast.error('please login before adding to WishList');
      return;
      }
    if(_id in wishListData){
      toast.info("Item Already in the WishList")
    }
    else{
    addToWish(_id)
    toast.success('Added To WishList')
    }
    }

  //fetch review from backend
  const fetchReview=async(productId)=>{
   console.log(productId)
  try {
    const{data}=await axios.post(`${backendUrl}/api/review/list`,{productId:productId})
    if(data.success){
    setAllReview(data.message)
    }else{
    console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
  }
  useEffect(()=>{
  fetchReview(product._id);
  },[allReview])
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
  <span className='add-to-cart' onClick={()=>{handleAddToCart(product._id)}}>Add to Cart</span>
 <FaHeartCirclePlus className='wish-icon' onClick={()=>handleAddToWish(product._id)}/>
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
  <li className='add-review' onClick={()=>{setShowReviewContainer(true),setProducId(product._id)}}>Add-Review</li>
</div>
<div className="fordescription-and-review">
  {changeDes==='Description'?(
  <p>{product.description3}</p>
  ):(
  allReview.reverse().map((item,index)=>{
  return(
    <>
    <div className="rating-div">
    <p className='name'>{item.user.name}</p>
 
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

<div className="for-realated-products">
  <div className="for-heading">
    <h3>Related Products</h3>
  </div>
  <div className="for-products">
    {
    sliceRelatedProducts.map((item,index)=>{
    return(
      <Card key={index} image={item.image} name={item.name} description1={item.description1} price={item.price} stock={item.stock} _id={item._id}/>
      )
    })
    }
  </div>
 </div>


    </div>
  )
}

export default ProductDisplay
import React, { useContext } from 'react'
import ProductDisplay from '../../Component/ProductDisplay/ProductDisplay'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../Context/ProductContext'

const Product = () => {
const {fishList}=useContext(ProductContext)
//extract the product id from url
const {productid}=useParams();
//find the product with productid equal to the id in the url
const product=fishList.find((item)=>item._id=== productid)

  return (
    <div>
        <ProductDisplay product={product}/>
    </div>
  )
}

export default Product
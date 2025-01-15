import React, { useContext, useEffect, useState } from 'react'
import './Collections.css'//css file for styling the component
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";//down and up arrows for category
import Card from '../../Component/Card/Card'//card component
import { ProductContext } from '../../Context/ProductContext'//importing context

const Collections = () => {
//take product list from context
const {ProductLists,searchValue}=useContext(ProductContext);
//state for storing productList
const[products,setProducts]=useState([])
//state for storing category
const[category,setCategory]=useState([])
//state for managing products category
const[display,setDisplay]=useState(false);
//state for storing the price detail
const[priceType,setPricetype]=useState('');

//removing the repeated categories and collect to the unique categories variable
const uniqueCategories=[...new Set(ProductLists.map((item)=>item.category))]

//function for storing category
const categorySort=(e)=>{
  
//check category from the input exist in the category variable
if(category.includes(e.target.value)){
//remove the category
setCategory((prev)=>prev.filter((item)=>item !=e.target.value))
}
else{
  //add the category
setCategory((prev)=>[...prev,e.target.value])
}
}

//used for filtering products based on category
const filterProducts=()=>{
//make a copy and stored in the vairable
let ProductsCopy=[...ProductLists];

 if(searchValue){
 ProductsCopy=ProductsCopy.filter(item=>item.name.toLowerCase().replace(/\s+/g, "").includes(searchValue.toLowerCase()))
}
//check any values existing in the category array
 if(category.length>0){
//filter the items 
 ProductsCopy=ProductsCopy.filter((item)=>category.includes(item.category))
 }
setProducts(ProductsCopy)


//filtering products with price
switch(priceType){
      case 'High-Low':
          setProducts(ProductsCopy.sort((a,b)=>(b.price-a.price))); //descending order
          break;
      case 'Low-High':
          setProducts(ProductsCopy.sort((a,b)=>(a.price-b.price))); //ascendig order
          break;
      default:
          break;
}

}

//only working at the time of changing category
useEffect(()=>{
filterProducts();
console.log(products)
console.log(category)
},[category,priceType,searchValue])

  return (
    <div className='main-div-for-collections'>
        <div className="main-div-for-category">
            
           <div className="sub-div-for-category">
            {/*category visible based on conditional rendering*/}
        <div className="category-header">
        <h4>Category</h4>
        {!display?<IoIosArrowDown className='down-arrow' onClick={()=>{setDisplay(true)}}/>:
        display&&<IoIosArrowUp className='down-arrow' onClick={()=>{setDisplay(false)}}/>
        }
        {/*displaying the categories section for filtering*/}
        </div>
            {
             uniqueCategories.map((item,index)=>{
            return(
                <>
                
               {
               display&&<div className='for-category-list'>
               <input type="checkbox" value={item} key={index} onChange={categorySort}/> <div className='label-div'> <label className='label'>{item}</label></div>
                 </div>
               }
                </>
                )
            })
            }
            </div>
        </div>
        <div className="main-div-for-items">
          <div className="div-for-header">
            <div className="for-heading">
              <h1>AQUATIC COLLECTIONS</h1>
            </div>
            {/*sorting based on price */}
            <div className="for-price-sorting">
              <select onChange={(e)=>{setPricetype(e.target.value)}}>
                <option value="Relevant">Relevant</option>
                <option value="High-Low">High-Low</option>
                <option value="Low-High">Low-High</option>
              </select>
            </div>
          </div>
          {/*display each product item */}
        <div className="for-product-items">
        {
        products.length===0?(<p className='availabilty'>Product Not Available</p>):(
         products.map((item,index)=>{
        return(
            <Card key={index} image={item.image} name={item.name} description1={item.description1} price={item.price} stock={item.stock} _id={item._id}/>
            )
        })
        )
         }
        </div>
        </div>
    </div>
  )
}

export default Collections
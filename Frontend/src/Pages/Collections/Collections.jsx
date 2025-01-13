import React, { useContext, useState } from 'react'
import './Collections.css'//css file for styling the component
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";//down and up arrows for category
import Card from '../../Component/Card/Card'//card component
import { ProductContext } from '../../Context/ProductContext'//importing context

const Collections = () => {
//take product list from context
const {ProductLists}=useContext(ProductContext);
//state for storing productList
const[products,setProducts]=useState(ProductLists)
//state for managing products category
const[display,setDisplay]=useState(false);
//removing the repeated categories and collect to the unique categories variable
const uniqueCategories=[...new Set(ProductLists.map((item)=>item.category))]

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
               display&&<div className='for-category-list' key={index}>
               <input type="checkbox" value={item} key={index}/> <div className='label-div'> <label className='label'>{item}</label></div>
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
              <select>
                <option value="Relevant">Relevant</option>
                <option value="High-Low">High-Low</option>
                <option value="Low-High">Low-High</option>
              </select>
            </div>
          </div>
          {/*display each product item */}
        <div className="for-product-items">
        {
         products.map((item,index)=>{
        return(
            <Card key={index} image={item.image} name={item.name} description1={item.description1} price={item.price} stock={item.stock}/>
            )
        })
         }
        </div>
        </div>
    </div>
  )
}

export default Collections
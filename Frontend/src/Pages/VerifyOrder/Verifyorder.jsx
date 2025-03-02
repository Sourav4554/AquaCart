import React, { useContext, useEffect } from 'react'
import './VerifyOrder.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProductContext } from '../../Context/ProductContext'
const Verifyorder = () => {
const {backendUrl,token,fetchMyOrders,setCartData}=useContext(ProductContext)
const navigate=useNavigate()
const[searchparams,setSearchparams]=useSearchParams();
const success=searchparams.get('success');
const orderId=searchparams.get('orderId');
const verifyPayment=async(token)=>{
try {
    const {data}=await axios.post(`${backendUrl}/api/order/verify`,{success,orderId},{headers:{Authorization: `Bearer ${token}`,}});
    if(data.success){
    await fetchMyOrders(token);
    setCartData({})
    navigate('/myorder')
    }else{
    navigate('/')
    }
} catch (error) {
   navigate('/')
   console.log(error)
}
}

useEffect(()=>{
verifyPayment(token);
},[token])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verifyorder
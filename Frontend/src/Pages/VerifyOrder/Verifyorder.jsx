import React, { useContext, useEffect } from 'react'
import './VerifyOrder.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProductContext } from '../../Context/ProductContext'
const Verifyorder = () => {
const {backendUrl}=useContext(ProductContext)
const navigate=useNavigate()
const[searchparams,setSearchparams]=useSearchParams();
const success=searchparams.get('success');
const orderId=searchparams.get('orderId');
const verifyPayment=async()=>{
try {
    const {data}=await axios.post(`${backendUrl}/api/order/verify`,{success,orderId});
    if(data.success){
    navigate('/myorder')
    }else{
    navigate('/')
    }
} catch (error) {
   navigate('/')
}
}
useEffect(()=>{
verifyPayment();
},[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verifyorder
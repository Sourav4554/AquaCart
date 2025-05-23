import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
export const Materials=createContext(null)
const Context = ({children}) => {
    //backend url
    const BackendUrl='http://localhost:4000'
    //manage state of the token
    const[token,createToken]=useState('');
    //manage the visibility of loginpage
    const [showLogin, setShowLogin] = useState(false);
    //store fish details
    const[fishList,setFishList]=useState({});
   //store userdata 
   const[userData,setUserData]=useState({})
   //store promocodes
   const[promocodes,setPromocodes]=useState({})
   //storing orders
   const[orders,setOrders]=useState([])
   //state for delete button loading
   const[loading,setLoading]=React.useState(false)
  //store sales date and amount
   const [salesData,setSalesData]=useState({labels:[],revenew:[]})
   //store category and sales
   const [categorySalesdata,setCategorySales]=useState({category:[],sales:[]})
   //store paymentmethod data
   const[paymentMethodData,setPaymentMethodData]=useState(null)
  //store orderstatus data
  const [orderStatusData, setOrderStatusData] = useState(null);
     //function for fetching fish
    const listFish=async()=>{
    const {data}=await axios.get(`${BackendUrl}/api/fish/list-fish`,{})
   try {
    if(data.succes){
      setFishList(data.message)
      }
      else{
      console.log(data.message)
      }
   } catch (error) {
    console.log(error)
   }
    }

 //function for delete fish item
 const deleteFish=async(productId,token)=>{
  setLoading(true)
try {
const {data}=await axios.delete(`${BackendUrl}/api/fish/remove-fish`,{headers:{Authorization:`Bearer ${token}`}, data:{ productId }})
if(data.succes){
toast.success(data.message)
setLoading(false)
await listFish();
}
else{
toast.error(data.message)
}
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
}
}
//function for fetch all users
const fetchUsers=async()=>{
try {
  const {data}=await axios.post(`${BackendUrl}/api/admin/users`,{})
  if(data.success){
  setUserData(data.message)
  }
  else{
  console.log(error)
  }
} catch (error) {
  console.log(error)
}
}
//function for fetch promocodes
const fetchPromocodes=async()=>{
  const {data}=await axios.get(`${BackendUrl}/api/promo/list`,{})
 try {
  if(data.success){
    setPromocodes(data.message)
    }
    else{
    console.log(data.message)
    }
 } catch (error) {
  console.log(error)
 }
  }

//function for fetch  orders from backend
const fetchOrders=async(token)=>{
  try {
    const{data}=await axios.get(`${BackendUrl}/api/order/adminorder`,{headers:{Authorization: `Bearer ${token}`,}})
    if(data.success){
    setOrders(data.message)
    const orders=data.message;
    const labels=data.message.map((item)=>{
      const date=new Date(item.createdAt)
      return date.toLocaleString('en-US', { weekday: 'short' });
      })
      const revenew=data.message.map((item)=>item.amount);
      setSalesData({labels,revenew})

    //payment method data
    const paymentCount={Razorpay: 0, Stripe: 0, COD: 0}
    const statusCount={pending:0,completed:0,outForDelivery:0}
    orders.forEach((order)=>{
      if (order.status === "Order Placed") statusCount.pending++;
      else if (order.status === "Delivered") statusCount.completed++;
      else if (order.status === "Out for Delivery") statusCount.outForDelivery++;


      if (order.paymentMethod === "Razorpay") paymentCount.Razorpay++;
      else if (order.paymentMethod === "Stripe") paymentCount.Stripe++;
      else if (order.paymentMethod === "COD") paymentCount.COD++;
    })
    setPaymentMethodData({
    labels: ["Razorpay", "Stripe", "COD"],
    data: [paymentCount.Razorpay, paymentCount.Stripe, paymentCount.COD],
    })

    setOrderStatusData({
      labels: ["Pending", "Completed", "Out for Delivery"],
      data: [
        statusCount.pending,
        statusCount.completed,
        statusCount.outForDelivery,
      ],
    });
    }
    else{
    console.log(data.message)
    }
  } catch (error) {
    console.error("Fetch Error:", error.message || error);
  }
  }


    const requirements={
    BackendUrl,
    token,
    createToken,
    showLogin,
    setShowLogin,
    fishList,
    setFishList,
    listFish,
    deleteFish,
    userData,
    fetchUsers,
    promocodes,
    fetchPromocodes,
    orders,
    fetchOrders,
    salesData,
    categorySalesdata,
    setCategorySales,
    loading,
   paymentMethodData,
   orderStatusData
    }
    useEffect(()=>{
      fetchOrders(token);
    },[token])
    useEffect(()=>{
    const loadData=async()=>{
        if(sessionStorage.getItem('token')){
            setShowLogin(true)
            createToken(sessionStorage.getItem('token'))
            await fetchUsers()
            await listFish();
            await fetchPromocodes()
            
            }
    }
    loadData();
    },[])
  return (

     <Materials.Provider value={requirements}>
       {children}
     </Materials.Provider>
  )
}

export default Context
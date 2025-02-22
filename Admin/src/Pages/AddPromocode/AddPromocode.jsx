import React, { useContext, useState } from 'react'
import { TextField, Button, Box, Typography } from "@mui/material";
import { Materials } from '../../Context/Context';
import axios from 'axios'
import {toast} from 'react-toastify'
const AddPromocode = () => {
const{ BackendUrl,token,fetchPromocodes}=useContext(Materials)
const[formData,setData]=useState({
    promocode: "",
    discountPercentage:"",
    expiryDate: "",
    usageLimit: ""
})
//function for take values from form
const onchangeHandler=(e)=>{
const{name,value}=e.target;
setData((prev)=>({...prev,[name]:value}))
}

//function for add promocode
const onsubmitHandler=async(e)=>{
e.preventDefault();
try {
    const {data}=await axios.post(`${BackendUrl}/api/promo/add`,formData,{headers:{Authorization:`Bearer ${token}`}})
    if(data.success){
    toast.success(data.message)
    await fetchPromocodes();
   setData({
    promocode: "",
    discountPercentage:"",
    expiryDate: "",
    usageLimit: ""
   })
    }
    else{
    toast.error(data.message)
    }
} catch (error) {
     toast.error(error.response.data.message)
    console.log(error)
}
}
  return (
     <Box sx={{ maxWidth: 400, p: 3, boxShadow: 3, borderRadius: 2,marginLeft:2 }}>
     <Typography variant="h4" gutterBottom>
        Add Promocode
      </Typography>
     <form onSubmit={onsubmitHandler}>
     <TextField label="Promocode" fullWidth margin="normal" name='promocode' value={formData.promocode} onChange={onchangeHandler}/>
      <TextField label="Discount Percentage" type="number" fullWidth margin="normal" name='discountPercentage' value={formData.discountPercentage}  onChange={onchangeHandler}/>
      <TextField label="Expiry Date(in days)" type="number" fullWidth margin="normal" name='expiryDate' value={formData.expiryDate}  onChange={onchangeHandler}/>
      <TextField label="Usage Limit" type="number" fullWidth margin="normal" name='usageLimit' value={formData.usageLimit}  onChange={onchangeHandler}/>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type='submit'>
        Add Promocode
      </Button>
     </form>
    
   </Box>
  )
}

export default AddPromocode
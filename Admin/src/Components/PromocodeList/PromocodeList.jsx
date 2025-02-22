import React, { useContext }  from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';
import { Materials } from '../../Context/Context';
import axios from 'axios'
import {toast} from 'react-toastify'
const PromocodeList = () => {
const {promocodes,BackendUrl,token,fetchPromocodes}=useContext(Materials)
const promo=Array.isArray(promocodes)?promocodes:[]
const ddeletePromocode=async(promocodeId)=>{
try {
    const {data}=await axios.delete(`${BackendUrl}/api/promo/delete`,{headers:{Authorization:`Bearer ${token}`}, data:{ promocodeId }})
    if(data.success){
    toast.success(data.message)
    await fetchPromocodes()
    }
    else{
    toast.error(data.message)
    }
} catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
}
}
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell align='center'>Promocode</TableCell>
            <TableCell align='center'>Discount Percentage</TableCell>
            <TableCell align='center'>Used Limit</TableCell>
            <TableCell align='center'>Created Date</TableCell>
            <TableCell align='center'>Expiry Date</TableCell>
            <TableCell align='center'>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promo.map((row, index) => (
            <TableRow key={index} >
              <TableCell align='center'>{row.promocode}</TableCell>
              <TableCell align='center'>{row.discountPercentage}%</TableCell>
              <TableCell align='center'>{row.usageLimit}</TableCell>
              <TableCell align='center'>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align='center'>{new Date(row.expiryDate).toLocaleDateString()}</TableCell>
              <TableCell align='center'>
              <IconButton color="error" onClick={()=>{ddeletePromocode(row._id)}}>
                <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PromocodeList
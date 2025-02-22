import React, { useEffect } from 'react'
import { Box,Typography,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PromocodeList from '../../Components/PromocodeList/PromocodeList'

const Product = () => {
const navigate=useNavigate()
  return (
    <Box>
      <Box >
      <Typography variant="h4" component="h2" sx={{marginBottom:'20px'}}>Promocode Manage</Typography>
      <Button variant="contained" color='success' sx={{marginBottom:'20px'}}
      onClick={()=>{navigate('/promoadd')}}
      >Add Promocode
      </Button>
      </Box>
      <PromocodeList/>
    </Box>
  )
}

export default Product
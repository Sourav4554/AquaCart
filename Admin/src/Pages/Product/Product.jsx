import React, { useEffect } from 'react'
import ProductList from '../../Components/ProductList/ProductList'
import { Box,Typography,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Product = () => {
const navigate=useNavigate()
  return (
    <Box>
      <Box >
      <Typography variant="h4" component="h2" sx={{marginBottom:'20px'}}>Product Manage</Typography>
      <Button variant="contained" color='success' sx={{marginBottom:'20px'}}
      onClick={()=>{navigate('/productadd')}}
      >Add Product
      </Button>
      </Box>
      <ProductList/>
    </Box>
  )
}

export default Product
import React, { useContext } from 'react'
import { Card, CardContent, Typography,Box } from '@mui/material';
import { Materials } from '../../Context/Context';
const DashBoard = () => {
const {fishList,userData}=useContext(Materials);
//product data
const fishes=Array.isArray(fishList)?fishList:[]
const productInStock=fishes.filter((item)=>item.stock===true);
const productOutStock=fishes.filter((item)=>item.stock===false);

//user Data
const users=Array.isArray(userData)?userData:[];
const currentDate= new Date()
const oneWeekAgo = new Date();
oneWeekAgo.setDate(currentDate.getDate() - 7);
const newUsers = users.filter((user) => {
  const userDate = new Date(user.createdAt);
  return userDate >= oneWeekAgo;
});
  return (
    <>
    <Typography variant='h5' sx={{marginBottom:'20px'}}>Products</Typography>
    <Box sx={{display:'flex',gap:'30px',flexWrap:'wrap'}}>
      
      <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid violet'}}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
        {fishList.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Total Products
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px' ,border:'2px solid green'}}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
        {productInStock.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Product in stock
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid red' }}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
       {productOutStock.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
         Product out of stock
      </Typography>
    </CardContent>
  </Card>
    </Box>
    <Typography variant='h5' sx={{margin:'20px'}}>Customers</Typography>
    <Box sx={{display:'flex',gap:'30px',flexWrap:'wrap'}}>
      
      <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid violet'}}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
        {users.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Total Customers
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px' ,border:'2px solid green'}}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
        {0}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Active Customers
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid red' }}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
       {newUsers.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        New Customers (week)
      </Typography>
    </CardContent>
  </Card>
    </Box>
    </>
  )
}

export default DashBoard
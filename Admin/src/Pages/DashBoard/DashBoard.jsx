import React, { useContext } from 'react'
import { Card, CardContent, Typography,Box } from '@mui/material';
import { Materials } from '../../Context/Context';
const DashBoard = () => {
const {fishList,userData,orders}=useContext(Materials);
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
const activeUsers=users.filter((user)=>orders.some(order=>order.userId===user._id))

//order data
const deliveredOrders=orders.filter((order)=>order.status==='Delivered');
const pendingDeliveries=orders.filter((order)=>order.status==='Order Placed' || order.status==='Out for Delivery');

//Revenue data
const TotalReveniew=orders.reduce((sum,order)=>sum+order.amount,0)
const today = new Date().toISOString().split("T")[0];
const TodayReveniew=orders.filter((order)=>new Date(order.createdAt).toISOString().split("T")[0] ===today).reduce((sum,order)=>sum+order.amount,0)

const ReveniewWeek = orders
  .filter(order => new Date(order.createdAt) >= oneWeekAgo)
  .reduce((sum, order) => sum + order.amount, 0);
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
        {activeUsers.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Active Customers
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid red' }}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
       {newUsers.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        New Customers (week)
      </Typography>
    </CardContent>
  </Card>
    </Box>
    <Typography variant='h5' sx={{margin:'20px'}}>Orders</Typography>
    <Box sx={{display:'flex',gap:'30px',flexWrap:'wrap'}}>
      
      <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid violet'}}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
        {orders.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Total Orders
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px' ,border:'2px solid green'}}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
        {deliveredOrders.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Delivered Orders
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid red' }}>
    <CardContent>
      <Typography variant="h3" component="div" sx={{ fontWeight: '400' }}>
       {pendingDeliveries.length}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Pending Orders
      </Typography>
    </CardContent>
  </Card>
    </Box>
    <Typography variant='h5' sx={{margin:'20px'}}>Reveniew</Typography>
    <Box sx={{display:'flex',gap:'30px',flexWrap:'wrap'}}>
      
      <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid violet'}}>
    <CardContent>
      <Typography variant="h4" component="div" sx={{ fontWeight: '400' }}>
      ₹ {TotalReveniew}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Total Revenue
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px' ,border:'2px solid green'}}>
    <CardContent>
      <Typography variant="h4" component="div" sx={{ fontWeight: '400' }}>
      ₹ {TodayReveniew}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Today Reveniew
      </Typography>
    </CardContent>
  </Card>
  <Card sx={{ width:'300px', textAlign: 'center', padding: '20px',border:'2px solid red' }}>
    <CardContent>
      <Typography variant="h4" component="div" sx={{ fontWeight: '400' }}>
      ₹  {ReveniewWeek}
      </Typography>
      <Typography variant="body4" color="text.secondary">
        Reveniew in Week
      </Typography>
    </CardContent>
  </Card>
    </Box>
    </>
  )
}

export default DashBoard
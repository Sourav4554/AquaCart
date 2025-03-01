import React, { useContext } from "react";
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid2,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Materials } from "../../Context/Context";
import {toast} from 'react-toastify'
const Order = () => {
  const { orders,BackendUrl ,token,fetchOrders} = useContext(Materials);
  const onchangeHandler=async(e,orderId)=>{
  try {
    let status=e.target.value;
    const{data}=await axios.post(`${BackendUrl}/api/order/status`,{orderId,status},{headers:{Authorization: `Bearer ${token}`,}});
    if(data.success){
    toast.success(data.message)
    await fetchOrders(token);
    }else{
    toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <Grid2 container spacing={3} justifyContent="left" sx={{ mt: 4 }}>
      <Grid2 item xs={12} md={10} width={900}>
        <Typography variant="h4" gutterBottom align="left">
           Order Manage
        </Typography>

        {orders.map((order) => (
          <Card key={order._id} sx={{ mb: 3, p: 2, boxShadow: 3 }}>
            <CardContent>
              {/* Order Header */}
              <Grid2 container justifyContent="space-between">
                <Grid2 item>
                  <Typography variant="subtitle1">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Payment:</strong>{" "}
                    {order.payment ? "Paid" : "not paid" }
                    {` (${order.paymentMethod})`}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Status:</strong> {order.status}
                  </Typography>
                </Grid2>
               
                  <Grid2 item>

                  <FormControl fullWidth size="small">
                            
                            <Select value={order.status} onChange={(e)=>{onchangeHandler(e,order._id)}}>
                              <MenuItem value="Order Placed">Order Placed</MenuItem>
                              <MenuItem value="Out for Delivery">
                                Out for Delivery
                              </MenuItem>
                              <MenuItem value="Delivered">Delivered</MenuItem>
                            </Select>
                          </FormControl>
                  </Grid2>
                <Grid2 item>
                  <Typography variant="h6" color="primary">
                    Total: ₹{order.amount}
                  </Typography>
                </Grid2>
              </Grid2>

              <Grid2 container justifyContent='space-between'>
                  <Grid2 item>
                     {/* Customer Details */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {`${order.address.firstName} ${order.address.lastName}`}
              </Typography>
              <Typography variant="subtitle1">
                {order.address.email}
              </Typography>
              <Typography variant="subtitle1">
                 {order.address.phone}
              </Typography>
                  </Grid2>

                  <Grid2 item>
                  <Typography variant="subtitle1" >
                  {order.address.street},
                {order.address.city}, 
               
              </Typography>
              <Typography variant="subtitle1">
              {order.address.district},{order.address.state},{" "}
              </Typography>
              <Typography variant="subtitle1">
              {order.address.pincode}
              </Typography>
                  </Grid2>
              </Grid2>
               
              
            
              {/* Order Items Table */}
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Category</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                  
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell align="center" >
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            sx={{ width: 60, height: 60 }}
                          />
                        </TableCell >
                        <TableCell align="center">
                          <Typography variant="body1">{item.name}</Typography>
                        </TableCell>
                        <TableCell align="center">{item.category}</TableCell>
                        <TableCell align="center">₹{item.price}</TableCell>
                        <TableCell align="center">{item.quantity || 1}</TableCell>
                    
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default Order;

import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from "@mui/icons-material/BarChart";
import './Sidebar.css'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
  <Box sx={{
    width: { xs: "20%", sm: "20%", md: "16%", lg: "14%" },
    borderRight:'1px solid grey',
    height:'90vh'}}>
<List>
  {/*first item */}
  <NavLink to='/dashboard' style={{ textDecoration: "none", color: "inherit" }}>
  <ListItem disablePadding >
   <ListItemButton >
   <ListItemIcon>
    <DashboardIcon/>
   </ListItemIcon>
    <ListItemText  
    sx={{ display: { xs: "none",md:'block',sm:'block',lg:'block'} }}
    >Dashboard</ListItemText>
   </ListItemButton>
  </ListItem>
  </NavLink>
 

  {/*second item */}
  <NavLink to='/products' style={{ textDecoration: "none", color: "inherit" }}>
  <ListItem disablePadding>

   <ListItemButton>
   <ListItemIcon>
    <InventoryIcon/>
   </ListItemIcon>
    <ListItemText  sx={{ display: { xs: "none",md:'block',sm:'block',lg:'block'} }}>Products</ListItemText>
   </ListItemButton>
  </ListItem>
  </NavLink>


   {/*third item */}
   <NavLink to='/customers' style={{ textDecoration: "none", color: "inherit" }}>
   <ListItem disablePadding>
   <ListItemButton>
   <ListItemIcon>
    <PeopleIcon/>
   </ListItemIcon>
    <ListItemText  sx={{ display: { xs: "none",md:'block',sm:'block',lg:'block'} }}>Customers</ListItemText>
   </ListItemButton>
  </ListItem>
</NavLink>

     {/*fourth item */}
     <NavLink to='/orders' style={{ textDecoration: "none", color: "inherit" }}>
     <ListItem disablePadding>
   <ListItemButton>
   <ListItemIcon>
  <ShoppingCartIcon/>
   </ListItemIcon>
    <ListItemText sx={{ display: { xs: "none",md:'block',sm:'block',lg:'block'} }}>Orders</ListItemText>
   </ListItemButton>
  </ListItem>
</NavLink>


     {/*fifth item */}
     <NavLink to='/analytics' style={{ textDecoration: "none", color: "inherit" }}>
     <ListItem disablePadding>
   <ListItemButton>
   <ListItemIcon>
  <BarChartIcon/>
   </ListItemIcon>
    <ListItemText sx={{ display: { xs: "none",md:'block',sm:'block',lg:'block'} }}>Analytics</ListItemText>
   </ListItemButton>
  </ListItem>
  </NavLink>
</List>
  </Box>

  )
}

export default Sidebar
import React from 'react'
import SalesLineChart from '../../Components/SalesLineChart/SalesLineChart'
import { Box, Typography } from '@mui/material'
import CategorySales from '../../Components/CategorySales/CategorySales'
import PaymentAnalyze from '../../Components/PaymentAnalyze/PaymentAnalyze'
import OrderStatusChart from '../../Components/OrderStatusAnalyse/OrderStatusAnalyse'
const Analytic = () => {
  return (
    <>


<Box display="flex"  width="100%" flexWrap={'wrap'} >
  <Box sx={{width:{xs: "100%", sm: "80%", md: "60%", lg: "45%"}}}>
  <Typography variant='h6' mt={2} ml={8}>
  Total Sales Over Time
</Typography>
    <SalesLineChart sx={{ width: "100%", height: "100%" }} />
  </Box>
  <Box sx={{width:{xs: "100%", sm: "80%", md: "60%", lg: "45%"}}}>
  <Typography variant='h6' mt={2} ml={8}>
   Sales count per category
</Typography>
    <CategorySales sx={{ width: "100%", height: "100%" }} />
  </Box>
  <Box sx={{width:{xs: "100%", sm: "80%", md: "60%", lg: "45%"}}}>
  <Typography variant='h6' mt={2} ml={8}>
  Payment Methods Usage
</Typography>
   <PaymentAnalyze  sx={{ width: "50%", height: "50%" }}/>
  </Box>
  <Box sx={{width:{xs: "100%", sm: "80%", md: "60%", lg: "45%"}}}>
  <Typography variant='h6' mt={2} ml={8}>
  Order Status Breakdown
</Typography>
    <OrderStatusChart sx={{ width: "50%", height: "50%" }}/>
  </Box>
</Box>


    </>
  )
}

export default Analytic
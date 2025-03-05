import React from 'react'
import SalesLineChart from '../../Components/SalesLineChart/SalesLineChart'
import { Box, Typography } from '@mui/material'
import CategorySales from '../../Components/CategorySales/CategorySales'

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
</Box>


    </>
  )
}

export default Analytic
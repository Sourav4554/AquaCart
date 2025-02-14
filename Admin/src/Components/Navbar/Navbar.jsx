import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import { Materials } from '../../Context/Context';
import DarkModeToggle from '../DarkMode/DarkModeToogle';
import { useNavigate } from 'react-router-dom';


const Navbar=()=> {
const navigate=useNavigate()
const theme=useTheme(); 
const {setShowLogin}=React.useContext(Materials)
const [auth, setAuth] = React.useState(true);

//function for logout
const logOut=()=>{
sessionStorage.removeItem('token');
setShowLogin(false)
navigate('/');
}

  



  return (
    <Box sx={{ flexGrow: 1 }}>
        
    
      <Box position="static"
      sx={{  
        borderBottom: '2px solid #f5f5f5', 
        boxShadow: 'none' ,
        backgroundColor:theme.palette.text.seconary
      }}
      >
        <Toolbar>
        
          <Typography variant="h5" fontWeight='bold' component="div" sx={{ flexGrow: 1}}>
            AQUACART
          </Typography>
          {auth && (
            <Box>
            <DarkModeToggle/>
              <Button variant="outlined"
              sx={{
             
          
            borderRadius:'5px',
          
            }}
               onClick={logOut}>LOGOUT</Button>
              
              </Box>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}
export default Navbar
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import { Button } from '@mui/material';
import { Materials } from '../../Context/Context';

const Navbar=()=> {
const {setShowLogin}=React.useContext(Materials)
const [auth, setAuth] = React.useState(true);
//function for logout
const logOut=()=>{
sessionStorage.removeItem('token');
setShowLogin(false)
}

  



  return (
    <Box sx={{ flexGrow: 1 }}>
        
      <FormGroup>
      </FormGroup>
      <AppBar position="static"
      sx={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #f5f5f5', 
        boxShadow: 'none' 
      }}
      >
        <Toolbar>
        
          <Typography variant="h5" fontWeight='bold' component="div" sx={{ flexGrow: 1,color:'black',}}>
            AQUACART
          </Typography>
          {auth && (
            <div>
             
              <Button variant="outlined"
              sx={{
            border:'1px solid black',
            borderRadius:'5px',
            color:'black'
            }}
               onClick={logOut}>LOGOUT</Button>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar
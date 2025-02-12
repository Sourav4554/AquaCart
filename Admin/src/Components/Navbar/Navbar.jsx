import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';

const Navbar=()=> {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);





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
              >LOGOUT</Button>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar
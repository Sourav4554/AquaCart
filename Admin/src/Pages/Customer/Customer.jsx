import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Materials } from '../../Context/Context';
import { Button, Typography } from '@mui/material';
import  { jsPDF } from 'jspdf'
import "jspdf-autotable"

const columns = [
  { id: "siNo", label: "Si. No", minWidth: 30,  },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'email', label: 'Email', minWidth: 50 },
  { id: 'month', label: 'Month', minWidth: 50 },
  { id: 'day', label: 'Day', minWidth: 50,  },
  { id: 'date', label: 'Date', minWidth: 50,  },
];

const Customer=()=> {
  const {userData}=React.useContext(Materials)
  const AllUsers= Array.isArray(userData) ? userData : [];
 
  //function for download pdf
const downloadPDF=()=>{
  const document =new jsPDF();
  document.text('Costomer List',14,15);
  const tableData=AllUsers.map((item,index)=>{
  const createdAt=new Date(item.createdAt)
  return[
  index+1,
  item.name,
  item.email,
  createdAt.toLocaleDateString("en-US", { month: "long" }),
  createdAt.toLocaleDateString("en-US", { weekday: "long" }),
  createdAt.toLocaleDateString("en-IN"),
  ]
  })
  document.autoTable({
  head:[['Si No','Name','Email','Month','Day','Date']],
  body:tableData,
  startY:25
  })
  document.save('costomer_list.pdf');
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" component="div" sx={{ padding: '16px',fontWeight:'500' }}>
        Customer List
      </Typography>
      <Button variant='contained' color='primary' onClick={downloadPDF} sx={{ marginLeft: "16px", marginBottom: "10px" }}>
        Download PDF
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth, padding: '12px 20px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {AllUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                const createdAt= new Date(row.createdAt);
                const monthName=createdAt.toLocaleDateString('en-US',{month:'long'});
                const dayName=createdAt.toLocaleDateString('en-US',{weekday:'long'})
                const fullDate=new Date(createdAt).toLocaleDateString('en-IN');
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                     let value;
                     switch(column.id){
                       case "siNo":
                         value = page * rowsPerPage + index + 1; 
                           break;
                        case 'month':
                          value=monthName;
                          break;
                        case 'day':
                          value=dayName;
                          break;
                        case 'date':
                          value=fullDate;
                          break;
                        default:
                          value=row[column.id]
                    }
                      return (
                        <TableCell key={column.id} align='center'>
                         {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={AllUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}
export default Customer
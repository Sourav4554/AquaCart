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
import { Typography } from '@mui/material';


const columns = [
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'email', label: 'Email', minWidth: 50 },
  { id: 'month', label: 'Month', minWidth: 50 },
  { id: 'day', label: 'Day', minWidth: 50, align: 'right', },
  { id: 'date', label: 'date', minWidth: 50, align: 'right' },
];

const Customer=()=> {
  const {userData}=React.useContext(Materials)
  const AllUsers= Array.isArray(userData) ? userData : [];
 
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
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
              .map((row) => {
                const createdAt= new Date(row.createdAt);
                const monthName=createdAt.toLocaleDateString('en-US',{month:'long'});
                const dayName=createdAt.toLocaleDateString('en-US',{weekday:'long'})
                const fullDate=new Date(createdAt).toLocaleDateString('en-IN');
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                     let value;
                     switch(column.id){
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
                        <TableCell key={column.id} align={column.align}>
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
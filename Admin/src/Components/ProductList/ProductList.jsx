import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Materials } from '../../Context/Context';

const columns = [
  { id: 'image', label: 'Image', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'category', label: 'Category', minWidth: 50 },
  { id: 'price', label: 'Price', minWidth: 50, align: 'right', format: (value) => `₹${value}` },
  { id: 'stock', label: 'Stock', minWidth: 50, align: 'right' },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
];

const ProductList=()=> {
  const {fishList,deleteFish,token}=React.useContext(Materials)
  const fishes = Array.isArray(fishList) ? fishList : [];
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
            {fishes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                          column.id==='image'?(
                            <img src={value} alt={row.name} style={{ width: '50px', height: '50px' }} />
                            ):column.id === 'stock' ? (
                              <span
                                style={{
                                  color: value === false ? 'red' : 'green',
                                  fontWeight: 'bold',
                                }}
                              >
                                {value === true ? 'In Stock' : 'Out of Stock'}
                              </span>):column.id === 'actions' ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() =>{ deleteFish(row._id,token)}}>
                      <DeleteIcon />
                    </IconButton>
                  </div>):(
                          column.format && typeof value === 'number'
                            ? column.format(value)
                            : value)}
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
        count={fishes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default ProductList
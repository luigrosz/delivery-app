import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

function CheckoutTable({ filtered, page, rowsPerPage, handleRemove }) {
  const createDataTest = (testid, id) => `${testid}${id}`;

  return (
    <TableContainer
      component={ Paper }
      sx={ {
        width: '70vw',
        maxHeight: 450,
      } }
    >
      <Table aria-label="spanning table">
        <TableHead sx={ { position: 'sticky', top: 0, backgroundColor: 'white' } }>
          <TableRow>
            <TableCell align="left">
              Item
            </TableCell>
            <TableCell align="center">
              Descrição
            </TableCell>
            <TableCell align="right">
              Quantidade
            </TableCell>
            <TableCell align="right">
              Valor Unitário
            </TableCell>
            <TableCell align="right">
              Sub-total
            </TableCell>
            <TableCell align="right">
              Remove Item
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((prod, index) => (
              <TableRow key={ prod.id }>
                <TableCell
                  align="left"
                  data-testid={ createDataTest(
                    'customer_checkout__element-order-table-item-number-',
                    index,
                  ) }
                >
                  { prod.id }
                </TableCell>
                <TableCell
                  align="center"
                  data-testid={ createDataTest(
                    'customer_checkout__element-order-table-name-',
                    index,
                  ) }
                >
                  { prod.name }
                </TableCell>
                <TableCell
                  align="right"
                  data-testid={ createDataTest(
                    'customer_checkout__element-order-table-quantity-',
                    index,
                  ) }

                >
                  { prod.quantity }
                </TableCell>
                <TableCell
                  align="right"
                  data-testid={ createDataTest(
                    'customer_checkout__element-order-table-unit-price-',
                    index,
                  ) }

                >
                  { prod.price.toFixed(2).toString().replace('.', ',') }
                </TableCell>
                <TableCell
                  align="right"
                  data-testid={ createDataTest(
                    'customer_checkout__element-order-table-sub-total-',
                    index,
                  ) }
                >
                  { (prod.price * prod.quantity).toFixed(2).toString().replace('.', ',') }
                </TableCell>
                <TableCell
                  align="right"
                >
                  <Button
                    variant="outlined"
                    onClick={ () => handleRemove(prod.id) }
                    data-testid={ createDataTest(
                      'customer_checkout__element-order-table-remove-',
                      index,
                    ) }
                  >
                    Remover Item
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CheckoutTable.propTypes = {
  filtered: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
      url_image: PropTypes.string,
    }),
  ).isRequired,
  page: PropTypes.number.isRequired,
  handleRemove: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default CheckoutTable;

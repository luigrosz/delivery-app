import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { context } from '../../context';
import testids from '../../helper/testids';

function CheckoutTable({ filtered, page, rowsPerPage, handleRemove, isDetail }) {
  const { user } = useContext(context);
  const createDataTest = (testid, id) => `${testid}${id}`;
  const dataTestIdValue = (str, index) => {
    const base = testids[user.role];
    if (isDetail) {
      return (typeof index === 'number')
        ? `${base[str.replace('checkout', 'details')]}${index}`
        : base[str.replace('checkout', 'details')];
    }
    return (typeof index === 'number') ? `${base[str]}${index}` : base[str];
  };

  return (
    <TableContainer
      component={ Paper }
      sx={ {
        width: { md: '70vw', xs: '100vw' },
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
            {(handleRemove)
              ? (
                <TableCell align="right">
                  Remove Item
                </TableCell>
              ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((prod, index) => (
              <TableRow key={ prod.id }>
                <TableCell
                  align="left"
                  data-testid={ dataTestIdValue('checkoutTableItemNumber', index) }
                >
                  { index + 1 }
                </TableCell>
                <TableCell
                  align="center"
                  data-testid={ dataTestIdValue('checkoutTableItemName', index) }
                >
                  { prod.name }
                </TableCell>
                <TableCell
                  align="right"
                  data-testid={ dataTestIdValue('checkoutTableItemQnt', index) }
                >
                  { prod.quantity }
                </TableCell>
                <TableCell
                  align="right"
                  data-testid={ dataTestIdValue('checkoutTableItemUnit', index) }

                >
                  { (+prod.price).toFixed(2).toString().replace('.', ',') }
                </TableCell>
                <TableCell
                  align="right"
                  data-testid={ dataTestIdValue('checkoutTableItemSub', index) }
                >
                  { ((+prod.price) * prod.quantity)
                    .toFixed(2).toString().replace('.', ',') }
                </TableCell>
                { (handleRemove)
                  && (
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
                  )}
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
  handleRemove: PropTypes.func,
  isDetail: PropTypes.bool,
  rowsPerPage: PropTypes.number.isRequired,
};

CheckoutTable.defaultProps = {
  handleRemove: null,
  isDetail: false,
};

export default CheckoutTable;

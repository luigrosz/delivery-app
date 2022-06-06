import React, { useContext } from 'react';
import { TablePagination, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { context } from '../../context';
import CheckoutTable from './CheckoutTable';

const mChecklist = [
  {
    itemNumber: 1,
    quantity: 2,
  },
  {
    itemNumber: 2,
    quantity: 5,
  },
  {
    itemNumber: 3,
    quantity: 5,
  },
  {
    itemNumber: 4,
    quantity: 5,
  },
  {
    itemNumber: 5,
    quantity: 5,
  },
  {
    itemNumber: 6,
    quantity: 5,
  },
];

const minColP = 11;
const medColP = 15;
const maxColP = 20;

function Checkout() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(minColP);
  const { products } = useContext(context);
  const rowsPerPageOption = [minColP, medColP, maxColP];
  const filtered = products.reduce((acc, p) => {
    let newP = {};
    const foundItem = mChecklist.find(({ itemNumber }) => itemNumber === +p.id);
    if (foundItem) {
      newP = { ...p, price: parseFloat(p.price), quantity: foundItem.quantity };
      return [...acc, newP];
    }
    return acc;
  }, []);
  console.log(filtered);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const calcTotal = () => filtered.reduce((acc, f) => acc + (f.price * f.quantity), 0);

  return (
    <Grid
      container
      component="main"
      sx={ {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        backgroundColor: 'white',
      } }
    >
      <Typography component="h1" variant="h5" sx={ { mb: 2, mt: 1 } }>
        Finalizar Pedido
      </Typography>
      <CheckoutTable
        filtered={ filtered }
        page={ page }
        rowsPerPage={ rowsPerPage }
      />
      <TablePagination
        labelRowsPerPage="N° de colunas"
        rowsPerPageOptions={ rowsPerPageOption }
        component="div"
        count={ filtered.length }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onPageChange={ handleChangePage }
        onRowsPerPageChange={ handleChangeRowsPerPage }
      />
      <Typography
        component="h1"
        variant="h5"
        sx={ { mb: 2 } }
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total Price: ${calcTotal()}` }
      </Typography>

      <Typography component="h1" variant="h5" sx={ { mt: 2 } }>
        Detalhes e Endereço para Entrega
      </Typography>
      <Container
        component={ Paper }
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          width: '70vw',
        } }
      >
        <Box
          sx={ {
            mt: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-around',
          } }
        >
          <TextField
            select
            sx={ {
              width: '20%',
            } }
            required
            label="Vendedor Responsável"
            data-testid="customer_checkout__select-seller"
          >
            <MenuItem value="a">Aaaa</MenuItem>
            <MenuItem>Aaaa</MenuItem>
          </TextField>
          <TextField
            sx={ {
              width: '50%',
            } }
            required
            label="Endereço"
            data-testid="customer_checkout__input-address"
          />
          <TextField
            label="Numero"
            id="outlined-start-adornment"
            sx={ {
              width: '13%',
            } }
            required
            InputProps={ {
              startAdornment: <InputAdornment position="start">N°:</InputAdornment>,
            } }
            data-testid="customer_checkout__input-addressNumber"
          />
        </Box>
        <Button
          variant="contained"
          sx={ {
            mb: 2,
          } }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </Button>
      </Container>
    </Grid>
  );
}

export default Checkout;

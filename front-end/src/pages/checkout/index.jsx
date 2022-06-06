import React, { useContext, useState } from 'react';
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

const minColP = 11;
const medColP = 15;
const maxColP = 20;

function Checkout() {
  const { products, setProducts, sellers } = useContext(context);
  const [page, setPage] = useState(0);
  const [inputs, setInputs] = useState({
    sellerId: sellers[0]?.id, deliveryAddress: '', deliveryNumber: '' });
  const [rowsPerPage, setRowsPerPage] = React.useState(minColP);
  const rowsPerPageOption = [minColP, medColP, maxColP];
  const filtered = products.reduce((acc, p) => {
    if (p?.quantity) {
      const newP = { ...p, price: parseFloat(p.price) };
      return [...acc, newP];
    }
    return acc;
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemove = (id) => {
    setProducts((prevProd) => prevProd.map((p) => {
      if (p.id === id) {
        return { ...p, quantity: 0 };
      }
      return p;
    }));
  };

  const handleInputChange = ({ target: { value, name } }) => {
    if (name === 'deliveryNumber' && !(+value)) {
      return;
    }
    setInputs((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const calcTotal = () => filtered.reduce(
    (acc, f) => acc + (f.price * f.quantity), 0,
  ).toFixed(2);

  const sendOrder = async () => {
    const body = {
      ...inputs,
      totalPrice: calcTotal(),
      products: products.filter((p) => p?.quantity),
    };
    console.log(body);
    /* await fetch(`${APIURL}/sale`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: user.token
      },
      body: {
        ...inputs,
        totalPrice: calcTotal(),
        products: products.filter((p) => p?.quantity),
      }
    }) */
  };

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
        handleRemove={ handleRemove }
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
            inputProps={ { 'data-testid': 'customer_checkout__select-seller' } }
            onChange={ handleInputChange }
            name="sellerId"
            value={ inputs.sellerId }
          >
            {sellers.map((seller) => (
              <MenuItem key={ seller.id } value={ seller.id }>{seller.name}</MenuItem>))}
          </TextField>
          <TextField
            sx={ {
              width: '50%',
            } }
            required
            label="Endereço"
            inputProps={ { 'data-testid': 'customer_checkout__input-address' } }
            onChange={ handleInputChange }
            name="deliveryAddres"
            value={ inputs.deliveryAddres }
          />
          <TextField
            label="Numero"
            sx={ {
              width: '13%',
            } }
            required
            inputProps={ { 'data-testid': 'customer_checkout__input-addressNumber' } }
            onChange={ handleInputChange }
            name="deliveryNumber"
            value={ inputs.deliveryNumber }
          />
        </Box>
        <Button
          variant="contained"
          sx={ {
            mb: 2,
          } }
          data-testid="customer_checkout__button-submit-order"
          onClick={ sendOrder }
        >
          Finalizar Pedido
        </Button>
      </Container>
    </Grid>
  );
}

export default Checkout;

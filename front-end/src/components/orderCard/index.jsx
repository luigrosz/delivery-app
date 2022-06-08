import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const style = { display: 'flex', flexDirection: 'column', alignItems: 'center' };

const OrderCard = ({ id, status, date, price }) => (
  <Grid
    container
    justifyContent="space-between"
    alignItems="center"
    sx={ { backgroundColor: '#e4e4e4' } }
    component={ Paper }
  >
    <Grid item xs={ 1 } sx={ { ...style, backgroundColor: '#ffffff' } }>
      <Typography variant="h6">Pedido</Typography>
      <Typography
        variant="h4"
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { id }
      </Typography>
    </Grid>
    <Grid
      item
      xs={ 4 }
      component={ Paper }
      sx={ { ...style, backgroundColor: '#2FC18C' } }
      data-testid={ `customer_orders__element-delivery-status-${id}` }
    >
      <Typography variant="h2">{ status.toUpperCase() }</Typography>
    </Grid>
    <Grid item xs={ 2 }>
      <Typography
        variant="h4"
        sx={ { ...style, backgroundColor: '#ffffff' } }
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { date }
      </Typography>
      <Typography
        variant="h4"
        sx={ { ...style, backgroundColor: '#ffffff' } }
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { `R$${price}` }
      </Typography>
    </Grid>
  </Grid>
);

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderCard;

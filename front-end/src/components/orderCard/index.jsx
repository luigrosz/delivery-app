import { Grid, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { context } from '../../context';
import testids from '../../helper/testids';

const style = { display: 'flex', flexDirection: 'column', alignItems: 'center' };

const OrderCard = ({ id, status, date, price }) => {
  const { user } = useContext(context);

  return (
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
          data-testid={ `${testids[user.role].orderCardID}${id}` }
        >
          { id }
        </Typography>
      </Grid>
      <Grid
        item
        xs={ 4 }
        component={ Paper }
        sx={ { ...style, backgroundColor: '#2FC18C' } }
        data-testid={ `${testids[user.role].orderCardStatus}${id}` }
      >
        <Typography variant="h2">{ status.toUpperCase() }</Typography>
      </Grid>
      <Grid item xs={ 2 }>
        <Typography
          variant="h4"
          sx={ { ...style, backgroundColor: '#ffffff' } }
          data-testid={ `${testids[user.role].orderCardDate}${id}` }
        >
          { date }
        </Typography>
        <Typography
          variant="h4"
          sx={ { ...style, backgroundColor: '#ffffff' } }
          data-testid={ `${testids[user.role].orderCardPrice}${id}` }
        >
          { `R$${price}` }
        </Typography>
      </Grid>
    </Grid>
  );
};

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderCard;

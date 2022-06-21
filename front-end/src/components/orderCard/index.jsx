import { Grid, Paper, Typography, Button } from '@mui/material';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { context } from '../../context';
import testids from '../../helper/testids';

const style = { display: 'flex', flexDirection: 'column', alignItems: 'center' };

const OrderCard = ({ id, status, saleDate, totalPrice }) => {
  const { user } = useContext(context);
  const date = new Date(saleDate.toString());
  const formatedDate = format(date, 'dd/MM/yyyy');

  const navigate = useNavigate();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={ { backgroundColor: '#e4e4e4' } }
      component={ Paper }
      onClick={ () => navigate(`/${user.role}/orders/${id}`) }
    >
      <Grid item xs={ 2 } sx={ { ...style, backgroundColor: '#ffffff' } }>
        <Typography>Pedido</Typography>
        <Button
          data-testid={ `${testids[user.role].orderCardID}${id}` }
          onClick={ () => navigate(`/${user.role}/orders/${id}`) }
        >
          { id }
        </Button>
      </Grid>
      <Grid
        fullWidth
        item
        xs={ 4 }
        component={ Paper }
        sx={ { ...style, backgroundColor: '#2FC18C' } }
        data-testid={ `${testids[user.role].orderCardStatus}${id}` }
      >
        <Typography variant="h5">{ status }</Typography>
      </Grid>
      <Grid item xs={ 2 } fullWidth>
        <Typography
          sx={ { ...style, backgroundColor: '#ffffff' } }
          data-testid={ `${testids[user.role].orderCardDate}${id}` }
        >
          { formatedDate }
        </Typography>
        <Typography
          sx={ { ...style, backgroundColor: '#ffffff' } }
          data-testid={ `${testids[user.role].orderCardPrice}${id}` }
        >
          { `${totalPrice.replace('.', ',')}` }
        </Typography>
      </Grid>
    </Grid>
  );
};

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default OrderCard;

import { Grid, Paper } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import OrderCard from '../../components/orderCard';
import { context } from '../../context';

const Orders = () => {
  const { APIURL } = useContext(context);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { token, id, role } = JSON.parse(localStorage.getItem('user'));

    const response = await fetch(`${APIURL}/sale/${role}/${id}`, {
      headers: {
        authorization: token,
      },
    });
    const data = await response.json();
    setOrders(data);
    console.log('resposta', data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Grid container component={ Paper } spacing={ 2 }>
      { orders.map((order) => (
        <Grid item md={ 4 } xs={ 12 } key={ order.id }>
          <OrderCard
            { ...order }
            saleDate={ order.saleDate }
            totalPrice={ order.totalPrice }
          />
        </Grid>)) }
    </Grid>
  );
};

export default Orders;

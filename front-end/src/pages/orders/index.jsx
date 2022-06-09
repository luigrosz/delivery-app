import React, { useEffect, useContext } from 'react';
import { context } from '../../context';

const Orders = () => {
  const { APIURL } = useContext(context);

  const fetchOrders = async () => {
    const { token, id } = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${APIURL}/sale/${id}`, {
      headers: {
        authorization: token,
      },
    });
    const data = await response;
    console.log('resposta', data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div />
  );
};

export default Orders;

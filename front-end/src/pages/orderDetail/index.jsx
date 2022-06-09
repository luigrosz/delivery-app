import { Button, Grid, Paper, TablePagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { context } from '../../context';
import formatData from '../../helper/formatData';
import CheckoutTable from '../checkout/CheckoutTable';
import testids from '../../helper/testids';

const minColP = 11;
const medColP = 15;
const maxColP = 20;

const formatOrderDigits = (order) => {
  let sOrder = order.toString();
  const size = 4;
  const delta = size - sOrder.length;
  Array(delta).fill().forEach(() => { sOrder = `${0}${sOrder}`; });
  return sOrder;
};

function OrderDetail() {
  const { id } = useParams();
  const { user, APIURL } = useContext(context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(minColP);
  const rowsPerPageOption = [minColP, medColP, maxColP];

  const [sale, setSale] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchSaleById = useCallback(async () => {
    const response = await fetch(`${APIURL}/sale/${id}`, {
      headers: {
        Authorization: user.token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      data.products = data.products.map((p) => ({ ...p, price: +p.price }));
      console.log(data);
      setSale(data);
    }
  }, [setSale, APIURL, id, user]);

  useEffect(() => {
    if (user?.token) {
      fetchSaleById();
    }
  }, [fetchSaleById, user]);

  if (!sale) {
    return (<div>Loading</div>);
  }

  const calcTotal = () => sale.products.reduce(
    (acc, f) => acc + (f.price * f.quantity), 0,
  ).toFixed(2).toString().replace('.', ',');

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
        Detalhe do Pedido
      </Typography>
      <Container
        component={ Paper }
        sx={ {
          display: 'flex',
          justifyContent: 'space-between',
          width: '70%',
          mb: 4,
        } }
      >
        <Typography
          data-testid={ testids[user.role].detailsOrderId }
        >
          {formatOrderDigits(sale.id)}
        </Typography>
        <Typography
          data-testid={ testids[user.role].detailsOrderSellerName }
        >
          {`P. Vend: ${sale.seller.name}`}
        </Typography>
        <Typography
          data-testid={ testids[user.role].detailsOrderDate }
        >
          {formatData(sale.sale_date)}
        </Typography>
        <Typography
          data-testid={ testids[user.role].detailsOrderDeliveryStatus }
        >
          {sale.status}
        </Typography>
      </Container>
      <Button
        sx={ { mb: 2 } }
        data-testid={ testids[user.role].detailsOrderDeliveryCheck }
      >
        Marcar como entregue
      </Button>
      <CheckoutTable
        filtered={ sale.products }
        page={ page }
        rowsPerPage={ rowsPerPage }
        isDetail
      />
      <TablePagination
        labelRowsPerPage="N° de colunas"
        rowsPerPageOptions={ rowsPerPageOption }
        component="div"
        count={ sale.products.length }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onPageChange={ handleChangePage }
        onRowsPerPageChange={ handleChangeRowsPerPage }
      />
      <Typography
        component="h1"
        variant="h5"
        sx={ { mb: 2 } }
        data-testid={ testids[user.role].detailsOrderTotalPrice }
      >
        { `Total Price: ${calcTotal()}` }
      </Typography>
    </Grid>
  );
}

export default OrderDetail;

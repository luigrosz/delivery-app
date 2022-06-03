import React, { useEffect, useState } from 'react';
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [name, setName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          size="large"
          edge="start"
          color="inherit"
          sx={ { mr: 2 } }
          onClick={ () => navigate('/customer/products') }
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Button>
        <Button
          size="large"
          color="inherit"
          onClick={ () => navigate('/customer/checkout') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Button>
        <Box sx={ { flexGrow: 1 } } />
        <Box sx={ { display: { xs: 'none', md: 'flex' } } }>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={ { display: { xs: 'none', sm: 'block' } } }
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { name }
          </Typography>
          <Button
            size="large"
            edge="end"
            color="inherit"
            onClick={ handleLogout }
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import React, { useEffect, useState } from 'react';
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';

const NavBar = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {role === 'customer'
            && (
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
            )}
          <Button
            size="large"
            color="inherit"
            onClick={ () => navigate(`/${role}/orders`) }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </Button>
          <Box sx={ { flexGrow: 1 } } />
          <Box sx={ { display: { md: 'flex' } } }>
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
      <Outlet />
    </>
  );
};

export default NavBar;

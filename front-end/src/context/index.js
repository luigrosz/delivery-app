import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const context = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState({ });
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [users, setUsers] = useState([]);
  const hostname = process.env.REACT_APP_HOSTNAME || 'localhost';
  const port = process.env.REACT_APP_BACKEND_PORT || '3001';
  const APIURL = `http://${hostname}:${port}`;

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${APIURL}/product`);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  }, [APIURL]);

  const fetchUsers = useCallback(async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${APIURL}/user`, {
      headers: {
        authorization: token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }, [APIURL]);

  const fetchSellers = useCallback(async () => {
    const response = await fetch(`${APIURL}/seller`, {
      headers: {
        authorization: user.token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setSellers(data);
    }
  }, [APIURL, user]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.quantity * (+item.price)), 0);
    setTotalPrice(parseFloat(total).toFixed(2));
  }, [cart]);

  useEffect(() => {
    if (user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchProducts();
      fetchSellers();
    }
  }, [user, fetchProducts, fetchSellers]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = useMemo(() => ({
    APIURL,
    user,
    setUser,
    products,
    setProducts,
    setTotalPrice,
    totalPrice,
    sellers,
    cart,
    setCart,
    users,
    setUsers,
    fetchUsers,
  }), [user, users, APIURL, products, totalPrice, sellers, cart, fetchUsers]);
  return (
    <context.Provider value={ value }>
      { children }
    </context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

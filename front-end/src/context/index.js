import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const context = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState({ });
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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

  const fetchSellers = useCallback(async () => {
    const response = await fetch(`${APIURL}/seller`, {
      headers: {
        token: user.token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
    totalPrice,
    sellers,
    cart,
    setCart,
  }), [user, APIURL, products, totalPrice, sellers, cart]);
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

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const context = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState({ });
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const hostname = process.env.REACT_APP_HOSTNAME || 'localhost';
  const port = process.env.REACT_APP_BACKEND_PORT || '3001';
  const APIURL = `http://${hostname}:${port}`;

  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${APIURL}/product`);
    if (response.ok) {
      const data = await response.json();
      const newD = data.map((product) => {
        const newP = { ...product, urlImage: product.url_image };
        delete newP.url_image;
        return newP;
      });
      setProducts(newD);
    }
  }, [APIURL]);

  useEffect(() => {
    const total = products.reduce((acc, product) => {
      if (product?.quantity) {
        return acc + (product.price * product.quantity);
      }
      return acc;
    }, 0);
    setTotalPrice(parseFloat(total).toFixed(2));
  }, [products]);

  useEffect(() => {
    if (user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchProducts();
    }
  }, [user, fetchProducts]);

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
  }), [user, APIURL, products, totalPrice]);
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

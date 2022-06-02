import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const context = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState({});
  const hostname = process.env.REACT_APP_HOSTNAME;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const APIURL = `http://${hostname}:${port}`;
  /* useEffect(() => {
    if (user?.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []); */
  const value = useMemo(() => ({
    APIURL,
    user,
    setUser,
  }), [user, APIURL]);
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

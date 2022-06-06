import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import Provider from './context';
import rockGlass from './images/rockGlass.svg';
import Checkout from './pages/checkout';
import Login from './pages/login';
import Products from './pages/products';
import Signin from './pages/signin';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigate replace to="/login" />
                <Login />
              </>
            }
          />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Signin /> } />
          <Route path="/customer" element={ <NavBar /> }>
            <Route path="checkout" element={ <Checkout /> } />
            <Route path="products" element={ <Products /> } />
          </Route>
          <Route path="/customer/checkout" element={ <div> checkout </div> } />
          <Route
            path="/loading"
            element={
              <div>
                <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
                  Glass
                </object>

              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

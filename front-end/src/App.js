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
import Orders from './pages/orders';
import OrderDetail from './pages/orderDetail';
import Admin from './pages/admin';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Navigate to="/login" /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Signin /> } />
          <Route path="/customer" element={ <NavBar /> }>
            <Route path="checkout" element={ <Checkout /> } />
            <Route path="products" element={ <Products /> } />
            <Route path="orders" element={ <Orders /> } />
            <Route path="orders/:id" element={ <OrderDetail /> } />
          </Route>
          <Route path="/seller" element={ <NavBar /> }>
            <Route path="orders" element={ <Orders /> } />
            <Route path="orders/:id" element={ <OrderDetail /> } />
          </Route>
          <Route path="/admin" element={ <NavBar /> }>
            <Route path="manage" element={ <Admin /> } />
          </Route>
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

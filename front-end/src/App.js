import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Provider from './context';
import rockGlass from './images/rockGlass.svg';
import Login from './pages/login';
import Products from './pages/products';
import Signin from './pages/signin';

function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Navigate replace to="/login" /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Signin /> } />
            <Route path="/customer/products" element={ <Products /> } />
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
    </div>
  );
}

export default App;

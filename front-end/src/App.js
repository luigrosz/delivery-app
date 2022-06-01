import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import Login from './pages/login';
import Signin from './pages/signin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Signin /> } />
          <Route path="/products" element={ <div>Products</div> } />
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
    </div>
  );
}

export default App;

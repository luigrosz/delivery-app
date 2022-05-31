import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <div>Login</div> } />
          <Route path="/login" element={ <div>Login</div> } />
          <Route path="/signin" element={ <div>Signin</div> } />
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

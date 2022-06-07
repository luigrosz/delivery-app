const express = require('express');
const loginRouter = require('./login');
const productRouter = require('./product');
const signinRouter = require('./signin');
const sellersRouter = require('./seller');
const saleRouter = require('./sale');

const routes = express.Router();
routes.use('/login', loginRouter);
routes.use('/product', productRouter);
routes.use('/register', signinRouter);
routes.use('/seller', sellersRouter);
routes.use('/sale', saleRouter);

module.exports = routes;
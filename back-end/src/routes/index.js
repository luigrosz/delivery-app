const express = require('express');
const loginRouter = require('./login');
const productRouter = require('./product');
const signinRouter = require('./signin');
const sellersRouter = require('./seller');

const routes = express.Router();
routes.use('/login', loginRouter);
routes.use('/product', productRouter);
routes.use('/register', signinRouter);
routes.use('/seller', sellersRouter);

module.exports = routes;
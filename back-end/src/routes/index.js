const express = require('express');
const loginRouter = require('./login');
const productRouter = require('./product');

const routes = express.Router();
routes.use('/login', loginRouter);
routes.use('/product', productRouter);

module.exports = routes;
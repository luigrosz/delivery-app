const express = require('express');
const loginRouter = require('./login');
const productRouter = require('./product');
const signinRouter = require('./signin');
const sellersRouter = require('./seller');
const saleRouter = require('./sale');
const userRouter = require('./user');

const routes = express.Router();
routes.use('/login', loginRouter);
routes.use('/product', productRouter);
routes.use('/register', signinRouter);
routes.use('/seller', sellersRouter);
routes.use('/sale', saleRouter);
routes.use('/user', userRouter);

module.exports = routes;
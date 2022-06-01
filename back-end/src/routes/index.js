const express = require('express');
const loginRouter = require('./login');

const routes = express.Router();
routes.use('/login', loginRouter);

module.exports = routes;
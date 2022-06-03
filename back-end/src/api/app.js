const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('../routes');

const publicDirectory = path.join(__dirname, '../../public');

const app = express();

app.use(express.static(publicDirectory));
app.use(express.json());
app.use(cors());
app.use(routes);

module.exports = app;
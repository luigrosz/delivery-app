const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(express.json());

// torna a pasta de imagens publica
const publicDirectory = path.join(__dirname, '../../public');
app.use(express.static(publicDirectory));

app.use(cors());
app.use(routes);

module.exports = app;
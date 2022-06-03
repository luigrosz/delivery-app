const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(express.json());

// // torna a pasta de imagens publica
app.use(express.static(`${process.cwd()}/public`));

app.use(cors());
app.use(routes);

module.exports = app;
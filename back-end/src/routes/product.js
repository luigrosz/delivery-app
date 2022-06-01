const express = require('express');
const { getAllProducts, productById } = require('../controller/products.controller');

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', productById);

module.exports = router;
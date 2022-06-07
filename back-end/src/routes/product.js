const express = require('express');
const {
  getAllProductsController,
  productByIdController,

  editProdController,
  delprodController,
} = require('../controller/products.controller');

const router = express.Router();

router.get('/', getAllProductsController);

router.put('/:id', editProdController);

router.get('/:id', productByIdController);

router.delete('/:id', delprodController);

module.exports = router;

const express = require('express');
const {
  getAllProductsController,
  productByIdController,
  postProdController,
  editProdController,
  delprodController,
} = require('../controller/products.controller');

const router = express.Router();

router.get('/', getAllProductsController);

router.put('/:id', editProdController);

router.post('/', postProdController);

router.get('/:id', productByIdController);

router.delete('/:id', delprodController);

module.exports = router;
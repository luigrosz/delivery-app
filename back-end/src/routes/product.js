const express = require('express');
const {
  getAllProductsController,
  productByIdController,
  // deleted?
  // postProdController,
  editProdController,
  delprodController,
} = require('../controller/products.controller');

const router = express.Router();

router.get('/', getAllProductsController);

router.put('/:id', editProdController);

// was breaking the node
// router.post('/', postProdController);

router.get('/:id', productByIdController);

router.delete('/:id', delprodController);

module.exports = router;

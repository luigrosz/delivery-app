const express = require('express');
const {
  postSaleController,
  getAllSalesController,
  getSaleByIdSellerController,
  getSaleByIdUserController,
  getSaleByIdSaleController,
  updateSaleStatusByIdController } = require('../controller/sales.controller');
const { validateJWT, validateObjects } = require('../middlewares');

const router = express.Router();

router.get('/', validateJWT, getAllSalesController);
router.get('/customer/:id', validateJWT, getSaleByIdUserController);
router.get('/seller/:id', validateJWT, getSaleByIdSellerController);
router.get('/:id', validateJWT, getSaleByIdSaleController);
router.put('/:id', validateJWT, updateSaleStatusByIdController);
router.post('/', validateObjects, validateJWT, postSaleController);

module.exports = router;
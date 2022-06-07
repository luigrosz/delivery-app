const express = require('express');
const { postSaleController, getAllSalesController, getSaleByIdSellerController, getSaleByIdUserController } = require('../controller/sales.controller');
const { validateJWT, validateObjects } = require('../middlewares');

const router = express.Router();

router.get('/', validateJWT, getAllSalesController);
router.get('/user/:id', validateJWT, getSaleByIdUserController);
router.get('/seller/:id', validateJWT, getSaleByIdSellerController);
router.post('/', validateObjects, validateJWT,  postSaleController);

module.exports = router;

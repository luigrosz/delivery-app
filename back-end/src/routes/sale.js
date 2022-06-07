const express = require('express');
const postSaleController = require('../controller/sales.controller');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, postSaleController);

module.exports = router;

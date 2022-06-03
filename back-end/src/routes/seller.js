const express = require('express');

const { getAllSellers } = require('../controller/user.controller');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  validateJWT,
  getAllSellers,
);

module.exports = router;
const express = require('express');

const { getAllUsers } = require('../controller/user.controller');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  validateJWT,
  getAllUsers,
);

module.exports = router;
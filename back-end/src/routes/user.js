const express = require('express');
const { getAllUsers, deletuserControllers } = require('../controller/user.controller');
const { validateJWT } = require('../middlewares');
const { validateAdmin } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  validateJWT,
  getAllUsers,
);

router.delete('/', validateJWT, validateAdmin, deletuserControllers);

module.exports = router;
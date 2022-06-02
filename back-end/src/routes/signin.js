const express = require('express');
const { registerController } = require('../controller/user.controller');
const { validateEmail, validatePassword, validateName } = require('../middlewares');

const router = express.Router();
router.post(
  '/',
  validateEmail,
  validatePassword,
  validateName,
  registerController,
);

module.exports = router; 
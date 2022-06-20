const express = require('express');
const { loginController } = require('../controller/user.controller');
const { validateEmail, validatePassword } = require('../middlewares');

const router = express.Router();
router.post(
  '/',
  validateEmail,
  validatePassword,
  loginController,
);



module.exports = router; 
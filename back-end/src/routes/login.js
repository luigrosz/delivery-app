const express = require('express');
const post = require('../controller/login.controller');
const { validateEmail, validatePassword } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  post,
);

module.exports = router;
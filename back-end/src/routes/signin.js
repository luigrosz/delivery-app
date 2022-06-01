const express = require('express');
const post = require('../controller/signin.controller');
const { validateEmail, validatePassword, validateName } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  validateName,
  post,
);

module.exports = router;
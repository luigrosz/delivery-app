const express = require('express');
const { registerController, registerByAdminController } = require('../controller/user.controller');
const { validateEmail,
  validatePassword,
  validateName,
  validateJWT, 
  validateRole } = require('../middlewares');

const router = express.Router();
router.post(
  '/',
  validateEmail,
  validatePassword,
  validateName,
  registerController,
);

router.post(
  '/admin',
  validateEmail,
  validatePassword,
  validateName,
  validateRole,
  validateJWT,
  registerByAdminController,
);

module.exports = router; 
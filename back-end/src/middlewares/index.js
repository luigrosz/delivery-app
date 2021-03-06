const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePasswords');
const validateName = require('./validateName');
const validateJWT = require('./validateJWT');
const validateObjects = require('./validateObjects');
const validateRole = require('./validateRole');
const validateStatusMod = require('./validadeStatusMod');
const validateAdmin = require('./validateAdmin');

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateJWT,
  validateObjects,
  validateRole,
  validateStatusMod,
  validateAdmin,
}; 
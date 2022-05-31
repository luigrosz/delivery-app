const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
};

const SECRET = 'super-secret-pw';

module.exports = (data = {}) => jwt.sign({ data }, SECRET, jwtConfig); 
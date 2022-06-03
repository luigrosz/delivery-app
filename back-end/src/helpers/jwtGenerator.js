const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtConfig = {
  expiresIn: '1d',
};

const key = fs.readFileSync(`${process.cwd()}/jwt.evaluation.key`, 'utf8')

module.exports = (data = {}) => jwt.sign({ data }, key, jwtConfig); 
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '1d',
};

const SECRET = 'p!$rj$XMXLkfG54N5jyPXEs!VYEGXP#8kz$5PcMaYb';

module.exports = (data = {}) => jwt.sign({ data }, SECRET, jwtConfig); 
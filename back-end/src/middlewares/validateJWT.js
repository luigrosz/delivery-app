const fs = require('fs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const { users } = require('../database/models');

const validateJWT = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'No token provided.' });

    const key = fs.readFileSync(`${process.cwd()}/jwt.evaluation.key`, 'utf8');
    try {
      jwt.verify(authorization, key);
      const { data } = jwtDecode(authorization);
      const { email } = data;
      const isUserInDatabase = users.findOne({ where: { email } });
      if (!isUserInDatabase) {
        return res.status(500).json({ error: 'Failed to authenticate token.' });
      }
      req.user = data;
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }
};

module.exports = validateJWT;
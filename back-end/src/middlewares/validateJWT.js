const fs = require('fs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const validateJWT = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ error: 'No token provided.' });

    const key = fs.readFileSync(`${process.cwd()}/jwt.evaluation.key`, 'utf8');
    jwt.verify(authorization, key, (err, _decoded) => {
      if (err) return res.status(500).json({ error: 'Failed to authenticate token.' });
      });
    
    const { data } = jwtDecode(authorization);
    req.user = data;
    next();
};

module.exports = validateJWT;
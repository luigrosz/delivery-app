const fs = require('fs');
const jwt = require('jsonwebtoken');

const validateJWT = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    const key = fs.readFileSync(`${process.cwd()}/jwt.evaluation.key`, 'utf8');
    jwt.verify(token, key, (err, _decoded) => {
      if (err) return res.status(500).json({ error: 'Failed to authenticate token.' });
      });

      next();
};

module.exports = validateJWT;

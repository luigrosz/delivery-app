const { users } = require('../database/models');
const validateAdmin = async (req, res, next) => {
  const { email } = req.user;
  const isAdmin = await users.findOne({ where: { email } });
  console.log(isAdmin.role);
  if (isAdmin.role != 'administrator') {
    return res.status(409).json({ error: 'Somente administradores podem fazer isso.' });
  }
  return next();
};

module.exports = validateAdmin;
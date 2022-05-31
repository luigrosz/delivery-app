const { users } = require('../database/models');
const md5 = require('md5');

const loginService = async (email, password) => {
  try {
    const md5Password = md5(password);
    const result = await users.findOne({ where: { email, password: password } })
    return result;
  } catch (e) { 
    throw new Error(e);
  }
};

module.exports = loginService;
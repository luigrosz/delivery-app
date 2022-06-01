const md5 = require('md5');
const { users } = require('../database/models');

const loginService = async (email, password) => {
  try {
    const md5Password = md5(password);
    const result = await users.findOne({ where: { email, password: md5Password } });
    return result;
  } catch (e) { 
    throw new Error(e);
  }
};

module.exports = loginService;
const md5 = require('md5');
const { users } = require('../database/models');

const loginService = async (email, password) => {
    const md5Password = md5(password);
    const result = await users.findOne({ where: { email, password: md5Password } });
    return result;
};

const registerService = async (email, password, name) => {
  try {
    await users.findOne({ where: { email } });
    const md5Password = md5(password);
    const created = await users.create({ name, email, password: md5Password, role: 'customer' });
    return created;
  } catch (e) {
    return { error: 'Email is already on Database' };
  }
};

const allSellersService = async () => {
    const sellers = await users.findAll({ where: { role: 'seller' } });
    return sellers;
};

module.exports = { registerService, loginService, allSellersService }; 
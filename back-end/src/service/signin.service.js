const md5 = require('md5');
const { users } = require('../database/models');

const signinUserToDB = async (email, password, name) => {
  try {
    await users.findOne({ where: { email } });
    const md5Password = md5(password);
    const created = await users.create({ name, email, password: md5Password, role: 'customer' });
    
    return created;
  } catch (e) { 
    return { error: 'Email is already on Database' };
  }
};

module.exports = signinUserToDB;
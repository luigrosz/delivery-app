const md5 = require('md5');
const { users } = require('../database/models');

const signinUserToDB = async (email, password, name) => {
  try {
    const isEmailAlreadyInDb = await users.findOne({ where: { email } });
    if (!isEmailAlreadyInDb === null) {
      return { error: 'Email is already on Database' };
    }
    const md5Password = md5(password);
    const created = await users.create({ name, email, password: md5Password, role: 'customer' });
    return created;
  } catch (e) { 
    throw new Error(e);
  }
};

module.exports = signinUserToDB;
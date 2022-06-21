const md5 = require('md5');
const { QueryTypes } = require('sequelize');
const db = require('../database/models');
const { users } = require('../database/models');
const { registerNewUser } = require('../helpers/dbHelper');

const loginService = async (email, password) => {
  try {
    const md5Password = md5(password);
    const result = await users.findOne({ where: { email, password: md5Password } });
    return result;
  } catch (e) {
    throw new Error(e);
  }
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

const findUserByIdService = async (id) => {
  try {
    const user = await users.findOne({ where: { id } });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const registerByAdminService = async (registerUser, emailAdmin) => {
  try {
    const { name, email, password, role } = registerUser;
    const isAdmin = await users.findOne({ where: { email: emailAdmin } });
    if (isAdmin.role !== 'administrator') {
      return null;
    }
    const result = await db.sequelize.query(registerNewUser, {
      replacements: [name, email, md5(password), role],
      type: QueryTypes.INSERT,
    });
    return result;
  } catch (error) {
    const emailIsNotUnique = 'This email is not unique';
    return emailIsNotUnique;
  }
};

const allSellersService = async () => {
  try {
    const sellers = await users.findAll({ where: { role: 'seller' } });
    return sellers;
  } catch (e) {
    throw new Error(e);
  }
};

const allUsersService = async () => {
  try {
    const allUsers = await users.findAll();
    return allUsers;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteUserService = async (email) => {
  try {
    const user = await users.destroy({ where: { email } });
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  registerService,
  loginService,
  allSellersService,
  findUserByIdService,
  registerByAdminService,
  allUsersService,
  deleteUserService,
}; 
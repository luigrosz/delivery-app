const { loginService, registerService, allSellersService } = require('../service/user.service');
const jwtGenerator = require('../helpers/jwtGenerator');

const loginController = async (req, res, _next) => {
  try {
    const { email, password } = req.body;

    const isUserInDatabase = await loginService(email, password);

    if (isUserInDatabase === null) {
      return res.status(404).json({ error: 'Not Found' });
    }

    const token = jwtGenerator({ email, password });
    const { name, role, id } = isUserInDatabase;
    return res.status(200).json({ email, name, role, token, id });
  } catch (e) { 
    throw new Error(e);
  }
};

const registerController = async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerService(email, password, name);
    if ('error' in result) {
      return res.status(409).json(result);
    }
    const token = jwtGenerator({ email, password });
    const { role, id } = result;
    return res.status(201).json({ name, email, role, token, id });
  } catch (e) {
    throw new Error(e);
  }
};

const getAllSellers = async (_req, res, _next) => {
  try {
    const sellers = await allSellersService();
    return res.status(200).json(sellers);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = { loginController, registerController, getAllSellers };
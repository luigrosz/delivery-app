const { loginService,
  registerService,
  allSellersService,
  findUserByIdService,
  registerByAdminService,
} = require('../service/user.service');
const jwtGenerator = require('../helpers/jwtGenerator');

const loginController = async (req, res, _next) => {
  try {
    const { email, password } = req.body;

    const isUserInDatabase = await loginService(email, password);

    if (isUserInDatabase === null) {
      return res.status(404).json({ error: 'Not Found' });
    }

    const token = jwtGenerator({ email, password });
    const { name, role } = isUserInDatabase;
    return res.status(200).json({ email, name, role, token });
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
    const { role } = result;
    return res.status(201).json({ name, email, role, token });
  } catch (e) {
    throw new Error(e);
  }
};

const findUserByIdController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const user = await findUserByIdService(id);
    return res.status(200).json(user);
  } catch (error) {
    throw new Error();
  }
};

const registerByAdminController = async (req, res, _next) => {
  try {
    const { email } = req.user;
    const user = await registerByAdminService(req.body, email);
    if (!user) {
      return res.status(401).json({ error: 'Somente administradores podem fazer isso.' });
    }
    if (typeof user === 'string') {
      return res.status(401).json(user);
    }
    return res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
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

module.exports = {
  loginController,
  registerController,
  getAllSellers,
  registerByAdminController,
  findUserByIdController,
};
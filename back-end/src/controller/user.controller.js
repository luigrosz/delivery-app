const { loginService, registerService, allSellersService } = require('../service/user.service');
const jwtGenerator = require('../helpers/jwtGenerator');

const loginController = async (req, res, _next) => {
    const { email, password } = req.body;
    const isUserInDatabase = await loginService(email, password);
    if (isUserInDatabase === null) {
      return res.status(404).json({ error: 'Not Found' });
    }
    const token = jwtGenerator({ email, password });
    const { name, role } = isUserInDatabase;
    return res.status(200).json({ email, name, role, token });
};

const registerController = async (req, res, _next) => {
    const { name, email, password } = req.body;
    const result = await registerService(email, password, name);
    if ('error' in result) {
      return res.status(409).json(result);
    }
    const token = jwtGenerator({ email, password });
    const { role } = result;
    return res.status(201).json({ name, email, role, token });
};

const getAllSellers = async (_req, res, _next) => {
    const sellers = await allSellersService();
    return res.status(200).json(sellers);
};

module.exports = { loginController, registerController, getAllSellers };
const signinUserToDB = require('../service/signin.service');
const jwtGenerator = require('../helpers/jwtGenerator');

const post = async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    const result = await signinUserToDB(email, password, name);
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

module.exports = post;
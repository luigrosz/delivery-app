const loginService = require('../service/login.service');
const jwtGenerator = require('../helpers/jwtGenerator');

const post = async (req, res, _next) => {
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
    console.log(e);
  }
};

module.exports = post;
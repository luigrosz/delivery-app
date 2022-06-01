const signinUserToDB = require('../service/signin.service');

const post = async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    const result = signinUserToDB(email, password, name);
    return res.status(201).json(result);
  } catch (e) { 
    throw new Error(e);
  }
};

module.exports = post;
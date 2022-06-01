const signinUserToDB = require('../service/signin.service');

const post = async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    const result = await signinUserToDB(email, password, name);
    console.log(result);
    if ('error' in result) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (e) { 
    throw new Error(e);
  }
};

module.exports = post;
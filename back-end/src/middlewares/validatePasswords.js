const validatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (password.length > 5) {
      return next();
    }
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  } catch (e) {
    throw new Error(e);
  }
}; 

module.exports = validatePassword;
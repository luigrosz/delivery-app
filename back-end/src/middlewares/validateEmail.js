// t.ly/19Zz
function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const validateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    return next();
  } catch (e) {
    throw new Error(e);
  }
}; 

module.exports = validateEmail;
const validateName = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name.length > 11) {
      return next();
    }
    return res.status(400).json({ message: '"name" length must be at least 12 characters long' });
  } catch (e) {
    throw new Error(e);
  }
}; 

module.exports = validateName;
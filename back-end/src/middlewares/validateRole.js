const validateRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400)
    .json({ message: '"role" must not be empty' });
    }
      return next();
  } catch (e) {
    throw new Error(e);
  }
}; 

module.exports = validateRole;
const validateObjects = async (req, res, next) => {
  try {
    const { sellerId, totalPrice, deliveryAddress } = req.body;
    if (sellerId || totalPrice || deliveryAddress) {
      return res.status(400).json({ message: 'Body is not correct' });
    }
    next();
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = validateObjects;
const validateObjects = async (req, res, next) => {
  try {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
    if(!sellerId || totalPrice || deliveryAddress || deliveryNumber || products){
      return res.status(400).json({ message: 'Body is not correct' });
    }
    next()
  } catch (e) {
    throw new Error(e);
  }
}; 

module.exports = validateObjects;

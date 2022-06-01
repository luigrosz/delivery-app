const { allProduts, productsById } = require('../service/produts.service');

const getAllProducts = async (_req, res, _next) => {
  try {
    const products = await allProduts();
    return res.status(200).json(products);
  } catch (e) {
    throw new Error(e);
  }
};

const productById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await productsById(id);
    return res.status(200).json(productById);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getAllProducts,
  productById,
};

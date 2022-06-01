const { products } = require('../database/models');

const allProduts = async () => {
  try {
    const productsAll = await products.findAll();
    return productsAll;
  } catch (e) {
    throw new Error(e);
  }
};

const productsById = async (id) => {
  try {
    const product = await products.findOne({ where: { id } });
    return product;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  allProduts,
  productsById,
}; 
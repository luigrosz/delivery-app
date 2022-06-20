const { products } = require('../database/models');

const allProductsService = async () => {
  try {
    const productsAll = await products.findAll();
    return productsAll;
  } catch (e) {
    throw new Error(e);
  }
};

const productsByIdService = async (id) => {
  try {
    const product = await products.findOne({ where: { id } });
    return product;
  } catch (e) {
    throw new Error(e);
  }
};

const editProductService = async (id, obj) => {
  try {
    const productEdited = await products.update(obj, { where: { id } });
    return productEdited;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteProductService = async (id) => {
  try {
    const delProd = await products.findOne({ where: { id } });
    await delProd.destroy();
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  allProductsService,
  productsByIdService,
  editProductService,
  deleteProductService,
}; 
const { products } = require('../database/models');

const allProductsService = async () => {
    const productsAll = await products.findAll();
    return productsAll;
};

const productsByIdService = async (id) => {
    const product = await products.findOne({ where: { id } });
    return product;
};

const editProductService = async (id, obj) => {
    const productEdited = await products.update(obj, { where: { id } });
    return productEdited;
};

const deleteProductService = async (id) => {
    const delProd = await products.findOne({ where: { id } });
    await delProd.destroy();
};

module.exports = {
  allProductsService,
  productsByIdService,
  editProductService,
  deleteProductService,
}; 
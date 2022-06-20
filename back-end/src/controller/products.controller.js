const { allProductsService,
  productsByIdService,
  editProductService,
  deleteProductService,
} = require('../service/products.service');

const getAllProductsController = async (_req, res, _next) => {
  try {
    const products = await allProductsService();
    return res.status(200).json(products);
  } catch (e) {
    throw new Error(e);
  }
};

const productByIdController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const productById = await productsByIdService(id);
    return res.status(200).json(productById);
  } catch (e) {
    throw new Error(e);
  }
};

const editProdController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { edit } = req.body;
    const editProduct = await editProductService(id, edit);
    return res.status(204).json(editProduct);
  } catch (e) {
    throw new Error(e);
  }
};

const delprodController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    await deleteProductService(id);
    return res.status(200).json({});
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getAllProductsController,
  productByIdController,
  editProdController,
  delprodController,
};

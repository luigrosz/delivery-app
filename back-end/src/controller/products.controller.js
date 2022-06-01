const { allProdutService,
  productsByIdService,
  editProductService,
  deleteProductService,
} = require('../service/produts.service');

const getAllProductsController = async (_req, res, _next) => {
  try {
    const products = await allProdutService();
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
    const { test, value } = req.body;
    const editProd = await editProductService(id, test, value);
    return res.status(204).json(editProd);
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

const { allProductsService,
  productsByIdService,
  editProductService,
  deleteProductService,
} = require('../service/products.service');

const getAllProductsController = async (_req, res, _next) => {
    const products = await allProductsService();
    return res.status(200).json(products);
};

const productByIdController = async (req, res, _next) => {
    const { id } = req.params;
    const productById = await productsByIdService(id);
    return res.status(200).json(productById);
};

const editProdController = async (req, res, _next) => {
    const { id } = req.params;
    const { edit } = req.body;
    const editProduct = await editProductService(id, edit);
    return res.status(204).json(editProduct);
};

const delprodController = async (req, res, _next) => {
    const { id } = req.params;
    await deleteProductService(id);
    return res.status(200).json({});
};

module.exports = {
  getAllProductsController,
  productByIdController,
  editProdController,
  delprodController,
};

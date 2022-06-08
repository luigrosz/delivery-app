const {
  postSaleService,
  getAllSalesService,
  getSaleByIdSellerService,
  getSaleByIdUserService } = require('../service/sale.service');

const getAllSalesController = async (_req, res, _next) => {
  try {
    const sales = await getAllSalesService();
    return res.status(200).json(sales);
  } catch (error) {
    throw new Error(error);
  }
};

const postSaleController = async (req, res, _next) => {
  try {
    const sale = await postSaleService(req.body, req.user);
    return res.status(201).json(sale);
  } catch (e) {
    throw new Error(e);
  }
};

const getSaleByIdUserController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sales = await getSaleByIdSellerService(id);
    if (sales === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sales);
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSellerController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sales = await getSaleByIdUserService(id);
    if (sales === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sales);
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSaleController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await getSaleByIdUserService(id);
    if (sale === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sale);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  postSaleController,
  getAllSalesController,
  getSaleByIdUserController,
  getSaleByIdSellerController,
  getSaleByIdSaleController,
};
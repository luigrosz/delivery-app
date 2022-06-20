const {
  postSaleService,
  getAllSalesService,
  getSaleByIdSellerService,
  getSaleByIdUserService } = require('../service/sale.service');

const getAllSalesController = async (_req, res, _next) => {
    const sales = await getAllSalesService();
    return res.status(200).json(sales);
};

const postSaleController = async (req, res, _next) => {
    const sale = await postSaleService(req.body, req.user);
    return res.status(201).json(sale);
};

const getSaleByIdUserController = async (req, res, _next) => {

    const { id } = req.params;
    const sales = await getSaleByIdSellerService(id);
    if (sales === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sales);
};

const getSaleByIdSellerController = async (req, res, _next) => {
    const { id } = req.params;
    const sales = await getSaleByIdUserService(id);
    if (sales === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sales);
};

module.exports = {
  postSaleController,
  getAllSalesController,
  getSaleByIdUserController,
  getSaleByIdSellerController,
};
const {
  getAllSalesService,
  getSaleByIdSellerService,
  getSaleByIdUserService,
  getSaleByIdSaleService, 
  updateSaleStatusByIdService, 
  createSaleAndAll } = require('../service/sale.service');

const getAllSalesController = async (_req, res, _next) => {
    const sales = await getAllSalesService();
    return res.status(200).json(sales);
};

const postSaleController = async (req, res, _next) => {
    const { deliveryAddress, deliveryNumber, products, sellerId, totalPrice } = req.body;
    const sale = await createSaleAndAll(
      { deliveryAddress, deliveryNumber, products, sellerId, totalPrice }, req.user,
    );
    return res.status(201).json(sale);
};

const getSaleByIdSellerController = async (req, res, _next) => {
    const { id } = req.params;
    const sales = await getSaleByIdSellerService(id);
    if (sales === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sales);
};

const getSaleByIdUserController = async (req, res, _next) => {
    const { id } = req.params;
    const sales = await getSaleByIdUserService(id);
    if (sales === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sales);
};

const getSaleByIdSaleController = async (req, res, _next) => {
    const { id } = req.params;
    const sale = await getSaleByIdSaleService(id);
    if (sale === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sale);
};

const updateSaleStatusByIdController = async (req, res, _next) => {
    const { id } = req.params;
    const { status } = req.body;
    const sale = await updateSaleStatusByIdService(id, status, req.user);
    if (!sale) {
      return res.status(401).json({ error: 'Customers cannot update sales.' });
    }
    return res.status(200).json(sale);
};

module.exports = {
  postSaleController,
  getAllSalesController,
  getSaleByIdUserController,
  getSaleByIdSellerController,
  getSaleByIdSaleController,
  updateSaleStatusByIdController,
};
const {
  getAllSalesService,
  getSaleByIdSellerService,
  getSaleByIdUserService,
  getSaleByIdSaleService, 
  updateSaleStatusByIdService, 
  createSaleAndAll } = require('../service/sale.service');

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
    const { deliveryAddress, deliveryNumber, products, sellerId, totalPrice } = req.body;
    const sale = await createSaleAndAll(
      { deliveryAddress, deliveryNumber, products, sellerId, totalPrice }, req.user,
    );
    return res.status(201).json(sale);
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

const getSaleByIdSaleController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await getSaleByIdSaleService(id);
    if (sale === null) {
      return res.status(200).json([]);
    }
    return res.status(200).json(sale);
  } catch (e) {
    throw new Error(e);
  }
};

const updateSaleStatusByIdController = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const { userId, sellerId, totalPrice,
       deliveryAddress, deliveryNumber, status } = req.body;
    const params = { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status };
    const sale = await updateSaleStatusByIdService(id, req.user, params);
    if (!sale) {
      return res.status(401).json({ error: 'Customers cannot update sales.' });
    }
    return res.status(200).json(sale);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  postSaleController,
  getAllSalesController,
  getSaleByIdUserController,
  getSaleByIdSellerController,
  getSaleByIdSaleController,
  updateSaleStatusByIdController,
};
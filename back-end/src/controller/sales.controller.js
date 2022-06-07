const postSaleService = require('../service/sale.service');

const postSaleController = async (req, res, _next) => {
  try {
    const sale = await postSaleService(req.body, req.user);
    return res.status(201).json(sale);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = postSaleController;
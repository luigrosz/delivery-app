const { QueryTypes } = require('sequelize');
const db = require('../database/models');
const { users, sales } = require('../database/models');
const { postSaleQuery,
  now,
  postSalesProductQuery,
  noChecks,
  userIdSnake,
  sellerIdSnake,
} = require('../helpers/dbHelper');

async function createSalesProductsInDb(productsArr, saleId) {
  const productsPromise = productsArr.map((product) => {
    const result = db.sequelize.query(postSalesProductQuery, {
      replacements: [product.id, saleId, product.quantity],
      type: QueryTypes.INSERT,
    });
    return result;
  });

  const result = await Promise.all(productsPromise);
  return result;
}

const postSaleService = async (params, user) => {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = params;
    const { email } = user;
    const { id } = await users.findOne({ where: { email } });

    await db.sequelize.query(noChecks, { type: QueryTypes.UPDATE });
    const saleQuery = await db.sequelize.query(postSaleQuery, {
      replacements: [id, sellerId, totalPrice, deliveryAddress, deliveryNumber, now],
      type: QueryTypes.INSERT,
    });

    const saleId = saleQuery[0];
    await createSalesProductsInDb(products, saleId);

    const result = {
      userId: id, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
    };
    return result;
};

const getAllSalesService = async () => {
    const saleObject = await sales.findAll();
    return saleObject;
};

const getSaleByIdSellerService = async (id) => {
    const saleObject = await sales.findOne({ where: { [sellerIdSnake]: id } });
    return saleObject;
};

const getSaleByIdUserService = async (id) => {
    const saleObject = await sales.findOne({ where: { [userIdSnake]: id } });
    return saleObject;
};

module.exports = {
  postSaleService,
  getAllSalesService,
  getSaleByIdUserService,
  getSaleByIdSellerService,
};
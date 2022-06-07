const md5 = require('md5');
const { QueryTypes } = require('sequelize');
const db = require('../database/models');
const { users, sales } = require('../database/models');
const { postSaleQuery, now, postSalesProductQuery, noChecks } = require('../helpers/dbHelper');

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
  try {
    const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = params;
    const { email, password } = user;
    const { id } = await users.findOne({ where: { email, password: md5(password) } });

    await db.sequelize.query(noChecks, { type: QueryTypes.UPDATE });
    const saleQuery = await db.sequelize.query(postSaleQuery, {
      replacements: [id, sellerId, totalPrice, deliveryAddress, deliveryNumber, now],
      type: QueryTypes.INSERT });

    const saleId = saleQuery[0];
    await createSalesProductsInDb(products, saleId);
    
    const result = {
      userId: id, sellerId, totalPrice, deliveryAddress, deliveryNumber, products,
    };
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllSalesService = async () => {
  try {
    const saleObject = await sales.findAll();
    return saleObject;
  } catch (error) {
    throw new Error(error);
  }
}

const getSaleByIdSellerService = async (id) => {
  try {
    const saleObject = await sales.findOne({ where : {seller_id: id } })
    return saleObject;
  } catch (error) {
    throw new Error(error);
  }
}

const getSaleByIdUserService = async (id) => {
  try {
    const saleObject = await sales.findOne({ where : {user_id: id } })
    return saleObject;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { postSaleService, getAllSalesService, getSaleByIdUserService, getSaleByIdSellerService };
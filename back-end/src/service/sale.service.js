const md5 = require('md5');
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

async function createSaleInDb(params, id) {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = params;
  await db.sequelize.query(noChecks, { type: QueryTypes.UPDATE });

  const saleQuery = await db.sequelize.query(postSaleQuery, {
    replacements: [id, sellerId, +totalPrice.replace(',', '.'),
      deliveryAddress, +deliveryNumber, now],
    type: QueryTypes.INSERT,
  });

  const result = {
    userId: id,
    saleId: saleQuery[0],
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    products,
  };
  return result;
}

const postSaleService = async (params, user) => {
  try {
    const { products } = params;
    const { email, password } = user;
    const { id } = await users.findOne({ where: { email, password: md5(password) } });

    const result = await createSaleInDb(params, id);
    await createSalesProductsInDb(products, result.saleId);

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
};

const getSaleByIdSellerService = async (id) => {
  try {
    const saleObject = await sales.findAll({ where: { [sellerIdSnake]: id } });
    return saleObject;
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdUserService = async (id) => {
  try {
    const saleObject = await sales.findAll({ where: { [userIdSnake]: id } });
    return saleObject;
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSaleService = async (id) => {
  try {
    const saleObject = await sales.findOne({ where: { id } });
    return saleObject;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  postSaleService,
  getAllSalesService,
  getSaleByIdUserService,
  getSaleByIdSellerService,
  getSaleByIdSaleService,
};
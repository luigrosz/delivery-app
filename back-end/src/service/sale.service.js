const md5 = require('md5');
const { QueryTypes } = require('sequelize');
const db = require('../database/models');
const { users, sales, products } = require('../database/models');
const { postSaleQuery,
  now,
  postSalesProductQuery,
  noChecks,
  userIdSnake,
  sellerIdSnake,
} = require('../helpers/dbHelper');

const mapProductsInSales = (obj) => {
  const { products: prodItems, ...saleItens } = obj.dataValues;
  console.log(obj.dataValues);
  const mappedProducts = prodItems.map((p) => {
    const { salesProducts, ...otherItens } = p.dataValues;
    const { quantity } = salesProducts.dataValues;
      return { ...otherItens, quantity };
    });
    return { ...saleItens, products: mappedProducts };
};

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
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, products: productsP } = params;
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
    productsP,
  };
  return result;
}

const postSaleService = async (params, user) => {
  try {
    const { products: productsP } = params;
    const { email, password } = user;
    const { id } = await users.findOne({ where: { email, password: md5(password) } });

    const result = await createSaleInDb(params, id);
    await createSalesProductsInDb(productsP, result.saleId);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllSalesService = async () => {
  try {
    const saleObject = await sales.findAll({ include:
      [{
        model: products,
        as: 'products',
      }] });
    const mappedSales = saleObject.map((sale) => mapProductsInSales(sale));
    return mappedSales;
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSellerService = async (id) => {
  try {
    const saleObject = await sales.findAll({ where: { [sellerIdSnake]: id },
      include: [{
      model: products,
      as: 'products',
    }] });
    const mappedSales = saleObject.map((sale) => mapProductsInSales(sale));
    return mappedSales;
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdUserService = async (id) => {
  try {
    const saleObject = await sales.findAll({ where: { [userIdSnake]: id },
      include: [{
        model: products,
        as: 'products',
      }],
    });
    const mappedSales = saleObject.map((sale) => mapProductsInSales(sale));
    return mappedSales;
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSaleService = async (id) => {
  try {
    const saleObject = await sales.findOne({ where: { id },
      include:
      [{
        model: products,
        as: 'products',
      }, { model: users,
        as: 'customer',
        attributes: ['name'],
      }, { model: users,
        as: 'seller',
        attributes: ['name'],
      }] });
    const remadeObj = mapProductsInSales(saleObject);
    return remadeObj;
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
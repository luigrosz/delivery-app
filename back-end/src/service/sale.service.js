const { users, sales, products, salesProducts } = require('../database/models');
const { userIdSnake, sellerIdSnake,
} = require('../helpers/dbHelper');

const createProductAssociation = async (itensSold, saleId) => {
  const promises = await itensSold.map(async (prod) => {
    await salesProducts.create({
      saleId,
      productId: prod.id,
      quantity: prod.quantity,
    });
  });
  Promise.all(promises);
};

const createSaleAndAll = async (sale, user) => {
  try {
    const { id } = await users.findOne({
      where: {
        email: user.email,
      },
    });
    const saleId = await sales.create({
      userId: id,
      ...sale,
      status: 'Pendente',
      products: sale.products,
    });
    await createProductAssociation(sale.products, saleId.id);
    return { saleId: saleId.id };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getProductsOfSale = async (saleId) => {
  const productsId = await salesProducts.findAll({ where: {
    saleId,
  },
  });
  const response = await productsId.map(async ({ productId, quantity }) => {
    const { id, name, price, urlImage } = await products.findOne({ where: { id: productId } });
    return { id, name, price, urlImage, quantity };
  });
  const fetchedProducts = await Promise.all(response);
  return fetchedProducts;
};

const filterSaleItens = (sale) => {
  const {
    id, customer, seller, totalPrice, deliveryAddress, deliveryNumber, status, saleDate,
  } = sale;
  return { id, customer, seller, totalPrice, deliveryAddress, deliveryNumber, status, saleDate };
};

const getAllSalesService = async () => {
  try {
    const allSales = await sales.findAll({ include:
      [{ model: users, as: 'customer', attributes: ['name'] },
      { model: users, as: 'seller', attributes: ['name'] }] });
    const promises = allSales.map(async (singleSales) => {
      const prod = await getProductsOfSale(singleSales.id);
      const filteredItens = filterSaleItens(singleSales);
      return { ...filteredItens, products: prod };
    });
    const builtSales = await Promise.all(promises);
    return builtSales;
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSellerService = async (id) => {
  try {
    const saleObject = await sales.findAll({ where: { [sellerIdSnake]: id },
      include: [{ model: users, as: 'customer', attributes: ['name'] },
      { model: users, as: 'seller', attributes: ['name'] }] });
    const prod = await getProductsOfSale(saleObject.id);
    const filteredItens = filterSaleItens(saleObject);
    return { ...filteredItens, products: prod };
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdUserService = async (id) => {
  try {
    const saleObject = await sales.findAll({ where: { [userIdSnake]: id },
      include: [{ model: users, as: 'customer', attributes: ['name'] },
      { model: users, as: 'seller', attributes: ['name'] }] });
    const prod = await getProductsOfSale(saleObject.id);
    const filteredItens = filterSaleItens(saleObject);
    return { ...filteredItens, products: prod };
  } catch (error) {
    throw new Error(error);
  }
};

const getSaleByIdSaleService = async (id) => {
  try {
    const saleObject = await sales.findOne({ where: { id },
      include: [{ model: users, as: 'customer', attributes: ['name'] },
      { model: users, as: 'seller', attributes: ['name'] }] });
    const prod = await getProductsOfSale(saleObject.id);
    const filteredItens = filterSaleItens(saleObject);
    return { ...filteredItens, products: prod };
  } catch (e) {
    throw new Error(e);
  }
};

const updateSaleStatusByIdService = async (id, user, status) => {
  try {
    const { email } = user;
    const getUser = await users.findOne({ where: { email } });
    if (getUser.role === 'customer') {
      return null;
    }
    const updatedSale = await sales.update({ status }, {
      where: { 
        id,
      },
    }); 
    return updatedSale;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllSalesService,
  getSaleByIdUserService,
  getSaleByIdSellerService,
  getSaleByIdSaleService,
  updateSaleStatusByIdService,
  createSaleAndAll,
};
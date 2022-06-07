// format time from JS to MYSQL      ** t.ly/l47N
const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

const userIdSnake = 'user_id';
const sellerIdSnake = 'seller_id';
const postSaleQuery = `INSERT INTO sales(
  user_id, seller_id, total_price, delivery_address, delivery_number, status, sale_date) 
  VALUES(?, ?, ?, ?, ?, 'Pendente', ?);`;

const postSalesProductQuery = `INSERT INTO salesProducts(product_id, sale_id, quantity)
VALUES(?, ?, ?);`;
const noChecks = 'SET FOREIGN_KEY_CHECKS=0;';

module.exports = {
  now,
  postSaleQuery,
  postSalesProductQuery,
  noChecks,
  userIdSnake,
  sellerIdSnake,
};
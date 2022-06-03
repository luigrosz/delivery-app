module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    url_image: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
  });
  
  return Products;
};
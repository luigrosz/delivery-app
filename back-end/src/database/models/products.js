module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
  });
  Products.associate = associations;
  
  return Products;
};
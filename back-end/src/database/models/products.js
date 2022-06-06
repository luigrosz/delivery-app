module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: {
      type: DataTypes.STRING,
      field: 'url_image'
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
  });
  
  return Products;
};
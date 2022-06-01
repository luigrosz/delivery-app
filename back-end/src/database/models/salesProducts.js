const associations = (models) => {
  models.salesProducts.belongsTo(
    models.products, {
      as: 'products',
      foreignKey: 'product_id',
    },
    models.sales, {
      as: 'sales',
      foreignKey: 'sale_id',
    },
  );
};

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'salesProducts',
    timestamps: false,
  });
  SalesProducts.associate = associations;
  
  return SalesProducts;
};
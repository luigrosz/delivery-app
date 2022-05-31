const associations = (models) => {
  models.SalesProducts.belongsTo(
    models.Products, {
      as: 'products',
      foreignKey: 'product_id',
    },
    models.Sales, {
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
  
  return Sales;
};
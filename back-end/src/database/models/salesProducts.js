const associations = (models) => {
  /* models.salesProducts.belongsTo(
    models.products, {
      as: 'products',
      foreignKey: 'product_id',
    },
    models.sales, {
      as: 'sales',
      foreignKey: 'sale_id',
    },
  ); */
  models.products.belongsToMany(
    models.sales, {
      as: 'sales',
      through: models.salesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    },
  );
  models.sales.belongsToMany(
    models.products, {
      as: 'products',
      through: models.salesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    },
  );
};

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      references: { model: 'sales', key: 'id' },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: { model: 'products', key: 'id' },
    },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'salesProducts',
    tableName: 'sales_products',
    underscored: true,
    timestamps: false,
  });
  SalesProducts.associate = associations;
  
  return SalesProducts;
};
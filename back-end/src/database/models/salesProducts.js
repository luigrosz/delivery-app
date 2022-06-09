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
      through: 'salesProducts',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    },
  );
  models.sales.belongsToMany(
    models.products, {
      as: 'products',
      through: 'salesProducts',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
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
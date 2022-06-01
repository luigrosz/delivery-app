const associations = (models) => {
  models.sales.belongsTo(
    models.users, {
      as: 'users',
      foreignKey: 'user_id',
    },
    models.users, {
      as: 'users',
      foreignKey: 'seller_id',
    },
  );
};

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    tableName: 'sales',
    timestamps: false,
  });
  Sales.associate = associations;
  
  return Sales;
};
const associations = (models) => {
  models.sales.belongsTo(
    models.users, {
      as: 'customer',
      foreignKey: 'userId',
    }
  );
  models.sales.belongsTo(
    models.users, {
      as: 'seller',
      foreignKey: 'sellerId',
    },
  );
};

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    userId: { type: DataTypes.INTEGER, foreignKey: true},
    sellerId: { type: DataTypes.INTEGER, foreignKey: true},
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
    underscored: true,
    timestamps: false,
  });
  Sales.associate = associations;
  return Sales;
};
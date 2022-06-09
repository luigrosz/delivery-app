const associations = (models) => {
  models.sales.belongsTo(
    models.users, {
      as: 'customer',
      foreignKey: 'user_id',
    }
  );
  models.sales.belongsTo(
    models.users, {
      as: 'seller',
      foreignKey: 'seller_id',
    },
  );
};

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    total_price: DataTypes.DECIMAL(9,2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    status: DataTypes.STRING,
    sale_date: {
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
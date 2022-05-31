const emailConstraints = (DataTypes) => ({
  type: DataTypes.STRING,
  allowNull: {
    args: false,
    msg: '"email" is required',
  },
  unique: {
    name: 'email',
  },
  validate: {
    isEmail: {
      args: true,
      msg: '"email" must be a valid email',
    },
  },
});

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: emailConstraints(DataTypes),
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });
  return Users;
}
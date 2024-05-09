module.exports = (sequelize, DataTypes) => {
  const newCustomer = sequelize.define("new_customer", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
  return newCustomer;
}
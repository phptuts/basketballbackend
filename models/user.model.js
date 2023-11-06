const { DataTypes } = require("sequelize");

function createUserModel(sequelize) {
  const UserModel = sequelize.define("users", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return UserModel;
}

module.exports = createUserModel;

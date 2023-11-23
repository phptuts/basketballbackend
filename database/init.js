const { Sequelize } = require("sequelize");
const createUserModel = require("../models/user.model");
const createGameModel = require("../models/game.model");

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
const UserModel = createUserModel(sequelize);
const GameModel = createGameModel(sequelize);
UserModel.hasMany(GameModel);
GameModel.belongsTo(UserModel);
module.exports = { sequelize, UserModel, GameModel };

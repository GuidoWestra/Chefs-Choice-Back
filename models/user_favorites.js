"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class user_favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_favorites.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      user_favorites.belongsTo(models.recipe, {
        foreignKey: "recipe_id",
      });
    }
  }
  user_favorites.init(
    {
      user_id: DataTypes.INTEGER,
      recipe_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_favorites",
    }
  );
  return user_favorites;
};

module.exports = (sequelize) => {
  const { DataTypes, Model } = require("sequelize");

  class Ingredient extends Model {}
  Ingredient.init(
    {
      name: DataTypes.STRING,
    },
    { sequelize, modelName: "ingredient", timestamps: false }
  );

  return Ingredient;
};

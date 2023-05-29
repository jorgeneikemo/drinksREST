module.exports = (sequelize) => {
  const { DataTypes, Model } = require("sequelize");

  class CocktailIngredient extends Model {}

  CocktailIngredient.init(
    {
      quantity: DataTypes.STRING,
    },
    { sequelize, modelName: "cocktailIngredient", timestamps: false }
  );

  return CocktailIngredient;
};

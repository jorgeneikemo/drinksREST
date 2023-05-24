module.exports = (sequelize) => {
    const { DataTypes, Model } = require('sequelize');

    class Cocktail extends Model {}
    Cocktail.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, { sequelize, modelName: 'cocktail', timestamps: false });

    return Cocktail;
};
require("dotenv").config();
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with the provided database name, admin username, and password
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

// Authenticate the Sequelize instance by establishing a connection to the database
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const Cocktail = require("./cocktail")(sequelize);
const Ingredient = require("./ingredient")(sequelize);
const CocktailIngredient = require("./cocktailIngredient")(sequelize);

// Define the associations between models
Cocktail.belongsToMany(Ingredient, {
  through: CocktailIngredient,
  as: "ingredients",
});
Ingredient.belongsToMany(Cocktail, {
  through: CocktailIngredient,
  as: "cocktails",
});

// Synchronize the models with the database
sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { sequelize, Cocktail, Ingredient, CocktailIngredient };

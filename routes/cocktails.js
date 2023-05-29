var express = require('express');
var router = express.Router();
const { Cocktail, Ingredient } = require('../models');
const {sequelize} = require('../models');
const { Op } = require('sequelize');
const cocktail = require('../models/cocktail');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Function for pagination.
const getPagination = (page, size) => {
    let limit = size ? Number(size) : null;
    let offset = null;

    if (page && limit) {
        offset = Number(page - 1) * limit;
    }

    let pagination = {}; //Return empty if no size and limit provided.
    if (limit !== null) pagination.limit = limit;
    if (offset !== null) pagination.offset = offset;
    
    return pagination;
};

// Get the cocktails
router.get('/', async (req, res, next) => {
    let whereVar = {};
    const { name, ingredients } = req.query;
    let page = req.query.page ? Number(req.query.page) : null;
    let size = req.query.size ? Number(req.query.size) : null;
    
    if (name) {
        whereVar.name = { [Op.like]: `%${name}%` };
    }

    if (ingredients) {
        const cocktailsWithIngredient = await Cocktail.findAll({
            include: {
                model: Ingredient,
                where: { name: { [Op.like]: `%${ingredients}%` } },
                as: 'ingredients',
            },
        });

        const cocktailIds = cocktailsWithIngredient.map(cocktail => cocktail.id);
        whereVar.id = { [Op.in]: cocktailIds };
    }

    const pagination = getPagination(page, size);

    //Get cocktails based on the queries provided.
    let cocktails = await Cocktail.findAll({
        where: whereVar,
        include: 'ingredients',
        limit: pagination.limit,
        offset: pagination.offset
    });
    console.log(pagination)

    res.json(cocktails);
});

router.get('/:id', async (req, res, next) =>{
    let cocktail = await Cocktail.findOne({
        where: {id: req.params.id},
        include: 'ingredients',
    });

    res.json(cocktail);
});

router.post('/', async (req, res, next) => {
    try {
        const { name, description, img, ingredients } = req.body;
        const t = await sequelize.transaction();

        // Create the cocktail
        const newCocktail = await Cocktail.create({
            name,
            description,
            img,
        }, { transaction: t });

        // Add each ingredient
        for (const ingredient of ingredients) {
            let ingredientInstance;

            // If the ingredient does not have an id, check if an ingredient with the same name exists
            if (!ingredient.id) {
                ingredientInstance = await Ingredient.findOne({
                    where: { name: ingredient.name }
                });

                // If an ingredient with the same name does not exist, create a new one
                if (!ingredientInstance) {
                    ingredientInstance = await Ingredient.create({
                        name: ingredient.name,
                    }, { transaction: t });
                }
            } else {
                ingredientInstance = await Ingredient.findByPk(ingredient.id, { transaction: t });
                if (!ingredientInstance) {
                    throw new Error(`Ingredient with ID ${ingredient.id} not found`);
                }
            }

            // Create associations
            await newCocktail.addIngredient(ingredientInstance, {
                through: {
                    quantity: ingredient.cocktailIngredient.quantity,
                },
                transaction: t,
            });
        }

        // Commit
        await t.commit();
        //Return the new cocktail
        res.status(201).json(newCocktail);
    //Catch any eventual errors.
    } catch (error) {
        next(error);
    }
});

//Delete a cocktail by id
router.delete('/:id', async (req, res, next) => {
    try {
        //Get thee provided ID and attempt to delete the cocktail.
        const id = req.params.id;
        const deletedRows = await Cocktail.destroy({
            where: {
                id: id
            }
        });

        //Check if deleted or not
        if (deletedRows) {
            res.status(200).send({ message: `Cocktail with id ${id} deleted successfully.` });
        } else {
            res.status(404).send({ message: `Cocktail with id ${id} not found.` });
        }
    //Catch any eventual errors.
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { name, description, img, ingredients } = req.body;
        const id = req.params.id;

        // Find the cocktail to update
        const cocktail = await Cocktail.findByPk(id, {
            include: 'ingredients'
        });
        //If no cocktail by id. Throw an error.
        if (!cocktail) {
            return res.status(404).send({ message: `Cocktail with id ${id} not found.` });
        }

        // Begin transaction
        const t = await sequelize.transaction();

        // Update the cocktail
        if (name) cocktail.name = name;
        if (description) cocktail.description = description;
        if (img) cocktail.img = img;

        await cocktail.save({ transaction: t });

        // If new ingredients were provided
        if (ingredients) {
            // Remove associations
            await cocktail.setIngredients([], { transaction: t });
    
            // Add new ingredients
            for (const ingredient of ingredients) {
                let ingredientInstance;
                //If the ingredient does not have an id check if an ingredient with the same name exists.
                if (!ingredient.id) {
                    ingredientInstance = await Ingredient.findOne({
                        where: { name: ingredient.name }
                    });
                    //If no ingredient has the same name: create it.
                    if (!ingredientInstance) {
                        ingredientInstance = await Ingredient.create({
                            name: ingredient.name,
                        }, { transaction: t });
                    }
                } else {
                    ingredientInstance = await Ingredient.findByPk(ingredient.id, { transaction: t });
                    if (!ingredientInstance) {
                        throw new Error(`Ingredient with ID ${ingredient.id} not found`);
                    }
                }
    
                // Add associations
                await cocktail.addIngredient(ingredientInstance, {
                    through: {
                        quantity: ingredient.cocktailIngredient.quantity,
                    },
                    transaction: t,
                });
            }
        }

        // Commit the transaction
        await t.commit();

        // Return the updated cocktail
        res.status(200).json(cocktail);
    //Catch any eventual errors.
    } catch (error) {
        if (t) {
            await t.rollback();
        }
        next(error);
    }
});

module.exports = router;
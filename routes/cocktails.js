var express = require('express');
var router = express.Router();
const { Cocktail, Ingredient } = require('../models');
const {sequelize} = require('../models');
const { Op } = require('sequelize');
const cocktail = require('../models/cocktail');

//Function for pagination. Defaults to 5 returned cocktails if no size if entered.
const getPagination = (page, size) => {
    const limit = size ? Number(size) : 5;
    const offset = page ? Number(page - 1) * limit : 0;
    return { limit, offset };
};

//Get the cocktails
router.get('/', async (req, res, next) => {
    let whereVar = {};
    const { name, ingredients } = req.query; 
    //Check that there is pagination. If none provided set to null.
    let page = req.query.page ? Number(req.query.page) : null;
    let size = req.query.size ? Number(req.query.size) : null;
    
    //Query by name
    if (name) {
        whereVar.name = { [Op.like]: `%${name}%` };
    }

    //Query by ingredient
    if (ingredients) {
        const cocktailsWithIngredient = await Cocktail.findAll({
            include: {
                model: Ingredient,
                where: { name: { [Op.like]: `%${ingredients}%` } },
                as: 'ingredients',
            },
        });

        // get just the IDs of the cocktails with the specified ingredient
        const cocktailIds = cocktailsWithIngredient.map(cocktail => cocktail.id);

        // update whereVar to only include these cocktails
        whereVar.id = { [Op.in]: cocktailIds };
    }

    const pagination = getPagination(page, size);

    //Get cocktails based on the queries provided.
    let cocktails = await Cocktail.findAll({
        where: whereVar,
        include: 'ingredients',
        limit: pagination.limit,
        offset: pagination.offset,
    });

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
        const { name, description, ingredients } = req.body;
        const t = await sequelize.transaction();

        // Create the cocktail
        const newCocktail = await Cocktail.create({
            name,
            description,
        }, { transaction: t });

        // Add each ingredient
        for (const ingredient of ingredients) {
            let ingredientInstance;

            // Check if the ingreedient already exists. If it doesnt create it.
            if (ingredient.id) {
                ingredientInstance = await Ingredient.findByPk(ingredient.id, { transaction: t });
                if (!ingredientInstance) {
                    throw new Error(`Ingredient with ID ${ingredient.id} not found`);
                }
            } else {
                ingredientInstance = await Ingredient.create({
                    name: ingredient.name,
                }, { transaction: t });
            }

            // Associations
            await newCocktail.addIngredient(ingredientInstance, {
                through: {
                    quantity: ingredient.cocktailIngredient.quantity,
                },
                transaction: t,
            });
        }

        // Commit
        await t.commit();

        res.status(201).json(newCocktail);
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

    } catch (error) {
        next(error);
    }
});

router.put('/:id', (req, res, next) =>{

});

module.exports = router;
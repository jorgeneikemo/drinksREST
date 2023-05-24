var express = require('express');
var router = express.Router();
const { Cocktail, Ingredient } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
    const { name, ingredients } = req.query;
    
    let whereVar = {};
    let includeVar = 'ingredients';

    if (name) {
        whereVar.name = name;
    }

    if (ingredients) {
        const ingredientList = ingredients.split(',');
        const cocktailsWithIngredient = await Cocktail.findAll({
            include: {
                model: Ingredient,
                where: { name: { [Op.in]: ingredientList } },
                as: 'ingredients',
            },
        });

        // get just the IDs of the cocktails with the specified ingredient
        const cocktailIds = cocktailsWithIngredient.map(cocktail => cocktail.id);

        // update whereVar to only include these cocktails
        whereVar.id = { [Op.in]: cocktailIds };
    }

    let cocktails = await Cocktail.findAll({
        where: whereVar,
        include: includeVar,
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

router.post('/', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

module.exports = router;
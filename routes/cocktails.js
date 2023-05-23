var client = require('../redis.js');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const EXPIRATION= 3600;

async function cache(req, res, next) {
  const data = await client.get('cocktails');
  if (data !== null) {
    res.json(JSON.parse(data));
  } else {
    next();
  }
}

router.get('/', cache, async (req, res) => {
  // Read the cocktails data from the JSON file
  fs.readFile('./data/cocktails.json', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read cocktail data' });
    }

    const { name, ingredients } = req.query;
    const cocktails = JSON.parse(data).cocktails;
    client.setEx("cocktails", EXPIRATION, JSON.stringify(cocktails));

    // Filter cocktails based on query parameters
    let filteredCocktails = cocktails;

    if (name) {
      filteredCocktails = filteredCocktails.filter(
        cocktail => cocktail.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (ingredients) {
      const requestedIngredients = ingredients
        .split(',')
        .map(ingredient => ingredient.trim().toLowerCase());
      filteredCocktails = filteredCocktails.filter(cocktail =>
        cocktail.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(requestedIngredients)
        )
      );
    }

    // Set headers and send JSON response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
    res.json(filteredCocktails);
  });
});

router.get('/:id', (req, res) => {
  // Read the cocktails data from the JSON file
  fs.readFile('./data/cocktails.json', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read cocktail data' });
    }

    const id = Number(req.params.id);
    const cocktails = JSON.parse(data).cocktails;
    const cocktail = cocktails.find(cocktail => cocktail.id === id);

    if (cocktail) {
      res.json(cocktail);
    } else {
      res.status(404).json({ error: 'Cocktail not found' });
    }
  });
});

router.post('/', (req, res) => {
    const { name, ingredients, description } = req.body;
  
    // Check if all fields are provided
    if (!name || !ingredients || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Read the cocktails data from the JSON file
    fs.readFile('./data/cocktails.json', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read cocktail data' });
      }
  
      const cocktails = JSON.parse(data).cocktails;
  
      // Generate a new ID by finding the maximum ID in the existing cocktails and incrementing it
      const newCocktailId = cocktails.reduce((maxId, cocktail) => (cocktail.id > maxId ? cocktail.id : maxId), 0) + 1;
  
      // Create a new cocktail object
      const newCocktail = {
        id: newCocktailId,
        name,
        ingredients,
        description,
      };
  
      // Add the new cocktail to the array
      cocktails.push(newCocktail);
  
      // Write the updated cocktails data back to the JSON file
      fs.writeFile('./data/cocktails.json', JSON.stringify({ cocktails }), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to save the cocktail' });
        }
  
        // Return the newly created cocktail
        res.status(201).json(newCocktail);
      });
    });
  });

  module.exports = router;
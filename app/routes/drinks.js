const express = require('express');
const Router = express.Router();
const {newDrink, editDrink, readDrink, deleteDrink, queryDrinks, allDrinks} = require('../controllers/drinks');

/* middleware for check ingredients */
const ingredientExist = require('../middleware/ingredientExist');

Router.get('/search', ingredientExist, queryDrinks);
Router.post('/',ingredientExist, newDrink);
Router.patch('/', ingredientExist, editDrink);
Router.get('/', readDrink);
Router.get('/list', allDrinks);
Router.delete('/', deleteDrink);

module.exports= Router;
const express = require('express');
const Router = express.Router();
const {newDrink, editDrink, readDrink, deleteDrink} = require('../controllers/drinks');

/* middleware for check ingredients */
const ingredientExist = require('../middleware/ingredientExist');

Router.post('/',ingredientExist, newDrink);
Router.patch('/', ingredientExist, editDrink);
Router.get('/', ingredientExist, readDrink);
Router.delete('/', deleteDrink);

module.exports= Router;
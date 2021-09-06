const express = require('express');
const Router = express.Router();
const {newDrink, editDrink, readDrink, deleteDrink, queryDrinks, allDrinks} = require('../controllers/drinks');

/* middleware for check if a user can edit or make new drinks */
const jwtAuth = require('../middleware/jwtAuth');

/* middleware for check ingredients */
const ingredientExist = require('../middleware/ingredientExist');
const drinkExist = require('../middleware/drinkExist');

/* public */
Router.get('/search', ingredientExist, queryDrinks);
Router.get('/', drinkExist, readDrink);
Router.get('/list', allDrinks);
/* private */
Router.post('/', jwtAuth.authenticate('jwt',{session: false}), ingredientExist, newDrink);
Router.patch('/', jwtAuth.authenticate('jwt',{session: false}), ingredientExist, drinkExist, editDrink);
Router.delete('/', jwtAuth.authenticate('jwt',{session: false}) , drinkExist, deleteDrink);

module.exports= Router;
const express = require('express');
const Router = express.Router();
const {newIngredient, editIngredient, readIngredient, deleteIngredient, ingredientsList} = require('../controllers/ingredients');
const ingredientExist = require('../middleware/ingredientExist');

/* middleware for check if a user can edit or make new ingredients */
const jwtAuth = require('../middleware/jwtAuth');

/* public */
Router.get('/list', ingredientsList);
/* private */
Router.get('/', jwtAuth.authenticate('jwt',{session: false}), ingredientExist, readIngredient);
Router.post('/', jwtAuth.authenticate('jwt',{session: false}), newIngredient);
Router.patch('/', jwtAuth.authenticate('jwt',{session: false}), ingredientExist, editIngredient);
Router.delete('/', jwtAuth.authenticate('jwt',{session: false}), ingredientExist, deleteIngredient);

module.exports= Router;
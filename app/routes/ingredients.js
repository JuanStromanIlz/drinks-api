const express = require('express');
const Router = express.Router();
const {newIngredient, editIngredient, readIngredient, deleteIngredient, ingredientsList} = require('../controllers/ingredients');

/* Ingredients Routes */
Router.post('/', newIngredient);
Router.patch('/', editIngredient);
Router.get('/', readIngredient);
Router.get('/list', ingredientsList);
Router.delete('/', deleteIngredient);

module.exports= Router;
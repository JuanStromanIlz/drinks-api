const express = require('express');
const Router = express.Router();
const {newIngredient, editIngredient, readIngredient, deleteIngredient} = require('../controllers/ingredients');

/* Ingredients Routes */
Router.post('/', newIngredient);
Router.patch('/', editIngredient);
Router.get('/', readIngredient);
Router.delete('/', deleteIngredient);

module.exports= Router;
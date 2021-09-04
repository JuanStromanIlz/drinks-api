const express = require('express');
const Router = express.Router();
const {newIngredient, editIngredient, readIngredient, deleteIngredient, ingredientsList} = require('../controllers/ingredients');

/* middleware for check if a user can edit or make new ingredients */
const jwtAuth = require('../middleware/jwtAuth');

/* public */
Router.get('/list', ingredientsList);
/* private */
Router.get('/', jwtAuth.authenticate('jwt',{session: false}), readIngredient);
Router.post('/', jwtAuth.authenticate('jwt',{session: false}), newIngredient);
Router.patch('/', jwtAuth.authenticate('jwt',{session: false}), editIngredient);
Router.delete('/', jwtAuth.authenticate('jwt',{session: false}), deleteIngredient);

module.exports= Router;
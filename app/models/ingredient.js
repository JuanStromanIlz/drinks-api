const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  listedName: String,
  listedPrice: Boolean
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports= Ingredient;
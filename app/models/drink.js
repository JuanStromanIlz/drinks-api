const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  ingredients: Array,
  image: String
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports= Drink;
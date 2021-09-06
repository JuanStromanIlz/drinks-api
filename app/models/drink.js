const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  ingredients: {
    type: Array,
    required: true
  }
}, { timestamps: true });

const Drink = mongoose.model('Drink', drinkSchema);

module.exports= Drink;
const Ingredient = require('../models/ingredient');
const axios = require('axios');

/* create a new ingredient */
async function newIngredient(req, res) {
  const {name, listedName, listedPrice} = req.body;
  try {
    let newIngredient = {
      name: name,
      listedName: listedName,
      listedPrice: listedPrice
    };
    let ingredient = await Ingredient.create(newIngredient);
    if (ingredient) {
      res.json({message: 'Ingrediente creado con exito'});
    }
  } catch(err) {
    res.json({error: err});
  }
}

/* edit a ingredient */
async function editIngredient(req, res) {
  const {i} = req.query;
  const {name, listedName, listedPrice} = req.body;
  const editBody = {
    name: name,
    listedName: listedName,
    listedPrice: listedPrice
  }
  try {
    let ingredientUpdate = await Ingredient.updateOne({name: i}, {...editBody});
    if (ingredientUpdate) {
      res.json({message: 'Ingrediente editado con exito'});
    }
  } catch(err) {
    res.json({error: err});
  }
}

/* read single ingredient */
async function readIngredient(req, res) {
  const {i} = req.query;
  try {
    let ingredient = await Ingredient.findOne({name: i});
    res.json(ingredient);
  } catch(err) {
    res.json({error: err});
  }
}

/* read all ingredients */
async function ingredientsList(req, res) {
  try {
    let ingredients = await Ingredient.find({});
    ingredients = ingredients.map(item => item.name);
    res.json(ingredients);
  } catch(err) {
    res.json({error: err});
  }
}

/* get ingredient price on mercardo libre */
async function getIngredientPrice(ingredient) {
  let finalPrice = 0;
  let itemInDb = await Ingredient.findOne({name: ingredient});
  if (itemInDb.listedPrice === true) {
    let res = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${itemInDb.listedName}`, {
      headers: { 
        Authorization: `Bearer ${process.env.MELI_TOKEN}` 
      }
    });
    if (res.status === 200) {
      finalPrice = res.data.results[0].price;
      return finalPrice;
    } else {
      return finalPrice;
    }
  } else {
    return;
  }
}

/* delete a ingredient by name */
async function deleteIngredient(req, res) {
  const {i} = req.query;
  try {
    if (Array.isArray(i)) {
      let promisesDelete = i.map(async name => await Ingredient.deleteOne({name: name}));
      await Promise.all(promisesDelete);
      res.json({message: 'ingredientes eliminados'});
    } else {
      await Ingredient.deleteOne({name: i})
      .then(()=>{
        res.json({message: 'ingrediente eliminado'});
      });
    }
  } catch(err) {
    res.json({error: err});
  }
}

module.exports= {newIngredient, 
  editIngredient,
  readIngredient, 
  ingredientsList, 
  deleteIngredient,
  getIngredientPrice
};
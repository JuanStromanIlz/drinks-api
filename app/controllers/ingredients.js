const Ingredient = require('../models/ingredient');

/* create a new ingredient */
async function newIngredient(req, res) {
  const {name, listedName, listedPrice, image} = req.body;
  try {
    let newIngredient = {
      name: name,
      listedName: listedName,
      listedPrice: listedPrice,
      image: image,
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
  const {name, listedName, listedPrice, image} = req.body;
  const editBody = {
    name: name,
    listedName: listedName,
    listedPrice: listedPrice,
    image: image
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

/* read all ingredients */
async function readIngredient(req, res) {
  try {
    let ingredients = await Ingredient.find({});
    ingredients = ingredients.map(item => item.name);
    res.json(ingredients);
  } catch(err) {
    res.json({error: err});
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

module.exports= {newIngredient, editIngredient, readIngredient, deleteIngredient};
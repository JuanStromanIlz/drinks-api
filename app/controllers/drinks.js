const Drink = require('../models/drink');
const { getIngredientPrice } = require('./ingredients');

/* create a new drink */
async function newDrink(req, res) {
  const {name, description, ingredients} = req.body;
  try {
    let newDrink = {
      name: name,
      description: description,
      ingredients: ingredients
    };
    let drink = await Drink.create(newDrink);
    if (drink) {
      res.json({message: 'Trago creado con exito'});
    }
  } catch(err) {
    res.json({error: err});
  }
}

/* edit existing drink */
async function editDrink(req, res) {
  const {drink} = req.query;
  const {name, description, ingredients} = req.body;
  const editBody = {
    name: name,
    description: description,
    ingredients: ingredients
  }
  try {
    let drinkUpdate = await Drink.updateOne({name: drink}, {...editBody});
    if (drinkUpdate) {
      res.json({message: 'trago editado con exito'});
    }
  } catch(err) {
    res.json({error: err});
  }
}

/* get prices of each drink */
async function drinksPrices(drinks) {
  let drinksWithPrice = drinks.map(async drink => {
    let ingredientsInDrink = await drink.ingredients.map(async (ingredient, index) => {
      let price = await getIngredientPrice(ingredient);
      return {
        name: ingredient,
        price: price
      }
    });
    ingredientsInDrink = await Promise.all(ingredientsInDrink);
    /* get final price */
    let finalPrice = ingredientsInDrink.map(item => item.price > 0 && item.price).reduce((a, b)=> a + b);
    let listIngredients = ingredientsInDrink.reduce((obj, item) => Object.assign(obj, { [item.name]: item.price }), {});
    return {
      name: drink.name,
      description: drink.description,
      ingredients: drink.ingredients,
      price: {
        final: finalPrice,
        ...listIngredients
      }
    }
  });
  drinksWithPrice = await Promise.all(drinksWithPrice);
  return drinksWithPrice;
}

/* get a drink by name */
async function readDrink(req, res) {
  const {d} = req.query;
  try {
    let drink = await Drink.find({name: d});
    if (drink.length > 0) {
      drink = await drinksPrices(drink);
      res.json(drink);
    } else {
      res.json({message: 'No existe un trago bajo ese nombre'});
    }
  } catch(err) {
    res.json({error: err});
  }
}

/* get all drinks */
async function allDrinks(req, res) {
  try {
    let drinks = await Drink.find({});
    if (drinks.length > 0) {
      drinks = await drinksPrices(drinks);
      res.json(drinks);
    } else {
      res.json({message: 'No existe un trago bajo ese nombre'});
    }
  } catch(err) {
    res.json({error: err});
  }
}

/* get drinks by query */
async function queryDrinks(req, res) {
  const {i} = req.query;
  /* if there're two or more ingredients in query */
  if (Array.isArray(i)) {
    let searchQuery = i.map(item => ({ingredients: item}));
    let drinks = await Drink.find({$and: [...searchQuery]});
    drinks = await drinksPrices(drinks);
    res.json(drinks);
  } else {
    /* if there'is only one ingredient in query */
    let drinks = await Drink.find({ingredients: i});
    if (!drinks.length > 0) {
      res.json({message: 'No existen tragos con estos ingredientes'});
    } else {
      drinks = await drinksPrices(drinks);
      res.json(drinks);
    }
  }
}

/* delete a drink */
async function deleteDrink(req, res) {
  const {d} = req.query;
  try {
    if (Array.isArray(d)) {
      let promisesDelete = d.map(async name => await Drink.deleteOne({name: name}));
      await Promise.all(promisesDelete);
      res.json({message: 'Tragos eliminados'});
    } else {
      await Drink.deleteOne({name: d})
      .then(()=>{
        res.json({message: 'Trago eliminado'});
      });
    }
  } catch(err) {
    res.json({error: err});
  }
}

module.exports = {newDrink,
  editDrink,
  readDrink,
  allDrinks,
  queryDrinks,
  deleteDrink
};
const Drink = require('../models/drink');

/* create a new drink */
async function newDrink(req, res) {
  const {name, description, ingredients, image} = req.body;
  try {
    let newDrink = {
      name: name,
      description: description,
      ingredients: ingredients,
      image: image,
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
  const {name, description, ingredients, image} = req.body;
  const editBody = {
    name: name,
    description: description,
    ingredients: ingredients,
    image: image
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

/* get a drink */
async function readDrink(req, res) {
  const {d} = req.query;
  try {
    let drink = await Drink.find({name: d});
    if (drink.length > 0) {
      drink = drink[0]
      let sendDrink = {
        name: drink.name,
        description: drink.description,
        ingredients: drink.ingredients,
        image: drink.image
      }
      res.json(sendDrink);
    } else {
      res.json({message: 'No existe un trago bajo ese nombre'});
    }
  } catch(err) {
    res.json({error: err});
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
      await Drink.deleteOne({name: i})
      .then(()=>{
        res.json({message: 'Trago eliminado'});
      });
    }
  } catch(err) {
    res.json({error: err});
  }
}

module.exports = {newDrink, editDrink, readDrink, deleteDrink};
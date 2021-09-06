const Drink = require('../models/drink');

async function drinkExist(req, res, next) {
  const {d} = req.query;
  try {
    let drink = await Drink.exists({name: d});
    if (!drink) {
      res.json({message: 'No existe un trago bajo ese nombre.'});
    } else {
      next();
    }
  } catch(err) {
    res.json({error: err});
  }
}

module.exports= drinkExist;
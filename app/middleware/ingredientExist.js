const Ingredient = require('../models/ingredient');

/* check if the ingredients for a drink exists */
async function ingredientExist(req, res, next) {
  const {ingredients} = req.body;
  const {i} = req.query;
  try {
    let notFoud = false;
    let itemsNotFound = [];
    /* check if ingredients was send via params */
    if (ingredients) {
      let itemPromises = await ingredients.map(async item => {
        let promise = await Ingredient.exists({ name: item });
        return promise;
      });
      let promises = await Promise.all(itemPromises);
      promises.filter((item, index) => {
        if (item === false) {
          notFoud = true;
          itemsNotFound.push(ingredients[index]);
        }
      });
      /* if one or more ingredients not match the DB function return a array with the items */
      if (notFoud) {
        res.json({
          message: 'Los siguientes ingredientes no existen:',
          ingredients: [...itemsNotFound]
        });
      } else {
        next();
      }
    }
    /* check if ingredients was send via params */
    else if (i) {
      if (Array.isArray(i)) {
        let itemPromises = i.map(async item => {
          let promise = await Ingredient.exists({ name: item });
          return promise;
        });
        let promises = await Promise.all(itemPromises);
        promises.filter((item, index) => {
          if (item === false) {
            notFoud = true;
            itemsNotFound.push(i[index]);
          }
        });
        /* if one or more ingredients not match the DB function return a array with the items */
        if (notFoud) {
          res.json({
            message: 'Los siguientes ingredientes no existen:',
            ingredients: [...itemsNotFound]
          });
        } else {
          next();
        }
      } else {
        let searchItem = await Ingredient.exists({name: i});
        if (!searchItem) {
          notFoud = true;
          itemsNotFound.push(i);
          res.json({
            message: 'Los siguientes ingredientes no existen:',
            ingredients: [...itemsNotFound]
          });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  } catch(err) {
    res.json({error: err});
  }
}

module.exports= ingredientExist;
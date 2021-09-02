require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({extended: false, limit: '20mb'}));

/* Mongoose setUp */
const mongoose = require('mongoose');

mongoose.connect(process.env.DB)
.then(() => {
  console.log('Connected to the database!');
})
.catch(err => {
  console.log('Cannot connect to the database!', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({message: "app up"});
});

/* Routes import */

/* ingredients */
const ingredientsRoutes = require('./app/routes/ingredients');
app.use('/ingredients', ingredientsRoutes);

/* drinks */
const drinksRoutes = require('./app/routes/drinks');
app.use('/drinks', drinksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})
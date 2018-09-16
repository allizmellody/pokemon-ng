const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon');
const { getConnect } = require('./config/index');
const { pokemons } = require('../pokemons.json');

mongoose.connect(getConnect(), { useNewUrlParser: true })
  .then(() => console.log('Mongo boy is alive'))
  .then(() => {
    mongoose.connection.dropDatabase();
    console.log('Feeeeeed me!');
  })
  .then(() => {
    Pokemon.collection.insertMany(pokemons)
      .then(() => {
        console.log('Yami!');
        mongoose.connection.close();
      })
      .catch((error) => console.log(error))
  })
  .catch((error) => console.log(error));

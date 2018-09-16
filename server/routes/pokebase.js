const router = require('express').Router();
const bodyParser = require('body-parser');

const Pokemon = require('../models/pokemon');
const User = require('../models/user');
const checkToken = require('../config/checkToken');

router.use(bodyParser.json());

router.get('/?', async (req, res) => {
  const { page, limit } = req.query;
  const pokemons = await Pokemon
  .find()
  .skip((limit * page) - limit)
  .limit(Number(limit));
  res.status(200).send(pokemons);
});

router.get('/:pokename', async (req, res) => {
  try {
    const pokemon = await Pokemon
    .findOne({ name: req.params.pokename });
    res.status(200).send(pokemon);
  } catch (e) {
    res.status(404).send('Current pokemon does not exist');
  }
});

router.post('/:pokename', checkToken, async (req, res) => {
  try {
    const pokemon = Pokemon.findOne({ name: req.params.pokename });
    pokemon.catchedDate = new Date();
      User.findByIdAndUpdate(
        req.userId,
        { $push: { catched: pokemon } },
      )
      .then(() => {
        res.status(200).send(`${req.params.pokename} was cathed`);
      })
      .catch(() => {
        res.status(404).send('User not found');
      });
  } catch(e) {
    res.status(404).send('Current pokemon does not exist');
  }
});

router.get('/catched', checkToken, async (req, res) => {
  try {
    const user = User.findById(req.userId);
    res.status(200).send(user.catched);
  } catch(e) {
    res.status(500).send('Authentication error');
  }
});

module.exports = router;

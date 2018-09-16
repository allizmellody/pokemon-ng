const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const createToken = require('../config/createToken');
const User = require('../models/user');

router.use(bodyParser.json());

router.post('/register', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password)
    });
    res.status(200).send({ token: createToken({ id: user._id }) });
  } catch (e) {
    res.status(500).send('Registration failed');
  }
});

router.post('/login', async (req, res) => {
  try {
    const userInfo = await User.findOne({ username: req.body.username });
      if(bcrypt.compareSync(req.body.password, userInfo.password)) {
        res.status(200).send({ token: createToken({ id: userInfo._id })});
      } else {
        res.status(500).send('Authentication failed');
      }
  } catch (e) {
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;

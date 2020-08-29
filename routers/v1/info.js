'use strict'

const axios = require('axios');
const express = require('express'),
      router = express.Router();

// GET /v1/info routes
router.get('/getRandomBetweenInputs', (req, res) => {
  const { min, max } = req.query;
  const minVal = parseInt(min, 10);
  const maxVal = parseInt(max, 10);

  if (minVal > maxVal) {
    return res.status(400).send({ message: 'Min value must be greater than max' });
  }

  const diff = maxVal - minVal;
  const randomNumber = Math.round(Math.random() * diff) + minVal;

  res.status(200).send({ message: `The randomized number is ${randomNumber}` });
});

// POST /v1/info routes
router.post('/generateRandomFacts', async (req, res) => {
  const { authorization: codeRegistered } = req.headers;

  if (codeRegistered.split(' ')[0] !== 'Basic' || codeRegistered.split(' ')[1] !== 'Gd+CsYxn8_PE') {
    return res.status(401).send({ message: 'Invalid supplied registered code' });
  }

  const { data } = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');

  res.status(200).send(data);
});

module.exports = router;
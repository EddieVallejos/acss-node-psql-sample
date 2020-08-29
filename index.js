'use strict';

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const infov1 = require('./routers/v1/info');
// PSQL routers
const membersv1 = require('./routers/v1/members');

const app = express();

app.set('case sensitive routing', false);
app.use(require('method-override')());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/v1/info', infov1);
app.use('/v1/members', membersv1);

// Generic Route for Health Check
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Yeah, I\'m a healthy API'});
});

app.all('*', (req, res) => {
  res.status(501).send({ message: 'Route not yet implemented'});
});

app.listen(8000);
console.log('App is listening on port 8000');

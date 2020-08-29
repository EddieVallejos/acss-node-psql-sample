'use strict'

const { Client } = require('pg');

const client = new Client({
  user: 'acss',
  host: '127.0.0.1',
  database: 'acssdb',
  password: 'acssnumbawan',
  port: 5432,
});

client.connect();

module.exports = client;
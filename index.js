'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const { PORT, CLIENT_ORIGIN, APP_KEY, APP_ID } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//gets APP_ID and APP_KEY from .env to gain access to edamam
const edamamParams = {
  app_id: APP_ID,
  app_key: APP_KEY
};

function createUrl(obj) {
  return `https://api.edamam.com/search?q=${obj.q}&app_id=${obj.app_id}&app_key=${obj.app_key}`;
}

//get request to search edamam api
app.get('/search', (req, res, next) => {

  const {q} = req.query;

  fetch(createUrl({...edamamParams, q}), {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
});



function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };

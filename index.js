'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN, APP_KEY, APP_ID } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');
const recipeRouter = require('./routes/recipes.js');
const jwtStrategy = require('./passport/jwt.js');

//creates an Express app
const app = express();


// =============================== Middleware stuffs ======================= //
//uses morgan logging library
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

//Configure passport to utilize user authentication strategy
const localStrategy = require('./passport/local.js');
passport.use(localStrategy);

//Configure passport to use JWT authentication strategy
passport.use(jwtStrategy);

// parse request body
app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// ========================= Mount Routers ==================================== //
app.use('/auth', authRouter);
app.use('/register', usersRouter);
app.use('/recipebook', recipeRouter);


// ========================= MAKE REQUEST TO 3RD PARTY API ============================= //
//
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

// ============================ Custon Error Handlers =========================== //

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if(err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ========================= Connect to DB and listen for incoming connections =================== //
//
if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };

const express = require('express');
const Recipe = require('../models/recipe.js');
const passport = require('passport');
const mongoose = require('mongoose');

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false, failWithError: true}));


// ================== GET/READ ALL RECIPES ============= //
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  let filter = { userId: userId };

  Recipe
    .find(filter)
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// ================== POST/CREATE RECIPE ================= //
router.post('/', (req, res, next) => {
  const {label, uri, image, source, url, healthLabels, ingredientLines, instructions} = req.body;
  const userId = req.user.id;
  if(!label) {
    const err = new Error('Missing recipe label in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = {label, uri, image, source, url, healthLabels, ingredientLines, instructions, userId};

  Recipe
    .create(newItem)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;

// ====================== DELETE RECIPE =================== //
router.delete('/', (req, res, next) => {
  const id = req.body.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  Recipe
    .findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => next(err));
});

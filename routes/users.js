'use strict';

const mongoose = require('mongoose');
const User = require('../models/user.js');
const express = require('express');
const router = express.router();

// ===================== POST creates a new user ====================== //

router.post('/', (req, res, next) => {

  const { username } = req.body;
  const { password } = req.body;

  // *** validation checks *** //
  const requiredField = ['username', 'password'];

  function validationError(message, local) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: message,
      location: local,
    });
  }

  //checks to make sure both username and password exist
  const missingField = requiredField.find(field => !(field in req.body));
  if (missingField) {
    validationError('missing required field', missingField);
  }
  //username and password should both type: String
  const nonStringFields = requiredField.find(field => field in req.body && typeof req.body[field] !== 'string');
  if (nonStringFields) {
    validationError('username and password should be type: string', nonStringFields);
  }

  //username and password should not have leading or trailing whitespace
  const trimmedFields = requiredField.find(field => req.body[field].trim() !== req.body[field]);
  if (trimmedFields) {
    validationError('username and password should not have leading or trailing whitespace', trimmedFields);
  }

  //username must have at least 3 characters
  if (username.length < 1) {
    validationError('username must be at least 3 characters long', 'username');
  }

  //password must be between 8 and 72 characters long
  if (password.trim().length < 8 || password.trim().length > 72) {
    validationError('password must be between 8 and 72 characters', 'password');
  }
  //end validation checks

  User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
      };
      return User.create(newUser);
    })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('username already exists');
        err.status = 400;
      }
      next(err);
    });


});


module.exports = router;

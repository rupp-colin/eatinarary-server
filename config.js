'use strict';

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  APP_KEY: process.env.APP_KEY,
  APP_ID: process.env.APP_ID,
  DATABASE_URL:
  process.env.DATABASE_URL || 'mongodb://dev:<password123@ds235243.mlab.com:35243/meal-prep-app-test',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test'
  // DATABASE_URL:
  //     process.env.DATABASE_URL || 'postgres://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //     process.env.TEST_DATABASE_URL ||
  //     'postgres://localhost/thinkful-backend-test'
};

console.log(process.env.DATABASE_URL);

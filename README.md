# Eat-inarary backend

An API designed to be used with Eat-inarary

## Getting started

View the full app at (https://eatinarary.herokuapp.com/)

The Eatinarary API is a node application built using the express framework.  Eatinarary API uses several node middlewares:
* CORS - node middleware that provides middleware to the API to allow cross-origin-resource-sharing
* morgan - node logging middleware
* fetch - node middleware used to relay calls to a Edamam, a third party API
* passport - node middleware used for authenticating users
* bodyparser - node middleware used to parse requests prior to being passsed to handler functions

## Codebase

The primary server file is index.js.  This file calls the required middleware, mounts various routers, builds requests to the third party API, and has am error handler to make sure the server doesn't timeout.

####models directory

The models directory contains files related to the mongo DB data schemas. 

####passport directory

Contains the local strategy for using JWT tokens as well as code to parse through the JWT.

####routes directory

Contains specific route endpoints

####test directory

Contains integration test files

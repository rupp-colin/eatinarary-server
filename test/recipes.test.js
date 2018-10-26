//  endpoint('/recipeRouter')

const {app} = require('../index.js');
const chai = require ('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config.js');

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const {users, recipes} = require('../db/data.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Eatinarary API - Recipes', function () {

  let user;
  let token;

  before(function () {
    return mongoose.connect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());

  });

  beforeEach(function () {
    return Promise.all([
      User.insertMany(users),
      Recipe.insertMany(recipes)
    ])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();

  });

  after(function () {
    return mongoose.disconnect();

  });

  describe('GET ALL /recipebook', function () {
    it('should get all recipes belonging to a user', () => {
      return Promise.all([
        Recipe.find({userId: user.id}),
        chai.request(app)
          .get('/recipebook')
          .set('Authorization', `Bearer ${token}`)
      ])
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(data.length);
        });
    });
  });

  describe('POST /recipebook', function () {
    it('should post a new item to a users recipebook', () => {
      const newRecipe = {
        'label': 'a new recipe',
        'instructions': 'do things',
        'ingredientLines': ["eggs", "vegetables", "cheese"]
      };
      let res;

      return chai.request(app)
        .post('/recipebook')
        .set('Authorization', `Bearer ${token}`)
        .send(newRecipe)
        .then(_res => {
          res = _res;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.have.keys("label", "id", "userId", "instructions", "ingredientLines", "healthLabels", "createdAt", "updatedAt");
          return Recipe.findById(res.body.id);
        })
        .then(recipe => {
          expect(res.body.id).to.equal(recipe.id);
          expect(res.body.label).to.equal(recipe.label);
          expect(res.body.ingredientLines).to.eql(recipe.ingredientLines);
          expect(new Date(res.body.updatedAt)).to.eql(recipe.updatedAt);
          expect(new Date(res.body.createdAt)).to.eql(recipe.createdAt);
        });
    });


    it('should return status 400 if missing recipe label', () => {
      const newRecipe = {
        'instructions': 'do things',
        'ingredientLines': ["eggs", "vegetables", "cheese"]
      };
      return chai.request(app)
        .post('/recipebook')
        .set('Authorization', `Bearer ${token}`)
        .send(newRecipe)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
        });

    });
  });

  describe('DELETE /recipebook', function () {
    it('should delete the correct item from the database', () => {
      return Recipe.findOne({userId: user.id})
        .then(res => {
          return chai.request(app)
            .delete(`/recipebook`)
            .send({id: res.id})
            .set('Authorization', `Bearer ${token}`);
        })
        .then(res => {
          expect(res).to.have.status(204);
        });
    });
  });

});

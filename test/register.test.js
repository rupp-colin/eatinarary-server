const {app} = require('../index.js');
const chai = require ('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { TEST_DATABASE_URL } = require('../config.js');
const User = require('../models/user.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Eatinarary API - Users', function () {

  const username = 'exampleUser';
  const password = 'examplePassword';

  before(function () {
    return mongoose.connect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());

  });

  beforeEach(function () {
    return User.createIndexes();

  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();

  });

  after(function () {
    return mongoose.disconnect();

  });

  describe('/register', function () {
    describe('POST', function () {
      it('Should create a new user', function () {
        const testUser = { username, password };
        let res;
        return chai
          .request(app)
          .post('/register')
          .send(testUser)
          .then(_res => {
            res =_res;
            expect(res).to.have.status(201);
            expect(res).to.be.an('object');
            expect(res.body).to.have.keys('id', 'username');
            expect(res.body.id).to.exist;
            expect(res.body.username).to.equal(testUser.username);
            return User.findOne({username});
          })
          .then(user => {
            expect(user).to.exist;
            expect(user.id).to.equal(res.body.id);
            return user.validatePassword(password);
          })
          .then(isValid => {
            expect(isValid).to.be.true;
          });
      });

      it('Should reject user with missing username', function () {

      });

      it('Should reject username and passwords if they are not strings', function () {

      });

      it('Should reject username and passwords with leading/trailing whitespace', function () {

      });

      it('Should reject username shorter than 3 character', function () {

      });

      it('Should reject passwords < 8 characters', function () {

      });

      it('should reject passwords > 72 characters', function () {

      });
    });
  });
});



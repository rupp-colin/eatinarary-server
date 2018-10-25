const {app} = require('../index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('DO THINGS EVEN WORK???', () => {
  it('true should be true', () => {
    expect(true).to.be.true;
  });
  it('2 + 2 = 4', () => {
    expect(2 + 2).to.equal(4);
  });
});


describe('Basic Express Setup', () => {

  describe('404 handler', () => {
    it('should return 404 if given a bad path', () => {
      return chai.request(app)
        .get('/baaaadpath')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
  });
});

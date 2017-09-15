/* eslint-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../../routes/index.js');
const app = require('../../../server.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Math', () => {
  it('Adds 2 + 2', () => {
    expect(2 + 2).to.equal(4);
  });
  it('Multiplies by 2', () => {
    expect(2 * 5).to.equal(10);
  });
});


describe('API Endpoints', () => {
  it('/api/KeywordAcrossGender should return data', (done) => {
    chai.request(app)
      .post('/api/KeywordAcrossGender')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.above(1);
        done();
      });
  });

  it('/api/SelectionsOverTime should return data', (done) => {
    chai.request(app)
      .post('/api/SelectionsOverTime')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.be.above(1);
        done();
      });
  });

  it('/api/BucketedBarChart should return data', (done) => {
    chai.request(app)
      .post('/api/BucketedBarChart')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.buckets).to.be.a('array');
        expect(res.body.buckets.length).to.be.above(1);
        done();
      });
  });
});

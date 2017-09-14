/* eslint-env mocha */
const { chai, expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../routes/index.js');

xdescribe('Do Math', () => {
  it('Adds 2 + 2', () => {
    expect(2 + 2).to.equal(4);
  });
  it('Multiplies by 2', () => {
    expect(2 * 5).to.equal(10);
  });
});


xdescribe('/KeywordAcrossGender', () => {
  it('it should return doc counts across gender', (done) => {
    chai.request(server)
      .post('/KeywordAcrossGender')
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.should.be.a('array');
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});

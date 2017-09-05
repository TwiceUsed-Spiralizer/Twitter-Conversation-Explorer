/* eslint-env mocha */
// Node modules
const { fork } = require('child_process');
// Testing libraries
const { expect } = require('chai');
// Modules to test
const { User, Tweet } = require('../../server/tweet-fetcher/models');
const TweetManager = require('../../server/tweet-fetcher');
const mongoConnectTest = require('../../server/tweet-fetcher/mongo');
// Mock data
const tweets = require('./example-tweets');

describe('Model behaviour', () => {
  it('User and Tweet exist', () => {
    expect(User).to.be.a('function');
    expect(Tweet).to.be.a('function');
    expect(new User(tweets[0].user)).to.be.an('object');
    expect(new Tweet(tweets[0])).to.be.an('object');
  });
});

describe('TweetManager', () => {
  it('TweetManager exists', () => {
    expect(TweetManager).to.be.a('function');
    expect(() => new TweetManager()).to.not.throw();
  });

  it('Mongo successfully inserts and removes example tweets', (done) => {
    mongoConnectTest()
      .then(tweetsDB =>
        tweetsDB.insert(new Tweet(tweets[2]))
          .then(() => tweetsDB.find({ id_str: '1' }).toArray())
          .then(results => ({ results, tweetsDB }))
      )
      .then(({ results, tweetsDB }) => {
        expect(results.length).to.equal(1);
        expect(results[0].id_str).to.equal('1');
        return tweetsDB.remove({ id_str: '1' });
      })
      .then((result) => {
        expect(result.result.ok).to.equal(1);
        done();
      });
  });
});

describe('Populate Recipients', () => {

});

describe('Set gender from name', () => {
  it('Sets common male names to male', (done) => {
  //   mongoConnectTest()
  //     .then(tweetsDB =>
  //       tweetsDB.insert(tweets[1]));
  });
});

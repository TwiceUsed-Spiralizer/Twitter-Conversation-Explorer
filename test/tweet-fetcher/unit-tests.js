// Testing libraries
const { expect } = require('chai');
// Modules to test
const { User, Tweet } = require('../../server/tweet-fetcher/models');
const TweetManager = require('../../server/tweet-fetcher');
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
  expect(TweetManager).to.be.a('function');
  expect(() => new TweetManager()).to.not.throw();
});



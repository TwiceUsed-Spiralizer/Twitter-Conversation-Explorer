require('dotenv').config();
const mongoConnect = require('./mongo');
const { Tweet } = require('./models.js');
const twitterStream = require('./twitter-stream').stream;

const isCandidate = function isCandidate(tweet) {
  return !/^RT @/.test(tweet.text)
    && !tweet.retweeted_status
    && ((tweet.entities && tweet.entities.user_mentions.length > 0) || tweet.in_reply_to_status_id);
};

exports.TweetFetcher = class TweetFetcher {
  constructor(params = {}) {
    this.statusFilter = params.statusFilter || { language: 'en', track: 'a,e,i,o,u,y,A,E,I,O,U,Y, ' };
    this.batchSize = params.batchSize || 500;
    this.numTweets = 0;
    this.tweets = new Array(this.batchSize);
    mongoConnect()
      .then(tweetsDB => this.tweetsDB = tweetsDB)
      .then(() => twitterStream(this.statusFilter).on('data', tweet => tweet && this.tweetHandler(tweet)));
  }

  tweetHandler(tweet) {
    if (isCandidate(tweet)) {
      this.tweets[this.numTweets++] = new Tweet(tweet);
    }
    if (this.numTweets >= this.batchSize) {
      this.tweetsDB.insert(this.tweets);
      this.tweets = new Array(this.batchSize);
      this.numTweets = 0;
    }
  }
};

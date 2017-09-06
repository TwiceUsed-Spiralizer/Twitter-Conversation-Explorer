/*
 *  TweetManager/tweet-fetcher.js
 *  Fetches tweets, sanitises and stores them in MongoDB.
 *  Instantiated by TweetManager ('./index.js').
 */

// Node Modules
const EventEmitter = require('events');
// TCE Modules
const { Tweet } = require('./models.js');
const twitterStream = require('./twitter-client').stream;

const isCandidate = function isCandidate(tweet) {
  return !/^RT @/.test(tweet.text)
    && !tweet.retweeted_status
    && ((tweet.entities && tweet.entities.user_mentions.length > 0) || tweet.in_reply_to_status_id);
};

module.exports = class TweetFetcher extends EventEmitter {
  constructor(tweetsDB, params = {}) {
    super();
    this.statusFilter = params.statusFilter || { language: 'en', track: 'a,e,i,o,u,y,A,E,I,O,U,Y, ' };
    this.batchSize = params.batchSize || 500;
    this.numTweets = -1;
    this.tweets = new Array(this.batchSize);
    this.tweetsDB = tweetsDB;
    twitterStream(this.statusFilter).on('data', tweet => tweet && this.tweetHandler(tweet));
  }

  tweetHandler(tweet) {
    if (isCandidate(tweet)) {
      this.tweets[this.numTweets += 1] = new Tweet(tweet);
    }
    if (this.numTweets >= this.batchSize) {
      this.tweetsDB.insert(this.tweets);
      this.tweets = new Array(this.batchSize);
      this.emit('tweets', this.numTweets);
      this.numTweets = -1;
    }
  }
}
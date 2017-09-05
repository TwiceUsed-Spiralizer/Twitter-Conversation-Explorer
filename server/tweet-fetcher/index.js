/*
 *  tweet-fetcher/index.js
 *  Coordinates fetching and parsing pipeline.
 *  Exports TweetManager class, which instantiates all necessary objects and processes
 *  to fetch and parse tweets.
 */

// Inject envinronment variables
require('dotenv').config();
// TCE Modules
const mongoConnect = require('./mongo');
const { Tweet } = require('./models.js');
const twitterStream = require('./twitter-client').stream;
// Node modules
const { fork } = require('child_process');
const EventEmitter = require('events');
const path = require('path');
const throttle = require('lodash/throttle');

const isCandidate = function isCandidate(tweet) {
  return !/^RT @/.test(tweet.text)
    && !tweet.retweeted_status
    && ((tweet.entities && tweet.entities.user_mentions.length > 0) || tweet.in_reply_to_status_id);
};

class TweetFetcher extends EventEmitter {
  constructor(tweetsDB, params = {}) {
    super();
    this.statusFilter = params.statusFilter || { language: 'en', track: 'a,e,i,o,u,y,A,E,I,O,U,Y, ' };
    this.batchSize = params.batchSize || 500;
    this.numTweets = 0;
    this.tweets = new Array(this.batchSize);
    this.tweetsDB = tweetsDB;
    twitterStream(this.statusFilter).on('data', tweet => tweet && this.tweetHandler(tweet));
  }

  tweetHandler(tweet) {
    if (isCandidate(tweet)) {
      this.tweets[this.numTweets++] = new Tweet(tweet);
    }
    if (this.numTweets >= this.batchSize) {
      this.tweetsDB.insert(this.tweets);
      this.tweets = new Array(this.batchSize);
      this.emit('tweets', this.numTweets);
      this.numTweets = 0;
    }
  }
};

module.exports = class TweetManager {
  constructor() {
    // Initialise tweet fetcher and listen for tweets
    mongoConnect()
      .then(tweetsDB => new TweetFetcher(tweetsDB).on('tweets', this.populateRecipients.bind(this)))
      .catch(console.error);
    // Rate limit lookups
    this.populateRecipients = throttle(this.populateRecipients, 2000);
    // Fork process and handle communication
    this.recipientsProcessProcessReady = false;
    this.recipientsProcess = fork(path.join(__dirname, './populate-recipients'));
    this.recipientsProcess.on('message', (message) => {
      if (message === 'ready') {
        this.recipientsProcessProcessReady = true;
        this.populateRecipients();
      } else if (message === 'no tweets') {
        this.recipientsProcessProcessReady = true;
      }
    });
  }

  populateRecipients() {
    if (this.recipientsProcessProcessReady) {
      this.recipientsProcessProcessReady = false;
      this.recipientsProcess.send('');
    }
  }
};
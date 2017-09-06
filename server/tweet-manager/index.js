/*
 *  tweet-manager/index.js
 *  Coordinates fetching and parsing pipeline.
 *  Exports TweetManager class, which instantiates all necessary objects and processes
 *  to fetch and parse tweets.
 */

// TCE Modules
const mongoConnect = require('./mongo');
const TweetFetcher = require('./tweet-fetcher');
// Node modules
const { fork } = require('child_process');
const path = require('path');
const throttle = require('lodash/throttle');

module.exports = class TweetManager {
  constructor() {
    // Initialise tweet fetcher and listen for tweets
    mongoConnect()
      .then(tweetsDB => new TweetFetcher(tweetsDB).on('tweets', this.populateRecipients))
      .catch(console.error);
    // Rate limit lookups
    this.populateRecipients = throttle(this.populateRecipients, 2000).bind(this);
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

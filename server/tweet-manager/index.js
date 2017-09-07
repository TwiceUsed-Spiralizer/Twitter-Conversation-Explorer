/*
 *  tweet-manager/index.js
 *  Coordinates fetching and parsing pipeline.
 *  Exports TweetManager class, which instantiates all necessary objects and processes
 *  to fetch and parse tweets.
 *  This file is not very DRY, which needs rectifying ASAP.
 *  It makes it verbose and cryptic.
 */

// TCE Modules
const mongoConnect = require('./mongo');
const TweetFetcher = require('./tweet-fetcher');
// Node modules
const { fork } = require('child_process');
const path = require('path');
const throttle = require('lodash/throttle');
const AddGender = require('./add-gender');

module.exports = class TweetManager {
  constructor() {
    // Initialise tweet fetcher and listen for tweets
    mongoConnect()
      .then(tweetsDB => new TweetFetcher(tweetsDB).on('tweets', this.populateRecipients))
      .catch(console.error);
    // Rate limit lookups
    this.populateRecipients = throttle(this.populateRecipients, 2000).bind(this);
    // Fork recipients process and handle communication
    this.recipientsProcessReady = false;
    this.recipientsProcess = fork(path.join(__dirname, './populate-recipients'));
    this.recipientsProcess.on('message', (message) => {
      if (message === 'ready') {
        AddGender.compute();
        this.recipientsProcessReady = true;
        this.populateRecipients();
        this.elasticTransfer();
      } else if (message === 'no tweets') {
        this.recipientsProcessReady = true;
      }
    });
    // Fork elastic process and handle communication
    this.elasticProcessReady = false;
    this.elasticProcess = fork(path.join(__dirname, './elastic'));
    this.elasticProcess.on('message', (message) => {
      if (message === 'ready') {
        this.elasticProcessReady = true;
        this.elasticTransfer();
      } else if (message === 'no tweets') {
        this.elasticProcessReady = true;
      }
    });
  }

  elasticTransfer() {
    if (this.elasticProcessReady) {
      this.elasticProcessReady = false;
      this.elasticProcess.send('');
    }   
  }

  populateRecipients() {
    if (this.recipientsProcessReady) {
      this.recipientsProcessReady = false;
      this.recipientsProcess.send('');
    }
  }
};

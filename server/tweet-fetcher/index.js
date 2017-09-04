require('dotenv').config();
const elasticClient = require('elasticsearch').Client({ host: process.env.ELASTICSEARCH_HOST });
const { Tweet } = require('./models.js');
const twitterStream = require('./twitter-stream');

const isCandidate = function isCandidate(tweet) {
  return !/^RT @/.test(tweet.text)
    && !tweet.retweeted_status
    && ((tweet.entities && tweet.entities.user_mentions.length > 0) || tweet.in_reply_to_status_id);
};


exports.TweetFetcher = class TweetFetcher {
  constructor(params = {}) {
    this.elasticClient = elasticClient;
    this.statusFilter = params.statusFilter || { language: 'en', track: 'a,e,i,o,u,y,A,E,I,O,U,Y, ' };
    this.batchSize = params.batchSize * 2 || 1000;
    this.numTweets = 0;
    this.tweets = new Array(this.batchSize);
    this.index = { index: { _index: 'test', _type: 'tweet' } };
    twitterStream(this.statusFilter).on('data', tweet => tweet && this.tweetHandler(tweet));
  }

  tweetHandler(tweet) {
    if (isCandidate(tweet)) {
      this.tweets[this.numTweets++] = this.index;
      this.tweets[this.numTweets++] = new Tweet(tweet);
    }
    if (this.numTweets >= this.batchSize) {
      this.elasticClient.bulk({
        body: this.tweets,
      })
        .catch(console.error);
      this.tweets = new Array(this.batchSize);
      this.numTweets = 0;

    }
  }
};

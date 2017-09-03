/*
 * elastic.js 
 * 
 * Example file, demonstrating usage of twitter stream
 * and elastic search.
 */
require('dotenv').config();

const elasticsearch = require('elasticsearch');
const client = require('twitter')({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const esClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
});

const batchSize = 500;
const index = { index: { _index: 'twitter', _type: 'tweet' } };
let newItems = Array(batchSize);
let items = 0;

const tweetHandler = function tweetHandler(tweet) {
  if (!/^RT @/.test(tweet.text) && !tweet.retweeted_status && ((tweet.entities && tweet.entities.user_mentions.length > 0) || tweet.in_reply_to_status_id)) {
    tweet.complete = false;
    newItems[items++] = index;
    newItems[items++] = tweet;
  }
  if (items >= batchSize) {
    const itemsToStore = newItems;
    newItems = Array(batchSize);
    items = 0;
    esClient.bulk({
      body: itemsToStore,
    })
      .catch(console.error);
  }
};

const stream = client.stream('statuses/filter', { language: 'en', filter_level: 'low', track: 'a,e,i,o,u,y, ' });
stream.on('data', tweet => tweet && tweetHandler(tweet));

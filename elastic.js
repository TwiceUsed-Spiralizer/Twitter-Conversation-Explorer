/*
 * elastic.js 
 * 
 * Example file, demonstrating usage of twitter stream
 * and elastic search.
 */
require('dotenv').config;

const client = require('twitter')({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST
});



const stream = client.stream('statuses/filter', {language: 'en', filter_level: 'low', track: 'a,b,c, '});
stream.on('data', tweet => tweet && esClient.index({
  index: 'index',
  type: 'type',
  body: tweet
}));

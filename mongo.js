/*
 * mongo.js 
 * 
 * Example file, demonstrating usage of twitter stream
 * and MongoDB.
 */
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const client = require('twitter')({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const stream = client.stream('statuses/filter', { language: 'en', filter_level: 'low', track: 'a,b,c, ' });

let mongodb;
MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
  if (err) throw (err);
  mongodb = db.collection('tweets');
  module.exports = mongodb;
  stream.on('data', tweet => tweet && mongodb.insert(tweet));
});

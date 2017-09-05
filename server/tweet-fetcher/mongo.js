/*
 *  mongo.js
 *  This module simple exports a convenience function for connecting
 *  to mongoDb and accessing the correct collection.
 */

const { MongoClient } = require('bluebird').promisifyAll(require('mongodb'));
require('dotenv').config();

module.exports = function connectMongo(collection = 'tweets') {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(db.collection(collection));
      }
    });
  });
};

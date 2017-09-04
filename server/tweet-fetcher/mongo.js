const { MongoClient } = require('bluebird').promisifyAll(require('mongodb'));
require('dotenv').config();

module.exports = function connectMongo() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
      if (err) {
        reject(err);
      } else {
        resolve(db.collection('tweets'));
      }
    });
  });
};

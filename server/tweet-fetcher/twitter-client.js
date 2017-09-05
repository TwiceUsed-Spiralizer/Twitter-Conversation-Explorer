/*
 *  twitter-client.js
 *  Exports interface with convenience functions for using Twitter API
 */

require('dotenv').config();
const twitterClient = require('twitter')({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

exports.stream = function twitterStream(statusFilter) {
  return twitterClient.stream('statuses/filter', statusFilter);
};

exports.lookupUsers = function lookupUsers(userIds) {
  return new Promise((resolve, reject) => {
    twitterClient.post('users/lookup', { user_id: userIds.join(',') }, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

const twitterClient = require('twitter')({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

module.exports = function twitterStream(statusFilter) {
  return twitterClient.stream('statuses/filter', statusFilter);
};

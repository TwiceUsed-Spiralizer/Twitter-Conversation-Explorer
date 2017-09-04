const mongoConnect = require('./mongo');
const {forEach, map } = require('lodash');

mongoConnect()
  .then(tweetsDB =>
    tweetsDB.find({}).sort({ created_at: 1 }).limit(100).toArray()
  )
  .then((tweets) => {
    const user_ids = new Set();
    tweet
  });

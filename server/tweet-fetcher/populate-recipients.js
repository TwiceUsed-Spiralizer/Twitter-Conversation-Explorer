const mongoConnect = require('./mongo');
const { forEach, map } = require('lodash');

mongoConnect()
  .then(tweetsDB =>
    tweetsDB.find({}).sort({ created_at: 1 }).limit(100).toArray()
  )
  .then((tweets) => {
    let userIds = new Set();
    const pushUserIds = tweet => forEach(tweet.recipients, (recipient) => {
      if (typeof recipient === 'string') {
        userIds.add(recipient);
      }
    });
    forEach(tweets, pushUserIds);
    userIds = Array.from(userIds);
    
  });

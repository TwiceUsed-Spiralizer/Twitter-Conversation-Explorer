const mongoConnect = require('./mongo');
const { User } = require('./models');
const { lookupUsers } = require('./twitter-client');
const { forEach, map } = require('lodash');

let tweetsDB;

mongoConnect()
  .then((db) => {
    tweetsDB = db;
    process.send('ready');
  });

process.on('message', () => {
  tweetsDB.find({ recipients_processed: false }).sort({ created_at: 1 }).limit(100).toArray()
    .then((tweets) => {
      if (tweets.length < 1) {
        throw 'no tweets';
      }
      const userIds = new Set();
      const pushUserIds = tweet => forEach(tweet.recipients, (recipient) => {
        if (typeof recipient === 'string') {
          userIds.add(recipient);
        }
      });
      forEach(tweets, pushUserIds);
      return lookupUsers(Array.from(userIds).slice(0, 100))
        .then(users => ({ users, tweets }));
    })
    .then(({ users, tweets }) => {
      const userIdsToObjects = {};
      const mongoBatch = tweetsDB.initializeUnorderedBulkOp();
      const mapUserIdToObject = (id) => {
        if (typeof id === 'string') {
          return userIdsToObjects[id] ? userIdsToObjects[id] : id;
        }
        return id;
      };
      forEach(users, (user) => {
        if (!userIdsToObjects[user.id_str]) {
          userIdsToObjects[user.id_str] = new User(user);
        }
      });
      forEach(tweets, (tweet) => {
        const recipients = map(tweet.recipients, mapUserIdToObject);
        let recipientsProcessed = true;
        for (let i = 0, n = recipients.length; i < n; i++) {
          if (typeof recipients[i] === 'string') {
            recipientsProcessed = false;
            break;
          }
        }
        mongoBatch.find({ _id: tweet._id }).updateOne({ $set: { recipients, recipients_processed: recipientsProcessed } });
      });
      mongoBatch.execute();
      process.send({ lookups: Object.keys(userIdsToObjects).length });
      process.send('ready');
    })
    .catch((err) => {
      if (err === 'no tweets') {
        process.send(err);
      } else {
        console.error(err);
        process.send('ready');
      }
    });
});

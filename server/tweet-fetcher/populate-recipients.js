/*
 *  populate-recipients.js
 *  Forked from the TweetManager constructor in index.js,
 *  this module checks the db for tweets with unprocessed
 *  recipients ids, queries the Twitter REST API for user info
 *  then updates tweets with full recipient info.
 */

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
  // Get tweets from DB
  tweetsDB.find({ recipients_processed: false }).sort({ created_at: 1 }).limit(100).toArray()
    .then((tweets) => {
      if (tweets.length < 1) {
        throw 'no tweets';
      }
      // Gather all user ids
      const userIds = new Array(100);
      let index = 0;
      const pushUserIds = tweet => forEach(tweet.recipients, (recipient) => {
        if (index < 100 && typeof recipient === 'string') {
          userIds[index++] = recipient;
        }
      });
      forEach(tweets, pushUserIds);
      // Query Twitter REST API for up to 100 user ids
      return lookupUsers(userIds)
        .then(users => ({ users, tweets }));
    })  
    .then(({ users, tweets }) => {
      // Resolve user ids on tweets to fully hydrated user info
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
      // Update mongoDb in one batch job and inform TweetManager of progress
      mongoBatch.execute();
      process.send('ready');
    })
    .catch((err) => {
      if (err === 'no tweets' || err[0].code === 17) {
        process.send('no tweets');
      } else {
        console.error(err);
        process.send('ready');
      }
    });
});

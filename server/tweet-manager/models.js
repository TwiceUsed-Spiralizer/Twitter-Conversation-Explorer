/*
 *  models.js
 *  Provides constructors to sanitise JSON
 */

const uniq = require('lodash/uniq');

exports.Tweet = class Tweet {
  constructor(tweet) {
    this.id_str = tweet.id_str;
    this.created_at = new Date(tweet.created_at);
    this.full_text = tweet.truncated ? tweet.extended_tweet.full_text : tweet.text;
    this.short_text = tweet.truncated ? tweet.text : null;
    this.sender = new exports.User(tweet.user);
    this.hashtags = tweet.entities.hashtags;
    this.recipients = uniq(tweet.entities.user_mentions.map(user => user.id_str).concat(tweet.in_reply_to_user_id_str || []));
    this.recipients_processed = false;
    this.gender = false;
    this.elastic = false;
  }
};

exports.User = class User {
  constructor(user) {
    this.name = user.name;
    this.id_str = user.id_str;
    this.created_at = new Date(user.created_at);
    this.screen_name = user.screen_name;
    this.location = user.location;
    this.followers_count = user.followers_count;
    this.following_count = user.friends_count;
    this.tweet_count = user.statuses_count;
  }
};

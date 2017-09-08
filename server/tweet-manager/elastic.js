/*
 * elastic.js 
 * 
 * Example file, demonstrating usage of twitter stream
 * and elastic search.
 */

require('dotenv').config();
const mongoConnect = require('./mongo');
const elasticsearch = require('elasticsearch');
const { reduce, filter, chain, omit } = require('lodash');

const esClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
});

let tweetsDB;
mongoConnect()
  .then((db) => {
    tweetsDB = db;
    process.send('ready');
  });

process.on('message', () => {
  const index = { index: { _index: 'tweets', _type: 'tweet' } };
  tweetsDB.find({ gender: true, recipients_processed: true, elastic: false }).limit(500).toArray()
    .then((tweets) => {
      if (tweets.length < 1) {
        throw 'no tweets';
      }
      return tweets;
    })
    .then(results => reduce(results, (acc, result) =>
      acc.concat(index, omit(result, ['_id'])),
    []))
    .then(body =>
      esClient.bulk({ body })
        .then(results => ({ 
          results,
          body: chain(body).filter(item => item !== index).map(item => item.id_str).value(),
        }))
    )
    .then(({ body, results }) => {
      if (!results.errors) {
        return tweetsDB.remove({ id_str: { $in: body } });
      }
      return tweetsDB.remove({ id_str: {
        $in: filter(body, (item, i) => !results.items[i].index.error),
      } });
    })
    .then(() => process.send('ready'))
    .catch((err) => {
      if (err === 'no tweets') {
        process.send('no tweets');
      } else {
        console.error(err);
        process.send('ready');
      }
    });
});

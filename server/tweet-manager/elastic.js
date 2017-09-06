/*
 * elastic.js 
 * 
 * Example file, demonstrating usage of twitter stream
 * and elastic search.
 */

require('dotenv').config();
const elasticsearch = require('elasticsearch');
const { reduce, chain, omit } = require('lodash');

const esClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
});

module.exports = function storeTweetsInElastic(tweetsDB) {
  start = Date.now();
  const index = { index: { _index: 'tweets', _type: 'tweet' } };
  tweetsDB.find({ gender: true, recipients_processed: true, elastic: false }).limit(500).toArray()
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
        console.log((Date.now() - start) / 1000)
        return tweetsDB.updateMany({ id_str: { $in: body } }, { $set: { elastic: true } });
      }
      console.log(results.errors);
    });
};

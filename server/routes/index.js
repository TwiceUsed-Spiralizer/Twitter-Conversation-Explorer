require('dotenv').config();
const app = require('../../server.js');
const elasticsearch = require('elasticsearch');
const queries = require('./queries.js');

const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace',
});
const index = 'twitter';
const type = 'tweet';

app.post('/api/KeywordAcrossGender', (req, res) => {
  const keyword = req.body.keyword.replace(' ', '*') || '*';
  const recipientsGender = req.body.recipientsGender === undefined ? false : req.body.recipientsGender;
  const sentiment = req.body.sentiment || false;
  const senderFollowerMin = req.body.senderFollowerMin || false;
  const senderFollowerMax = req.body.senderFollowerMax || false;
  let esBody = queries.KeywordAcrossGenderBody;

  esBody = queries.applyFilters(esBody, false, recipientsGender,
    sentiment, senderFollowerMin, senderFollowerMax);

  esBody = queries.addKeywordtoAdjacencyMatrix(esBody, keyword);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => body.aggregations.interactions.buckets)
    .then(data => res.send(data));
});

app.post('/api/KeywordAcrossFollowerCount', (req, res) => {
  const keyword = req.body.keyword || '*';
  const senderGender = req.body.senderGender === undefined ? false : req.body.senderGender;
  const recipientsGender = req.body.recipientsGender === undefined ? false : req.body.recipientsGender;
  const sentiment = req.body.sentiment || false;
  let esBody = queries.KeywordAcrossFollowerCountBody;

  esBody = queries.applyFilters(esBody, senderGender, recipientsGender,
    sentiment);

  esBody = queries.addKeywordtoAdjacencyMatrix(esBody, keyword);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => body.aggregations.interactions.buckets)
    .then(data => res.send(data));
});

app.post('/api/KeywordAcrossSentiment', (req, res) => {
  const keyword = req.body.keyword || '*';
  const senderGender = req.body.senderGender === undefined ? false : req.body.senderGender;
  const recipientsGender = req.body.recipientsGender === undefined ? false : req.body.recipientsGender;
  const senderFollowerMin = req.body.senderFollowerMin || false;
  const senderFollowerMax = req.body.senderFollowerMax || false;
  let esBody =
  { query: {
    bool: {
      must: [
      ],
    },
  },
  aggs: {
    interactions: {
      adjacency_matrix: {
        filters: {
          positiveSentiment: { range: { 'sentiment.score': { gte: 0 } } },
          negativeSentiment: { range: { 'sentiment.score': { lt: 0 } } },
          keyword: { wildcard: { full_text: keyword } },
        },
      },
    },
  },
  };

  esBody = queries.applyFilters(esBody, senderGender, recipientsGender,
    false, senderFollowerMin, senderFollowerMax);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => body.aggregations.interactions.buckets)
    .then(data => res.send(data));
});

app.post('/api/SelectionsOverTime', (req, res) => {
  const keyword = req.body.keyword.replace(' ', '*') || '*';
  const senderGender = req.body.senderGender === undefined ? false : req.body.senderGender;
  const recipientsGender = req.body.recipientsGender === undefined ? false : req.body.recipientsGender;
  const sentiment = req.body.sentiment || false;
  const senderFollowerMin = req.body.senderFollowerMin || false;
  const senderFollowerMax = req.body.senderFollowerMax || false;
  let esBody =
  { query: {
    bool: {
      must: [
        { wildcard: { full_text: keyword } },
      ],
    },
  },
  aggs: {
    histogram: {
      date_histogram: {
        field: 'created_at',
        interval: 'day',
      },
    },
  },
  };

  esBody = queries.applyFilters(esBody, senderGender, recipientsGender,
    sentiment, senderFollowerMin, senderFollowerMax);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => body.aggregations.histogram.buckets)
    .then(data => res.send(data));
});


app.post('/api/BucketedBarChart', (req, res) => {
  const keyword = req.body.keyword.replace(' ', '*') || '*';
  const esBody =
  { query: {
    bool: {
      must: [
        { wildcard: { full_text: keyword } },
      ],
    },
  },
  aggs: {
    followerCount_ranges: {
      range: {
        field: 'sender.followers_count',
        ranges: [
          { from: 0, to: 100 },
          { from: 101, to: 1000 },
          { from: 1001, to: 10000 },
          { from: 10001, to: 100000 },
          { from: 100001, to: 1000000 },
          { from: 1000001 },
        ],
      },
      aggs: {
        gender: { terms: { field: 'sender.gender', order: { _term: 'asc' } },
          aggs: {
            docCountByGender: { value_count: { field: '_index' } },
          },
        },
      },
    },
  },
  };

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => body.aggregations.followerCount_ranges)
    .then(data => res.send(data));
});

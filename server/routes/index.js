require('dotenv').config();
const app = require('../../server.js');
const elasticsearch = require('elasticsearch');
const queries = require('./queries.js');
const clean = require('./cleanES.js');


const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace',
});
const index = 'twitter';
const type = 'tweet';

app.post('/api/KeywordAcrossGender', (req, res) => {
  const keyword = req.body.keyword ? req.body.keyword.toLowerCase().replace(' ', '*') : '*';
  const recipientsGender = req.body.recipientsGender === undefined ?
    false : req.body.recipientsGender;
  const sentiment = req.body.sentiment || false;
  const senderFollowerMin = req.body.senderFollowerMin || false;
  const senderFollowerMax = req.body.senderFollowerMax || false;
  let esBody = queries.KeywordAcrossGenderBody();

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
  const keyword = req.body.keyword ? req.body.keyword.toLowerCase().replace(' ', '*') : '*';
  const senderGender = req.body.senderGender === undefined ? false : req.body.senderGender;
  const recipientsGender = req.body.recipientsGender === undefined ?
    false : req.body.recipientsGender;
  const sentiment = req.body.sentiment || false;
  let esBody = queries.KeywordAcrossFollowerCountBody();

  esBody = queries.applyFilters(esBody, senderGender, recipientsGender,
    sentiment);

  esBody = queries.addKeywordtoAdjacencyMatrix(esBody, keyword);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => clean.cleanAdjacencyMatrix(body.aggregations.interactions.buckets))
    .then(data => res.send(data));
});

app.post('/api/KeywordAcrossSentiment', (req, res) => {
  const keyword = req.body.keyword ? req.body.keyword.toLowerCase().replace(' ', '*') : '*';
  const senderGender = req.body.senderGender === undefined ? false : req.body.senderGender;
  const recipientsGender = req.body.recipientsGender === undefined ?
    false : req.body.recipientsGender;
  const senderFollowerMin = req.body.senderFollowerMin || false;
  const senderFollowerMax = req.body.senderFollowerMax || false;
  let esBody = queries.KeywordAcrossSentimentBody();

  esBody = queries.applyFilters(esBody, senderGender, recipientsGender,
    false, senderFollowerMin, senderFollowerMax);

  esBody = queries.addKeywordtoAdjacencyMatrix(esBody, keyword);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => clean.cleanAdjacencyMatrix(body.aggregations.interactions.buckets))
    .then(data => res.send(data));
});

app.post('/api/SelectionsOverTime', (req, res) => {
  const keyword = req.body.keyword ? req.body.keyword.toLowerCase().replace(' ', '*') : '*';
  const senderGender = req.body.senderGender === undefined ? false : req.body.senderGender;
  const recipientsGender = req.body.recipientsGender === undefined ?
    false : req.body.recipientsGender;
  const sentiment = req.body.sentiment || false;
  const senderFollowerMin = req.body.senderFollowerMin || false;
  const senderFollowerMax = req.body.senderFollowerMax || false;
  let esBody = queries.SelectionsOverTimeBody();

  esBody = queries.applyFilters(esBody, senderGender, recipientsGender,
    sentiment, senderFollowerMin, senderFollowerMax);

  esBody = queries.addKeywordToMusts(esBody, keyword);

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
  const keyword = req.body.keyword ? req.body.keyword.toLowerCase().replace(' ', '*') : '*';
  let esBody = queries.BucketedBarChartBody();

  esBody = queries.addKeywordToMusts(esBody, keyword);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => body.aggregations.followerCount_ranges)
    .then(data => res.send(data));
});

app.post('/api/BucketedBarChartBodySentiment', (req, res) => {
  const keyword = req.body.keyword ? req.body.keyword.toLowerCase().replace(' ', '*') : '*';
  let esBody = queries.BucketedBarChartSentimentBody();

  esBody = queries.addKeywordToMusts(esBody, keyword);

  client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody,
  }).then(body => clean.cleanBucketedBarChartSentiment(body.aggregations.followerCount_ranges))
  // }).then(body => body.aggregations.followerCount_ranges)
    .then(data => res.send(data));
});

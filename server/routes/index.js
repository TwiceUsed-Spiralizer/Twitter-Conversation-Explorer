require('dotenv').config();
const app = require('../../server.js');
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace',
});
const index = 'twitter';
const type = 'tweet';


app.post('/api/KeywordAcrossGender', (req, res) => {
  const keyword = req.body.keyword.replace(' ', '*') || '*';
  const esBody =
  {
    aggs: {
      interactions: {
        adjacency_matrix: {
          filters: {
            femaleSender: { terms: { 'sender.gender': [1] } },
            maleSender: { terms: { 'sender.gender': [0] } },
            keyword: { wildcard: { full_text: keyword } },
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
  }).then(body => body.aggregations.interactions.buckets)
    .then(data => res.send(data));
});


app.post('/api/SelectionsOverTime', (req, res) => {
  const keyword = req.body.keyword.replace(' ', '*') || '*';
  const senderGender = req.body.senderGender || false;
  const recipientsGender = req.body.recipientsGender || false;
  const esBody =
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

  // if senderGender exists we add senderGender to the musts
  if (senderGender) {
    const toAdd = { match: { 'sender.gender': senderGender } };
    esBody.query.bool.must.push(toAdd);
  }

  // if recipientsGender exists we add recipientsGender to the musts
  if (recipientsGender) {
    const toAdd = { match: { 'recipients.gender': recipientsGender } };
    esBody.query.bool.must.push(toAdd);
  }

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

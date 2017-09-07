const app = require('../../server.js')
const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});



app.get('/api/example', (req, res) => {

  client.search({
    index: 'tweets',
    type: 'tweet',
    body: {
      query: {
        bool: {
          must: [
            { match: { 'sender.gender': 'female' }},
            // { match: { 'recipients.gender': 'male' }},
            { match: { 'full_text': 'sorry' }},
          ],
        },
      },
    }
  }).then((body) => {

    var femaleSorry = body.hits.total;

    return client.search({
      index: 'tweets',
      type: 'tweet',
      body: {
        query: {
          bool: {
            must: [
              { match: { 'sender.gender': 'female' }},
              // { match: { 'recipients.gender': 'male' }},
            ],
          },
        },
      }
    }).then((body) => ({femaleSorry, body}))

  }, function (err) {
      console.trace(err.message);
  }).then( ({femaleSorry, body}) => {
    var female = body.hits.total;
    return client.search({
      index: 'tweets',
      type: 'tweet',
      body: {
        query: {
          bool: {
            must: [
              { match: { 'sender.gender': 'male' }},
              // { match: { 'recipients.gender': 'female' }},
              { match: { 'full_text': 'sorry' }},
            ],
          },
        },
      }
    }).then((body) => ({femaleSorry, female, maleSorry: body.hits.total}));
  }).then(({femaleSorry, female, maleSorry}) => {
    return client.search({
      index: 'tweets',
      type: 'tweet',
      body: {
        query: {
          bool: {
            must: [
              { match: { 'sender.gender': 'male' }},
              // { match: { 'recipients.gender': 'female' }},
            ],
          },
        },
      }
    }).then((body) => ({femaleSorry, female, maleSorry, male: body.hits.total}));
  }).then(data => res.send(data));


})

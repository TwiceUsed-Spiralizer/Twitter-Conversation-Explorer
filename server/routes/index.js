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
            { match: { 'recipients.gender': 'male' }},
            { match: { 'full_text': 'sorry' }},
          ],
          must_not: [
            { match: {full_text: 'not sorry'} }
          ]
        },
      },
    }
  }).then((body) => {

      var hits1 = body.hits.total;

      return client.search({
        index: 'tweets',
        type: 'tweet',
        body: {
          must: {
            match: [{
              full_text: 'sorry'
            }],
          },
          aggs: {
            gender: {
              terms: {field: 'sender.follower_count'}
            }
          }
        }
      }).then((body) => ({hits1, body}))

      }, function (err) {
          console.trace(err.message);
      }).then( ({hits1, body}) => {
        var hits2 = body.hits.total;
        res.send({hits1, body});
      })


  })

const app = require('../../server.js')
const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});



app.get('/api/example', (req, res) => {

  client.search({
    index: 'twitter',
    type: 'tweet',
    body: {
      query: {
        match: {
          'sender.gender': 'female',
          'recipients.gender': 'male',
          'full_text': 'sorry'
          // 'text': 'the',
          // 'text': 'love'
        }
      }
    }
  }).then((body) => {

      var hits1 = body.hits.total;

      return client.search({
        index: 'twitter',
        type: 'tweet',
        body: {
          query: {
            match: {
              'sender.gender': 'male',
              'recipients.gender': 'female',
              'full_text': 'sorry'
              // 'text': 'the',
              // 'text': 'hate'
            }
          }
        }
      }).then((body) => ({hits1, body}))

      }, function (err) {
          console.trace(err.message);
      }).then( ({hits1, body}) => {
        var hits2 = body.hits.total;
        res.send({hits1, hits2});
      })


  })

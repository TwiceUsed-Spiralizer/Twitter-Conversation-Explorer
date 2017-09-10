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



app.get('/api/KeywordAcrossGender', (req, res) => {
client.search({
    index: 'tweets',
    type: 'tweet',
    "size": 0,
    "from": 0,
    body: {
      "aggs" : {
        "interactions" : {
          "adjacency_matrix" : {
            "filters" : {
              "female" : { "terms" : { 'sender.gender' : ["female"] }},
              "male" : { "terms" : { 'sender.gender' : ["male"] }},
              "keyword" : { "match" : { 'full_text': 'sorry' }}
            }
          }
        }
      }
    }
  }).then((body) => {
    return body.aggregations.interactions.buckets
  }).then((data) => res.send(data))
})





app.post('/api/SelectionsOverTime', (req, res) => {

const keyword = req.body.keyword || '*'
const senderGender = req.body.senderGender || '*'
const recipientsGender = req.body.recipientsGender || '*'

client.search({
    index: 'tweets',
    type: 'tweet',
    size: 0,
    from: 0,
    body: {
      "query": {
        "bool": {
          "must": [
            { "wildcard" : { "full_text" : keyword } },
            { "wildcard" : { "sender.gender" : senderGender } },
            { "wildcard" : { "recipients.gender" : recipientsGender } },
          ],
        },
      },
      "aggs" : {
        "histogram" : {
          "date_histogram" : {
              "field" : "created_at",
              "interval" : "day"
          }
        }
      }
    }
  }).then((body) => {
    return body.aggregations.histogram.buckets;
  }).then((data) => res.send(data))
})



app.post('/api/reqbod', (req, res) => {
  console.log(req.body)
  res.send(req.body.keyword)

})














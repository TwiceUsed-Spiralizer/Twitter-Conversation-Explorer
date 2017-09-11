require('dotenv').config();
const app = require('../../server.js')
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace'
});
const index = 'twitter';
const type = 'tweet';


app.get('/api/example', (req, res) => {

  client.search({
    index,
    type,
    body: {
      query: {
        bool: {
          must: [
            { match: { 'sender.gender': 1 }},
            { match: { 'full_text': 'sorry' }},
          ],
        },
      },
    }
  }).then((body) => {

    var femaleSorry = body.hits.total;

    return client.search({
      index,
      type,
      body: {
        query: {
          bool: {
            must: [
              { match: { 'sender.gender': 1 }},
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
      index,
      type,
      body: {
        query: {
          bool: {
            must: [
              { match: { 'sender.gender': 0 }},
              { match: { 'full_text': 'sorry' }},
            ],
          },
        },
      }
    }).then((body) => ({femaleSorry, female, maleSorry: body.hits.total}));
  }).then(({femaleSorry, female, maleSorry}) => {
    return client.search({
      index,
      type,
      body: {
        query: {
          bool: {
            must: [
              { match: { 'sender.gender': 0 }},
            ],
          },
        },
      }
    }).then((body) => ({femaleSorry, female, maleSorry, male: body.hits.total}));
  }).then(data => res.send(data)).catch(console.error);


})


app.get('/api/KeywordAcrossGender', (req, res) => {
client.search({
    index,
    type,
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


app.post('/api/KeywordOverTime', (req, res) => {

const keyword = req.body.keyword || '*';
const senderGender = req.body.senderGender || false;
const recipientsGender = req.body.recipientsGender || false;

const esBody =
{ "query": {
  "bool": {
    "must": [
      { "wildcard" : { "full_text" : keyword } }
    ]
  }
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


// if senderGender exists we add senderGender to the musts
if (senderGender) {
  const toAdd = { match: { 'sender.gender': senderGender } }
  esBody.query.bool.must.push(toAdd)
}

// if recipientsGender exists we add recipientsGender to the musts
if (recipientsGender) {
  const toAdd = { match: { 'recipients.gender': recipientsGender } }
  esBody.query.bool.must.push(toAdd)
}

//console.log(JSON.stringify(esBody.query.bool.must) + "SCOTTSCOTTSCOTT")

client.search({
    index,
    type,
    size: 0,
    from: 0,
    body: esBody
  }).then((body) => {
    return body.aggregations.histogram.buckets;
  }).then((data) => res.send(data))



})







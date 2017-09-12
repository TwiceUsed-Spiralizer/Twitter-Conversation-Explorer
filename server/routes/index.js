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

const keyword = req.body.keyword || '*';

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
              "femaleSender" : { "terms" : { 'sender.gender' : ["female"] }},
              "maleSender" : { "terms" : { 'sender.gender' : ["male"] }},
              "keyword" : { "wildcard" : { "full_text" : keyword } }
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






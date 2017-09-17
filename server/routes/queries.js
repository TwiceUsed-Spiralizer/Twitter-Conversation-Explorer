// Elasticsearch queries and helper functions
const applyFilters = (esBody, senderGender, recipientsGender,
  sentiment, senderFollowerMin, senderFollowerMax) => {
  if (senderGender !== false) {
    const toAdd = { match: { 'sender.gender': senderGender } };
    esBody.query.bool.must.push(toAdd);
  }

  if (recipientsGender !== false) {
    const toAdd = { match: { 'recipients.gender': recipientsGender } };
    esBody.query.bool.must.push(toAdd);
  }

  if (sentiment) {
    if (sentiment >= 0) {
      esBody.query.bool.must.push({ range: { 'sentiment.score': { gt: 0 } } });
    } else {
      esBody.query.bool.must.push({ range: { 'sentiment.score': { lt: 0 } } });
    }
  }

  if (senderFollowerMin) {
    esBody.query.bool.must.push({ range: { 'sender.following_count': { gte: senderFollowerMin } } });
  }

  if (senderFollowerMax) {
    esBody.query.bool.must.push({ range: { 'sender.following_count': { lte: senderFollowerMax } } });
  }

  return esBody;
};

const addKeywordtoAdjacencyMatrix = (esBody, keyword) => {
  const body = esBody;
  body.aggs.interactions.adjacency_matrix.filters.keyword = { wildcard: { full_text: keyword } };
  return body;
};

const KeywordAcrossGenderBody = () =>
  ({ query: {
    bool: {
      must: [
      ],
    },
  },
  aggs: {
    interactions: {
      adjacency_matrix: {
        filters: {
          femaleSender: { terms: { 'sender.gender': [1] } },
          maleSender: { terms: { 'sender.gender': [0] } },
        },
      },
    },
  },
  });

const KeywordAcrossFollowerCountBody = () =>
  ({ query: {
    bool: {
      must: [
      ],
    },
  },
  aggs: {
    interactions: {
      adjacency_matrix: {
        filters: {
          over500followers: { range: { 'sender.following_count': { gte: 500 } } },
          under500followers: { range: { 'sender.following_count': { lt: 500 } } },
        },
      },
    },
  },
  });

const KeywordAcrossSentimentBody = () =>
  ({ query: {
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
        },
      },
    },
  },
  });

// const SelectionsOverTimeBody =
// const BucketedBarChartBody =

module.exports = {
  applyFilters,
  addKeywordtoAdjacencyMatrix,
  KeywordAcrossGenderBody,
  KeywordAcrossFollowerCountBody,
  KeywordAcrossSentimentBody,
};

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

const addKeywordToMusts = (esBody, keyword) => {
  const body = esBody;
  body.query.bool.must.push({ wildcard: { full_text: keyword } });
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
          positiveSentiment: { range: { 'sentiment.score': { gt: 0 } } },
          negativeSentiment: { range: { 'sentiment.score': { lt: 0 } } },
        },
      },
    },
  },
  });

const SelectionsOverTimeBody = () =>
  ({ query: {
    bool: {
      must: [
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
  });

const BucketedBarChartBody = () =>
  ({ query: {
    bool: {
      must: [
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
  });

const BucketedBarChartSentimentBody = () =>
  ({ query: {
    bool: {
      must: [
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
        interactions: {
          adjacency_matrix: {
            filters: {
              positiveSentiment: { range: { 'sentiment.score': { gt: 0 } } },
              negativeSentiment: { range: { 'sentiment.score': { lt: 0 } } },
            },
          },
        },
      },
    },
  },
  });

module.exports = {
  applyFilters,
  addKeywordtoAdjacencyMatrix,
  KeywordAcrossGenderBody,
  KeywordAcrossFollowerCountBody,
  KeywordAcrossSentimentBody,
  SelectionsOverTimeBody,
  addKeywordToMusts,
  BucketedBarChartBody,
  BucketedBarChartSentimentBody,
};

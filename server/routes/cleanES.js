const cleanAdjacencyMatrix = (buckets) => {
  const obj = {};
  buckets.forEach((bucket) => {
    obj[bucket.key] = bucket.doc_count;
  });
  return obj;
};

const cleanBucketedBarChartSentiment = (results) => {
  const obj = {};
  results.buckets.forEach((bucket) => {
    if (!obj[bucket.key]) {
      obj[bucket.key] = { positiveSentiment: 0, negativeSentiment: 0 };
    }
    obj[bucket.key].positiveSentiment += bucket.interactions.buckets[1].doc_count;
    obj[bucket.key].negativeSentiment += bucket.interactions.buckets[0].doc_count;
  });
  return obj;
};

module.exports = {
  cleanAdjacencyMatrix,
  cleanBucketedBarChartSentiment,
};

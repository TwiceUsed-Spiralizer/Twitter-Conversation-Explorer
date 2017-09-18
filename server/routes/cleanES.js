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
      obj[bucket.key] = [0, 0];
    }

    bucket.sentimentScore.buckets.forEach((subBucket) => {
      if (subBucket.key < 0) {
        obj[bucket.key][0] += subBucket.doc_count;
      }
      if (subBucket.key > 0) {
        obj[bucket.key][1] += subBucket.doc_count;
      }
    });
  });
  return obj;
};

module.exports = {
  cleanAdjacencyMatrix,
  cleanBucketedBarChartSentiment,
};

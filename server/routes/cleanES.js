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

const cleanGender = (input) => {
  if (input === 1 || input === 0) {
    return input;
  } else if (input === 'male') {
    return 0;
  } else if (input === 'female') {
    return 1;
  }
  return false;
};

module.exports = {
  cleanAdjacencyMatrix,
  cleanBucketedBarChartSentiment,
  cleanGender,
};

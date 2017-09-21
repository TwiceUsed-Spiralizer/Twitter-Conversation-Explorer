const cleanAdjacencyMatrix = (buckets, categoryA, categoryB) => {
  const obj = {};
  buckets.forEach((bucket) => {
    obj[bucket.key] = bucket.doc_count;
  });

  if (!obj.hasOwnProperty(`aaa_${categoryA}&keyword`)) {
    obj[`aaa_${categoryA}&keyword`] = 0;
  }

  if (!obj.hasOwnProperty(`bbb_${categoryB}&keyword`)) {
    obj[`bbb_${categoryB}&keyword`] = 0;
  }

  if (!obj.hasOwnProperty('keyword')) {
    obj.keyword = 0;
  }
  return obj;
};

const cleanBucketedBarChartSentiment = (results) => {
  const labels = ['0.0-100.0', '101.0-1000.0', '1001.0-10000.0', '10001.0-100000.0', '100001.0-1000000.0', '1000001.0-*'];
  const obj = {};

  for (let i = 0; i < labels.length; i++) {
    obj[labels[i]] = { positiveSentiment: 0, negativeSentiment: 0 };
  }

  results.buckets.forEach((bucket) => {
    if (bucket.interactions.buckets[1] !== undefined) {
      obj[bucket.key].positiveSentiment += bucket.interactions.buckets[1].doc_count;
    }
    if (bucket.interactions.buckets[0] !== undefined) {
      obj[bucket.key].negativeSentiment += bucket.interactions.buckets[0].doc_count;
    }
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

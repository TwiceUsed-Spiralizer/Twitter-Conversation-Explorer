const cleanAdjacencyMatrix = (buckets) => {
  const obj = {};
  buckets.forEach((bucket) => {
    obj[bucket.key] = bucket.doc_count;
  });
  return obj;
};

module.exports = {
  cleanAdjacencyMatrix,
};

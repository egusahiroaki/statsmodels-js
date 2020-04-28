// Mean squared error regression loss
const meanSquaredError = (yTrue, yPred) => {
  // TODO: assert Size

  const n = yTrue.length;

  let diff = 0;
  for (let i = 0; i < n; i++) {
    diff += Math.pow(yTrue[i] - yPred[i], 2);
  }
  return diff / n;
};

module.exports = { meanSquaredError };

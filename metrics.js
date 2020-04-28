import _ from "lodash";

// Mean squared error regression loss
const meanSquaredError = (yTrue, yPred) => {
  if (yTrue.length !== yPred.length) {
    throw new Error("The size of both arrays should be same.");
  }

  return (
    _.sum(_.map(yTrue, (e, i) => Math.pow(yTrue[i] - yPred[i], 2))) /
    yTrue.length
  );
};

module.exports = { meanSquaredError };

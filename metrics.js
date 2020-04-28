import _ from "lodash";

// Mean squared error regression loss
const meanSquaredError = (yTrue, yPred, options = { squared: true }) => {
  if (yTrue.length !== yPred.length) {
    throw new Error("The size of both arrays should be same.");
  }
  const result =
    _.sum(_.map(yTrue, (e, i) => Math.pow(yTrue[i] - yPred[i], 2))) /
    yTrue.length;
  return options.squared ? result : Math.sqrt(result);
};

module.exports = { meanSquaredError };

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

// R^2 (coefficient of determination) regression score function.
const r2Score = (yTrue, yPred) => {
  // actual data average
  const y_ = _.sum(yTrue) / yTrue.length;
  return (
    1 -
    _.sum(_.map(yTrue, (e, i) => Math.pow(e - yPred[i], 2))) /
      _.sum(_.map(yTrue, (e) => Math.pow(e - y_, 2)))
  );
};

export { meanSquaredError, r2Score };

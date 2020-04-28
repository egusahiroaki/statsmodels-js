import _ from "lodash";

// Mean squared error regression loss
const meanSquaredError = (yTrue, yPred) => {
  // TODO: assert Size
  return (
    _.sum(_.map(yTrue, (e, i) => Math.pow(yTrue[i] - yPred[i], 2))) /
    yTrue.length
  );
};

module.exports = { meanSquaredError };

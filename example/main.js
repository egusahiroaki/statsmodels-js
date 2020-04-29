// needed to run `npm run build`
const Stats = require("../dist/index");
const x = [
  [10, 20, 30],
  [20, 42, 63],
  [4, 8, 16],
];
const y = [30, 50, 70];

const result = new Stats.MultipleLinearRegression(x, y).fit();
console.log(result.summary());

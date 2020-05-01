# statsmodels-js
[![npm version](https://badge.fury.io/js/statsmodels-js.svg)](https://badge.fury.io/js/statsmodels-js)  [![Build Status](https://travis-ci.org/egusahiroaki/statsmodels-js.svg?branch=master)](https://travis-ci.org/egusahiroaki/statsmodels-js) [![Coverage Status](https://coveralls.io/repos/github/egusahiroaki/statsmodels-js/badge.svg?branch=master)](https://coveralls.io/github/egusahiroaki/statsmodels-js?branch=master) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) 



A JavaScript implementation of statistics methods.

## install

    npm install statsmodels-js



## How to use

### Statistical Test


#### unpaired T-Test

```javascript
const Stats = require("statsmodels-js");

// test assumes that the variances of both populations are equal.
const result1 = Stats.tTestInd([4, 5, 6, 4, 5], [1, 2, 3, 4, 5], true);
/*
  {
    statistic: 2.2499999999999996,
    se: 1.2649110640673518,
    df: 8,
    pValue: 0.054567305799939875
  }
*/

// test doesn't assumes that the variances of both populations are equal.
const result2 = Stats.tTestInd([4, 5, 6, 4, 5], [1, 2, 3, 4, 5], false);
/*
  {
    statistic: 2.2499999999999996,
    se: 0.8,
    df: 6.077151335311573,
    pValue: 0.06488370852885418
  }
*/
```

#### T-test for the mean of ONE group of scores.

```javascript
const result = Stats.tTest1Sample([5, 5, 5, 5, 5, 5, 6, 10], 5.0);
/*
  {
    mean: 5.75,
    sd: 1.6393596310755,
    statistic: 1.2104198771788937,
    pValue: 0.26539803962501435
  }
*/
```

### Linear Regression

```javascript
const Stats = require("statsmodels-js");
const x = [1, 2, 3];
const y = [3, 5, 7];

const result = new Stats.SimpleLinearRegression(x, y).fit();
result.summary()
/*
{
  r2Score: 0.9642857142857142,
  coef: 1.5,
  intercept: 0.3333333333333333
}
*/

// prediction
result.predict([10, 20, 30]);
// [ 21, 41, 61 ]
```

```javascript
const Stats = require("statsmodels-js");
const x = [
  [10, 20, 30],
  [20, 42, 63],
  [4, 8, 16],
];
const y = [30, 50, 70];

const result = new Stats.MultipleLinearRegression(x, y).fit();
result.summary()
/*
{
  x1: -5.419270833334926,
  x2: -14.610026041665915,
  x3: 11.98828125,
  intercept: 16.74479166666713,
  r2Score: 1
}
*/

/* prediction case 1 */
result.predict([10, 20, 30])
// [[29.999999999999545]]

/* prediction case 2 */
result.predict([
  [10, 20, 30],
  [1, 2, 3],
]);
/*
  [[29.999999999999545], [18.070312500000373]];
*/
```
# statsmodels-js
[![npm version](https://badge.fury.io/js/statsmodels-js.svg)](https://badge.fury.io/js/statsmodels-js)  [![Build Status](https://travis-ci.org/egusahiroaki/statsmodels-js.svg?branch=master)](https://travis-ci.org/egusahiroaki/statsmodels-js) [![Coverage Status](https://coveralls.io/repos/github/egusahiroaki/statsmodels-js/badge.svg?branch=master)](https://coveralls.io/github/egusahiroaki/statsmodels-js?branch=master) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) 



A JavaScript implementation of statistics methods.

## install

    npm install statsmodels-js



## How to use

### Statistics

basic statistical summary

```javascript
const Stats = require("statsmodels-js");

const result = Stats.descripeStats([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

/*
{
  size: 10,
  min: 0,
  max: 9,
  mean: 4.5,
  se: 0.9082951062292475,
  variance: 9.166666666666666,
  skewness: 0,
  kurtosis: -1.2
}
*/
```

### Correlation

Pearson correlation coefficient

```javascript
const Stats = require("statsmodels-js");

const a = [0, 0, 0, 1, 1, 1, 1];
const b = [0, 1, 2, 3, 4, 5, 6];
const result = Stats.pearsonr(a, b);

/*
{
  r: 0.8660254037844386
  pValue: 0.011724811003882547
}
*/
```

### Similarity

```javascript
const Stats = require("statsmodels-js");

const a = [1, 1];
const b = [0, 1];
const result1 = Stats.cosSimilarity(a, b);
// 0.7071067811865475

const a = [1, 1];
const b = [1, 1];
const result2 = Stats.cosSimilarity(a, b);
// 1
```

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

#### T-test for 2 related or repeated samples

```javascript
const result = tTestRel([4, 5, 6, 4, 5], [1, 2, 3, 4, 5]);
/*
  {
    statistic: 2.449489742783178,
    pValue: 0.07048399691022006
  }
*/
```

#### Chi-squared test

goodness-of-fit test

```javascript
const result = chiSqaure([10, 1, 1, 1], [15, 1, 1, 1]);

/*
  {
    statistic: 1.6666666666666667,
    pValue: 0.6443698056370236
  }
*/
```

test for independence

```javascript
const result = chi2Contingency([55, 22, 16, 7], [40, 32, 24, 4]);

/*
  {
    statistic: 6.63845472266525,
    pValue: 0.08435923449835192
  }
*/
```

#### One-Way ANOVA Test

The one-way ANOVA tests the null hypothesis that two or more groups have the same population mean. 

```javascript
const a = [5, 6, 5, 5, 7];
const b = [6, 6, 7, 5, 6];
const result = Stats.oneWayANOVA(a, b);
// { statistic: 0.6153846153846155, pValue: 0.45536634355271177 }
```

```javascript
const a = [66, 62, 80, 50, 57, 68, 73, 65];
const b = [62, 60, 66, 63, 55, 53, 59, 63];
const c = [65, 60, 78, 52, 59, 66, 73, 64];
const d = [52, 59, 44, 67, 47, 53, 58, 49];
const result = oneWayANOVA(a, b, c, d);
/*
  {
    statistic: 4.024870903151017,
    pValue: 0.01685989800789034
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
# statsmodels-js
[![npm version](https://badge.fury.io/js/statsmodels-js.svg)](https://badge.fury.io/js/statsmodels-js)  [![Build Status](https://travis-ci.org/egusahiroaki/statsmodels-js.svg?branch=master)](https://travis-ci.org/egusahiroaki/statsmodels-js) ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)



A JavaScript implementation of statistics methods.

## install

    npm install statsmodels-js



## How to use

```javascript
const Stats = require("statsmodels-js");
const x = [1, 2, 3];
const y = [3, 5, 7];

const result = new Stats.SimpleLinearRegression(x, y).fit();
console.log(result.summary())
/*
{
  r2Score: 0.9642857142857142,
  coef: 1.5,
  intercept: 0.3333333333333333
}
*/
```

```javascript
const Stats = require("./dist/index");
const x = [
  [10, 20, 30],
  [20, 42, 63],
  [4, 8, 16],
];
const y = [30, 50, 70];

const result = new Stats.MultipleLinearRegression(x, y).fit();
console.log(result.summary());

/*
{
  x1: -5.419270833334926,
  x2: -14.610026041665915,
  x3: 11.98828125,
  intercept: 16.74479166666713,
  r2Score: 1
}
*/
```
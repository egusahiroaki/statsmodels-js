# statsmodels-js

A JavaScript implementation of statistics methods.

## install

    npm install statsmodels-js



## How to use

```javascript
const Stats = require("statsmodels-js");
const x = [1, 2, 3];
const y = [3, 5, 7];

const result = new Stats.SimpleLinearRegression(x, y).fit()
console.log(result1)
// { coef: 2, intercept: 1 }
```

```javascript
const x = [[1], [2], [3]];
const y = [30, 50, 70];

const result = new Stats.MultipleLinearRegression(x, y).fit()
console.log(result)
// [ [ 10 ], [ 20 ] ] first element is intercept, and the elements for the second and subsequent are coefficients.
```
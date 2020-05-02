import {
  dot,
  transpose,
  hasEverySameArray,
  unitMatrix,
  matrixAdd,
} from "./util";
import _ from "lodash";
import { solve } from "./linalg";
import { r2Score } from "./metrics";
import jStat from "jstat";
import { Vector } from "../lib/Vector";

class SimpleLinearRegression {
  constructor(x, y) {
    this._x = x;
    this._y = y;

    this._vectorX = new Vector(x);
    this._vectorY = new Vector(y);
  }

  fit() {
    const n = this._vectorX.length();
    this.coef =
      (this._vectorX.dot(this._vectorY) -
        (this._vectorX.sum() * this._vectorY.sum()) / n) /
      (this._vectorX.multiplyVec(this._vectorX).sum() -
        Math.pow(this._vectorX.sum(), 2) / n);

    this.intercept =
      (this._vectorY.sum() - this.coef * this._vectorX.sum()) / n;
    return this;
  }

  predict(x) {
    const vectorX = new Vector(x);
    return vectorX.multiply(this.coef).add(this.intercept).values();
  }

  summary() {
    const yPred = this.predict(this._x);
    const r2 = r2Score(this._y, yPred);
    return {
      r2Score: r2,
      coef: this.coef,
      intercept: this.intercept,
    };
  }
}

class MultipleLinearRegression {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._w = null;

    // the number of variables
    this._VAR_NUM = x[0].length;

    // check multi-colinearlity
    const t = transpose(this._x);
    this._hasMultiCo = hasEverySameArray(t);
  }

  fit() {
    // destructive change
    _.map(this._x, (e) => e.unshift(1));
    const x = this._x;
    const a = dot(transpose(x), x);
    const b = dot(transpose(x), this._y);
    this._w = solve(a, b);

    // if multi-colinearlity, top coef is distributed into every coef
    this.intercept = this._w[0][0];
    if (this._hasMultiCo) {
      // TODO: refactor
      const weight = this._w[1][0];
      const dividedW = weight / (x[0].length - 1);
      let updateW = [[this.intercept]];
      for (let i = 1; i < this._w.length; i++) {
        updateW.push([dividedW]);
      }
      this._w = updateW;
    }

    let xs = {};
    // dynamic coefficient variable
    _.each(this._w.slice(1, this._w.length), (e, i) =>
      eval("xs['x" + parseInt(i + 1) + "'] = e[0]")
    );
    this._xs = xs; // used in summary()
    Object.assign(this, xs);
    return this;
  }

  predict(x) {
    // check One-dimensional array
    if (typeof x[0][0] === "undefined") {
      x = [x];
    }

    // to check the x has same size elements
    const inputVarNums = _.map(x, (e) => {
      return e.length;
    });

    const isValid =
      _.filter(inputVarNums, (e) => {
        return e !== this._VAR_NUM;
      }).length === 0;
    // assert the number of variables
    if (!isValid) {
      throw new Error(`The number of variables should be ${this._VAR_NUM}`);
    }
    _.map(x, (e) => e.unshift(1));
    return dot(x, this._w);
  }

  summary() {
    // TODO: In fit(), unshift 1 for intercept calculation, but have to removed.
    _.map(this._x, (e) => e.shift());
    const yPred = this.predict(this._x);
    const r2 = r2Score(this._y, yPred);
    let summary = {};
    // dynamic coefficient variable
    Object.assign(summary, this._xs);
    summary["intercept"] = this.intercept;
    summary["r2Score"] = r2;

    return summary;
  }
}

class RidgeRegression {
  constructor(x, y, lambda = 1) {
    this._x = x;
    this._y = y;
    this._w = null;
    this._lambda = lambda;
  }

  fit() {
    // destructive change
    _.map(this._x, (e) => e.unshift(1));
    const x = this._x;

    const a = matrixAdd(
      dot(transpose(x), x),
      unitMatrix(x[0].length, this._lambda)
    );
    const b = dot(transpose(x), this._y);
    this._w = solve(a, b); // intercept, coefficient

    return this;
  }

  predict(x) {
    // destructive change
    _.map(x, (e) => e.unshift(1));
    return dot(x, this._w);
  }
}

// Calculate the T-test for the mean of ONE group of scores.
const tTest1Sample = (a, value) => {
  const mean = _.sum(a) / a.length;
  const sd = Math.sqrt(
    _.sum(
      _.map(a, (e) => {
        return Math.pow(e - mean, 2);
      })
    ) / a.length
  );

  const df = a.length - 1;

  // const statistic = jStat.tscore(value, a);
  const statistic = (mean - value) / (sd / Math.sqrt(df));

  // two sides
  const pValue = jStat.ttest(statistic, a.length, 2);
  return {
    mean,
    sd,
    statistic,
    pValue,
  };
};

// unpaired T test
// Calculate the T-test for the means of two independent samples of scores.
// https://www.statsdirect.co.uk/help/parametric_methods/utt.htm
// https://github.com/scipy/scipy/blob/adc4f4f7bab120ccfab9383aba272954a0a12fb0/scipy/stats/stats.py#L5141-L5266
const tTestInd = (a, b, equalVar = true) => {
  const vectorA = new Vector(a);
  const vectorB = new Vector(b);

  let tStatictic;
  let df;
  let se;
  let pValue;

  if (equalVar) {
    df = vectorA.length() + vectorB.length() - 2;

    // pooled variance
    let sVar =
      ((vectorA.length() - 1) * vectorA.unbiasedVar() +
        (vectorB.length() - 1) * vectorB.unbiasedVar()) /
      df;

    se = Math.sqrt(sVar);
    tStatictic =
      (vectorA.mean() - vectorB.mean()) /
      Math.sqrt(sVar * (1 / vectorA.length() + 1 / vectorB.length()));

    pValue = jStat.ttest(tStatictic, df + 1, 2);
  }

  if (!equalVar) {
    // variances are not same. Hence, variances should be used separately.
    // https://en.wikipedia.org/wiki/Welch%27s_t-test
    se = Math.sqrt(
      vectorA.unbiasedVar() / vectorA.length() +
        vectorB.unbiasedVar() / vectorB.length()
    );

    tStatictic = (vectorA.mean() - vectorB.mean()) / se;
    const vA = vectorA.unbiasedVar() / vectorA.length();
    const vB = vectorB.unbiasedVar() / vectorB.length();
    df =
      Math.pow(vA + vB, 2) /
      (Math.pow(vA, 2) / (vectorA.length() - 1) +
        Math.pow(vB, 2) / (vectorB.length() - 1));

    pValue = jStat.ttest(tStatictic, df + 1, 2);
  }

  return {
    statistic: tStatictic,
    se,
    df,
    pValue,
  };
};

// T-test for means of two independent samples from descriptive statistics.
const tTestIndFromStats = (mean1, sd1, n1, mean2, sd2, n2, equalVar = true) => {
  let tStatictic;
  let df;
  let se;
  let pValue;

  if (equalVar) {
    df = n1 + n2 - 2;

    // pooled variance
    let sVar = ((n1 - 1) * Math.pow(sd1, 2) + (n2 - 1) * Math.pow(sd2, 2)) / df;

    se = Math.sqrt(sVar);
    tStatictic = (mean1 - mean2) / Math.sqrt(sVar * (1 / n1 + 1 / n2));

    pValue = jStat.ttest(tStatictic, df + 1, 2);
  }

  if (!equalVar) {
    // variances are not same. Hence, variances should be used separately.
    // https://en.wikipedia.org/wiki/Welch%27s_t-test
    se = Math.sqrt(sd1 / n1 + sd2 / n2);

    tStatictic = (mean1 - mean2) / se;
    const vA = Math.pow(sd1, 2) / n1;
    const vB = Math.pow(sd2, 2) / n2;
    df =
      Math.pow(vA + vB, 2) /
      (Math.pow(vA, 2) / (n1 - 1) + Math.pow(vB, 2) / (n2 - 1));

    pValue = jStat.ttest(tStatictic, df + 1, 2);
  }

  return {
    statistic: tStatictic,
    pValue,
  };
};

//Calculate the t-test on TWO RELATED samples of scores, a and b.
const tTestRel = (a, b) => {
  const vectorA = new Vector(a);
  const vectorB = new Vector(b);
  const df = vectorA.length() - 1;
  const diffVec = vectorA.substract(vectorB);
  const mean = diffVec.mean();
  const uv = diffVec.unbiasedVar();
  const denom = Math.sqrt(uv / vectorA.length());

  const tStatictic = mean / denom;
  const pValue = jStat.ttest(tStatictic, df + 1, 2);
  return {
    statistic: tStatictic,
    pValue,
  };
};

// goodness-of-fit test
// The chi-square test tests the null hypothesis that the categorical data has the given frequencies.
const chiSqaure = (a, b) => {
  const vectorA = new Vector(a);
  const vectorB = new Vector(b);
  const statistic = vectorA.substract(vectorB).pow(2).divideVec(vectorB).sum();

  const df = ([a, b].length - 1) * (a.length - 1);
  const pValue = 1 - jStat.chisquare.cdf(statistic, df);
  return {
    statistic,
    pValue,
  };
};

// Chi-square test of independence of variables in a contingency table.
const chi2Contingency = (a, b) => {
  const vectorA = new Vector(a);
  const vectorB = new Vector(b);

  const expected = vectorA.addVec(vectorB).divide(2);
  const statistic =
    vectorA.substract(expected).pow(2).divideVec(expected).sum() +
    vectorB.substract(expected).pow(2).divideVec(expected).sum();

  const df = ([a, b].length - 1) * (a.length - 1);
  const pValue = 1 - jStat.chisquare.cdf(statistic, df);
  return {
    statistic,
    pValue,
  };
};

export {
  SimpleLinearRegression,
  MultipleLinearRegression,
  RidgeRegression,
  tTest1Sample,
  tTestInd,
  tTestIndFromStats,
  tTestRel,
  chiSqaure,
  chi2Contingency,
};

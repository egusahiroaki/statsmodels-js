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

class SimpleLinearRegression {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  fit() {
    const n = this._x.length;
    this.coef =
      (dot(this._x, this._y) - (_.sum(this._y) * _.sum(this._x)) / n) /
      (_.sum(_.map(this._x, (e) => e * e)) - Math.pow(_.sum(this._x), 2) / n);

    this.intercept = (_.sum(this._y) - this.coef * _.sum(this._x)) / n;

    return this;
  }

  predict(x) {
    return _.map(x, (e) => this.coef * e + this.intercept);
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

// goodness-of-fit test
// The chi-square test tests the null hypothesis that the categorical data has the given frequencies.
const chiSqaure = (a, b) => {
  const statistic = _.sum(
    _.map(a, (e, i) => {
      return Math.pow(e - b[i], 2) / b[i];
    })
  );

  const df = ([a, b].length - 1) * (a.length - 1);
  const pValue = 1 - jStat.chisquare.cdf(statistic, df);
  return {
    statistic,
    pValue,
  };
};

// Chi-square test of independence of variables in a contingency table.
const chi2Contingency = (a, b) => {
  const expected = [];
  for (let i = 0; i < a.length; i++) {
    expected.push((a[i] + b[i]) / 2);
  }
  const statistic =
    _.sum(
      _.map(a, (e, i) => {
        return Math.pow(e - expected[i], 2) / expected[i];
      })
    ) +
    _.sum(
      _.map(b, (e, i) => {
        return Math.pow(e - expected[i], 2) / expected[i];
      })
    );

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
  chiSqaure,
  chi2Contingency,
};

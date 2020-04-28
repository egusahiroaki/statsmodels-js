import dot from "./util";
import _ from "lodash";
import { solve } from "./linalg";

class SimpleLinearRegression {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  fit() {
    const n = this._x.length;
    const a =
      (dot(this._x, this._y) - (_.sum(this._y) * _.sum(this._x)) / n) /
      (_.sum(_.map(this._x, (e) => e * e)) - Math.pow(_.sum(this._x), 2) / n);

    const b = (_.sum(this._y) - a * _.sum(this._x)) / n;
    return {
      coef: a,
      intercept: b,
    };
  }
}

class MultipleLinearRegression {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._w = null;
  }

  fit() {
    const n = this._x.length;
    for (let i = 0; i < n; i++) {
      this._x[i].unshift(1);
    }
    const x = this._x;
    const transpose = (a) => a[0].map((_, c) => a.map((r) => r[c]));
    const a = dot(transpose(x), x);
    const b = dot(transpose(x), this._y);
    this._w = solve(a, b);
    return this._w;
  }
}

module.exports = { SimpleLinearRegression, MultipleLinearRegression };

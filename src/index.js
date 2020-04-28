import { dot, transpose } from "./util";
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
    _.map(this._x, (e) => e.unshift(1));
    const x = this._x;
    const a = dot(transpose(x), x);
    const b = dot(transpose(x), this._y);
    this._w = solve(a, b);
    return this._w;
  }

  predict(x) {
    if (typeof x[0][0] === "undefined") {
      x = [x];
    }
    _.map(x, (e) => e.unshift(1));
    return dot(x, this._w);
  }
}

export { SimpleLinearRegression, MultipleLinearRegression };

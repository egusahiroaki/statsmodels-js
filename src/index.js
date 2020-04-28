import { dot, transpose } from "./util";
import _ from "lodash";
import { solve } from "./linalg";
import { r2Score } from "./metrics";

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

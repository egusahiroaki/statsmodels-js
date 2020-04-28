import dot from "./util";
import _ from "lodash";

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

module.exports = SimpleLinearRegression;

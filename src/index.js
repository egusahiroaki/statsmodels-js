import { dot, transpose, hasEverySameArray } from "./util";
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

    // check multi-colinearlity
    const t = transpose(this._x);
    this._hasMultiCo = hasEverySameArray(t);
  }

  fit() {
    const n = this._x.length;
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
    if (typeof x[0][0] === "undefined") {
      x = [x];
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
    summary["r2"] = r2;

    return summary;
  }
}

export { SimpleLinearRegression, MultipleLinearRegression };

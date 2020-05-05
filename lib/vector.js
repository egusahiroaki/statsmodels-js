// n-dimentional array
import _ from "lodash";

class Vector {
  constructor(array) {
    this._array = array;
    this._shape = [array.length];
  }

  values() {
    return this._array;
  }

  min() {
    return _.min(this._array);
  }

  max() {
    return _.max(this._array);
  }

  sum() {
    return _.sum(this._array);
  }

  length() {
    return this._array.length;
  }

  // should add same row and col
  add(scalar) {
    return new Vector(
      _.map(this._array, (e) => {
        return e + scalar;
      })
    );
  }

  addVec(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error("invalid arguments");
    }

    if (this._shape[0] !== vector._shape[0]) {
      throw new Error("different shape");
    }

    return new Vector(
      _.map(this._array, (e, i) => {
        return e + vector._array[i];
      })
    );
  }

  substract(scalar) {
    return new Vector(
      _.map(this._array, (e) => {
        return e - scalar;
      })
    );
  }

  substractVec(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error("invalid arguments");
    }

    if (this._shape[0] !== vector._shape[0]) {
      throw new Error("different shape");
    }

    return new Vector(
      _.map(this._array, (e, i) => {
        return e - vector._array[i];
      })
    );
  }

  multiply(scalar) {
    return new Vector(
      _.map(this._array, (e) => {
        return e * scalar;
      })
    );
  }

  multiplyVec(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error("invalid arguments");
    }

    if (this._shape[0] !== vector._shape[0]) {
      throw new Error("different shape");
    }

    return new Vector(
      _.map(this._array, (e, i) => {
        return e * vector._array[i];
      })
    );
  }

  divide(scalar) {
    if (scalar === 0) {
      throw new Error("argument should be not zero");
    }
    return new Vector(
      _.map(this._array, (e) => {
        return e / scalar;
      })
    );
  }

  divideVec(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error("invalid arguments");
    }

    if (this._shape[0] !== vector._shape[0]) {
      throw new Error("different shape");
    }

    return new Vector(
      _.map(this._array, (e, i) => {
        return e / vector._array[i];
      })
    );
  }

  pow(scalar) {
    return new Vector(
      _.map(this._array, (e) => {
        return Math.pow(e, scalar);
      })
    );
  }

  dot(vector) {
    if (!(vector instanceof Vector)) {
      throw new Error("invalid arguments");
    }

    if (this._shape[0] !== vector._shape[0]) {
      throw new Error("different shape");
    }

    return new Vector(
      _.map(this._array, (e, i) => {
        return e * vector._array[i];
      })
    ).sum();
  }

  mean() {
    return _.sum(this._array) / this._array.length;
  }

  // sigma, 標準偏差
  sd() {
    return Math.sqrt(this.var());
  }

  var() {
    const mean = this.mean();
    return (
      _.sum(
        _.map(this._array, (e) => {
          return Math.pow(e - mean, 2);
        })
      ) / this._array.length
    );
  }

  unbiasedVar() {
    const mean = this.mean();
    return (
      _.sum(
        _.map(this._array, (e) => {
          return Math.pow(e - mean, 2);
        })
      ) /
      (this._array.length - 1)
    );
  }
  skewness() {
    const n = this.length();
    if (n <= 2) {
      throw new Error("array size should be over 2");
    }

    const a = n / ((n - 1) * (n - 2));
    let b = 0;
    for (let i = 0; i < n; i++) {
      b += Math.pow(
        (this._array[i] - this.mean()) / Math.sqrt(this.unbiasedVar()),
        3
      );
    }

    // for floating point number
    // + 0  is for delete -0
    return a * _.ceil(b, 10) + 0;
  }

  // implemented with third formula
  // ref: https://stats.idre.ucla.edu/other/mult-pkg/faq/general/faq-whats-with-the-different-formulas-for-kurtosis/
  kurtosis() {
    const n = this.length();
    if (n <= 3) {
      throw new Error("array size should be over 3");
    }

    const a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
    let b = 0;
    for (let i = 0; i < n; i++) {
      b +=
        Math.pow(this._array[i] - this.mean(), 4) /
        Math.pow(Math.sqrt(this.unbiasedVar()), 4);
    }

    const c = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
    return a * b - c;
  }

  // standard error of the mean, SE, 標準誤差
  sem() {
    return this.sd() / Math.sqrt(this._shape[0]);
  }
}

export default Vector;

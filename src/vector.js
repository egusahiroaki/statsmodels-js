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

  sem() {
    return this.sd() / Math.sqrt(this._shape[0]);
  }
}

export default Vector;

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

  // should add same row and col
  add(vector) {
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

  substract(vector) {
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
    );
  }

  mean() {
    return _.sum(this._array) / this._array.length;
  }

  sd() {
    const mean = this.mean();
    return Math.sqrt(
      _.sum(
        _.map(this._array, (e) => {
          return Math.pow(e - mean, 2);
        })
      ) / this._array.length
    );
  }
}

export { Vector };

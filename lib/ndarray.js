// n-dimentional array
import _ from "lodash";

// only handle one or two dimentional array
// assume array[0][0].length is equal to the ideal number of column.
class ndArray {
  constructor(array) {
    this._array = array;
    this._dimention = this._check_dimention(array);
    if (this._dimention === 2 && this._has_any_invalid_elements(array)) {
      throw new Error("invalid elements");
    }
    this._shape =
      this._dimention === 1 ? [array.length] : [array.length, array[0].length];
  }

  // should add same row and col
  add(ndarray) {
    if (!(ndarray instanceof ndArray)) {
      throw new Error("invalid arguments");
    }

    if (this._dimention === 1) {
      if (this._shape[0] !== ndarray._shape[0]) {
        throw new Error("different shape");
      }

      let sum = [];
      for (let i = 0; i < this._shape[0]; i++) {
        sum.push(this._array[i] + ndarray._array[i]);
      }
      return sum;
    }

    if (this._dimention === 2) {
      if (
        this._shape[0] !== ndarray._shape[0] ||
        this._shape[1] !== ndarray._shape[1]
      ) {
        throw new Error("different shape");
      }

      let sum = [];
      for (let i = 0; i < this._shape[0]; i++) {
        let tmp = [];
        for (let j = 0; j < this._shape[1]; j++) {
          tmp.push(this._array[i][j] + ndarray._array[i][j]);
        }
        sum.push(tmp);
      }
      return sum;
    }
  }

  multiply(scalar) {
    if (this._dimention === 1) {
      let sum = [];
      for (let i = 0; i < this._shape[0]; i++) {
        sum.push(this._array[i] * scalar);
      }
      return sum;
    }

    if (this._dimention === 2) {
      let sum = [];
      for (let i = 0; i < this._shape[0]; i++) {
        let tmp = [];
        for (let j = 0; j < this._shape[1]; j++) {
          tmp.push(this._array[i][j] * scalar);
        }
        sum.push(tmp);
      }
      return sum;
    }
  }

  sub(ndarray) {
    console.log(ndarray);
  }

  dot(ndarray) {
    console.log(ndarray);
  }

  // if there is row having different number of other rows, return True
  _has_any_invalid_elements(array) {
    const arrayOfColumnNums = _.map(array, (e) => {
      return e.length;
    });
    return (
      _.filter(arrayOfColumnNums, (e) => {
        return e !== array[0].length;
      }).length !== 0
    );
  }

  _check_dimention(array) {
    if (typeof array[0][0] === "undefined") {
      return 1;
    }
    return 2;
  }
}

export { ndArray };

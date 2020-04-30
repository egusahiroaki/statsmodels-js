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

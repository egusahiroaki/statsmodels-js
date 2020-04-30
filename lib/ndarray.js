// n-dimentional array

// only handle one or two dimentional array
class ndArray {
  constructor(array) {
    this._array = array;
    this._dimention = this._check_dimention(array);
    this._shape =
      this._dimention === 1 ? [array.length] : [array.length, array[0].length];
  }

  _check_dimention(array) {
    if (typeof array[0][0] === "undefined") {
      return 1;
    }
    return 2;
  }
}

export { ndArray };

import { transpose } from "./util";
import { SVD } from "svd-js";
import { lusolve } from "mathjs";

// With svd-js, error occurs when column number is over row number
// In that case, transpose is used
// The rank of the inverted matrix is equal to the rank of the original matrix
const matrixRank = (matrix) => {
  const rowNum = matrix.length;
  const colNum = matrix[0].length;

  if (rowNum < colNum) {
    return SVD(transpose(matrix)).q.filter((val) => {
      return val !== 0;
    }).length;
  }

  return SVD(matrix).q.filter((val) => {
    return val !== 0;
  }).length;
};

// Solve a linear matrix equation, or system of linear scalar equations.
const solve = (A, b) => {
  return lusolve(A, b);
};

export { matrixRank, solve };

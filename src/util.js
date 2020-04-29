// Return the dot product of two arrays.
// ref: https://gist.github.com/jremmen/9454479
const dot = (m1, m2) => {
  var res = [];
  var row1 = m1.length;
  var col1 = m1[0].length;
  var col2 = m2[0].length;

  // 1 x n times n x 1
  if (typeof m1[0][0] === "undefined") {
    let res = 0;
    for (let i = 0; i < row1; i++) {
      res += m1[i] * m2[i];
    }
    return res;
  }

  // n x m times m x 1
  if (typeof m2[0][0] === "undefined") {
    let res = [];
    for (let i1 = 0; i1 < row1; i1++) {
      let tmp = 0;
      for (let i2 = 0; i2 < col1; i2++) {
        tmp += m1[i1][i2] * m2[i2];
      }
      res.push(tmp);
    }
    return res;
  }

  // m x n times n x m
  for (let i1 = 0; i1 < row1; i1++) {
    res.push([]);
    for (let i2 = 0; i2 < col2; i2++) {
      res[i1].push(0);
      for (let i3 = 0; i3 < col1; i3++) {
        res[i1][i2] += m1[i1][i3] * m2[i3][i2];
      }
    }
  }
  return res;
};

const transpose = (a) => a[0].map((_, c) => a.map((r) => r[c]));

const hasEverySameArray = (a) => {
  const baseArr = a[0];

  let count = 0;
  for (let i = 1; i < a.length; i++) {
    if (JSON.stringify(baseArr) == JSON.stringify(a[i])) {
      count += 1;
    }
  }
  return count === a.length - 1;
};

// like numpy.eye
// n: Number of rows in the output
// if v = 1 unitMatrix
const unitMatrix = (n, v = 1) => {
  let r = [];
  for (let i = 0; i < n; i++) {
    let e = [];
    for (let j = 0; j < n; j++) {
      e.push(i === j ? v : 0);
    }
    r.push(e);
  }
  return r;
};

// matrix add
// a and b should be same rows and colmuns.
const matrixAdd = (a, b) => {
  // TODO assert
  let r = [];
  const rowNum = a.length;
  const colNum = a[0].length;

  for (let i = 0; i < rowNum; i++) {
    let e = [];
    for (let j = 0; j < colNum; j++) {
      e.push(a[i][j] + b[i][j]);
    }
    r.push(e);
  }

  return r;
};

export { dot, transpose, hasEverySameArray, unitMatrix, matrixAdd };

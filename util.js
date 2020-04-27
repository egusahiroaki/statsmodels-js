// Return the dot product of two arrays.
// ref: https://gist.github.com/jremmen/9454479
const dot = (m1, m2) => {
  var res = [];
  var row1 = m1.length;
  var col1 = m1[0].length;
  var col2 = m2[0].length;

  if (typeof m1[0][0] === "undefined") {
    let res = 0;
    for (let i = 0; i < row1; i++) {
      res += m1[i] * m2[i];
    }
    return res;
  }

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

module.exports = dot;

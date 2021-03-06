import {
  SimpleLinearRegression,
  MultipleLinearRegression,
  RidgeRegression,
  descripeStats,
  pearsonr,
  cosSimilarity,
  tTest1Sample,
  tTestInd,
  tTestIndFromStats,
  tTestRel,
  chiSqaure,
  chi2Contingency,
  oneWayANOVA,
} from "./index";
import _ from "lodash";

describe("SimpleLinearRegression", () => {
  describe("case 1", () => {
    const x = [1, 2, 3];
    const y = [1, 2, 3];
    const result = new SimpleLinearRegression(x, y).fit();
    test("coef: 1, intercept: 0", () => {
      const coef = result.coef;
      const intercept = result.intercept;
      expect({ coef, intercept }).toEqual({
        coef: 1,
        intercept: 0,
      });
    });

    test("predict", () => {
      const yPred = result.predict([2, 4, 6]);
      expect(yPred).toEqual([2, 4, 6]);
    });

    test("summary", () => {
      expect(result.summary()).toEqual({ coef: 1, intercept: 0, r2Score: 1 });
    });
  });

  describe("case 2", () => {
    const x = [0, 3, 6];
    const y = [1, 2, 3];
    const result = new SimpleLinearRegression(x, y).fit();
    test("coef: 1/3, intercept: 1", () => {
      const coef = result.coef;
      const intercept = result.intercept;
      expect({ coef, intercept }).toEqual({
        coef: 1 / 3,
        intercept: 1,
      });
    });

    test("predict", () => {
      const yPred = result.predict([2, 4, 6]);
      expect(yPred).toEqual([1.6666666666666665, 2.333333333333333, 3]);
    });

    test("summary", () => {
      expect(result.summary()).toEqual({
        coef: 0.3333333333333333,
        intercept: 1,
        r2Score: 1,
      });
    });
  });

  describe("case 3", () => {
    const x = [
      6.575,
      6.421,
      7.185,
      6.998,
      7.147,
      6.43,
      6.012,
      6.172,
      5.631,
      6.004,
      6.377,
      6.009,
      5.889,
      5.949,
      6.096,
      5.834,
      5.935,
      5.99,
      5.456,
      5.727,
      5.57,
      5.965,
      6.142,
      5.813,
      5.924,
      5.599,
      5.813,
      6.047,
      6.495,
      6.674,
      5.713,
      6.072,
      5.95,
      5.701,
      6.096,
      5.933,
      5.841,
      5.85,
      5.966,
      6.595,
      7.024,
      6.77,
      6.169,
      6.211,
      6.069,
      5.682,
      5.786,
      6.03,
      5.399,
      5.602,
      5.963,
      6.115,
      6.511,
      5.998,
      5.888,
      7.249,
      6.383,
      6.816,
      6.145,
      5.927,
      5.741,
      5.966,
      6.456,
      6.762,
      7.104,
      6.29,
      5.787,
      5.878,
      5.594,
      5.885,
      6.417,
      5.961,
      6.065,
      6.245,
      6.273,
      6.286,
      6.279,
      6.14,
      6.232,
      5.874,
      6.727,
      6.619,
      6.302,
      6.167,
      6.389,
      6.63,
      6.015,
      6.121,
      7.007,
      7.079,
      6.417,
      6.405,
      6.442,
      6.211,
      6.249,
      6.625,
      6.163,
      8.069,
      7.82,
      7.416,
      6.727,
      6.781,
      6.405,
      6.137,
      6.167,
      5.851,
      5.836,
      6.127,
      6.474,
      6.229,
      6.195,
      6.715,
      5.913,
      6.092,
      6.254,
      5.928,
      6.176,
      6.021,
      5.872,
      5.731,
      5.87,
      6.004,
      5.961,
      5.856,
      5.879,
      5.986,
      5.613,
      5.693,
      6.431,
      5.637,
      6.458,
      6.326,
      6.372,
      5.822,
      5.757,
      6.335,
      5.942,
      6.454,
      5.857,
      6.151,
      6.174,
      5.019,
      5.403,
      5.468,
      4.903,
      6.13,
      5.628,
      4.926,
      5.186,
      5.597,
      6.122,
      5.404,
      5.012,
      5.709,
      6.129,
      6.152,
      5.272,
      6.943,
      6.066,
      6.51,
      6.25,
      7.489,
      7.802,
      8.375,
      5.854,
      6.101,
      7.929,
      5.877,
      6.319,
      6.402,
      5.875,
      5.88,
      5.572,
      6.416,
      5.859,
      6.546,
      6.02,
      6.315,
      6.86,
      6.98,
      7.765,
      6.144,
      7.155,
      6.563,
      5.604,
      6.153,
      7.831,
      6.782,
      6.556,
      7.185,
      6.951,
      6.739,
      7.178,
      6.8,
      6.604,
      7.875,
      7.287,
      7.107,
      7.274,
      6.975,
      7.135,
      6.162,
      7.61,
      7.853,
      8.034,
      5.891,
      6.326,
      5.783,
      6.064,
      5.344,
      5.96,
      5.404,
      5.807,
      6.375,
      5.412,
      6.182,
      5.888,
      6.642,
      5.951,
      6.373,
      6.951,
      6.164,
      6.879,
      6.618,
      8.266,
      8.725,
      8.04,
      7.163,
      7.686,
      6.552,
      5.981,
      7.412,
      8.337,
      8.247,
      6.726,
      6.086,
      6.631,
      7.358,
      6.481,
      6.606,
      6.897,
      6.095,
      6.358,
      6.393,
      5.593,
      5.605,
      6.108,
      6.226,
      6.433,
      6.718,
      6.487,
      6.438,
      6.957,
      8.259,
      6.108,
      5.876,
      7.454,
      8.704,
      7.333,
      6.842,
      7.203,
      7.52,
      8.398,
      7.327,
      7.206,
      5.56,
      7.014,
      8.297,
      7.47,
      5.92,
      5.856,
      6.24,
      6.538,
      7.691,
      6.758,
      6.854,
      7.267,
      6.826,
      6.482,
      6.812,
      7.82,
      6.968,
      7.645,
      7.923,
      7.088,
      6.453,
      6.23,
      6.209,
      6.315,
      6.565,
      6.861,
      7.148,
      6.63,
      6.127,
      6.009,
      6.678,
      6.549,
      5.79,
      6.345,
      7.041,
      6.871,
      6.59,
      6.495,
      6.982,
      7.236,
      6.616,
      7.42,
      6.849,
      6.635,
      5.972,
      4.973,
      6.122,
      6.023,
      6.266,
      6.567,
      5.705,
      5.914,
      5.782,
      6.382,
      6.113,
      6.426,
      6.376,
      6.041,
      5.708,
      6.415,
      6.431,
      6.312,
      6.083,
      5.868,
      6.333,
      6.144,
      5.706,
      6.031,
      6.316,
      6.31,
      6.037,
      5.869,
      5.895,
      6.059,
      5.985,
      5.968,
      7.241,
      6.54,
      6.696,
      6.874,
      6.014,
      5.898,
      6.516,
      6.635,
      6.939,
      6.49,
      6.579,
      5.884,
      6.728,
      5.663,
      5.936,
      6.212,
      6.395,
      6.127,
      6.112,
      6.398,
      6.251,
      5.362,
      5.803,
      8.78,
      3.561,
      4.963,
      3.863,
      4.97,
      6.683,
      7.016,
      6.216,
      5.875,
      4.906,
      4.138,
      7.313,
      6.649,
      6.794,
      6.38,
      6.223,
      6.968,
      6.545,
      5.536,
      5.52,
      4.368,
      5.277,
      4.652,
      5,
      4.88,
      5.39,
      5.713,
      6.051,
      5.036,
      6.193,
      5.887,
      6.471,
      6.405,
      5.747,
      5.453,
      5.852,
      5.987,
      6.343,
      6.404,
      5.349,
      5.531,
      5.683,
      4.138,
      5.608,
      5.617,
      6.852,
      5.757,
      6.657,
      4.628,
      5.155,
      4.519,
      6.434,
      6.782,
      5.304,
      5.957,
      6.824,
      6.411,
      6.006,
      5.648,
      6.103,
      5.565,
      5.896,
      5.837,
      6.202,
      6.193,
      6.38,
      6.348,
      6.833,
      6.425,
      6.436,
      6.208,
      6.629,
      6.461,
      6.152,
      5.935,
      5.627,
      5.818,
      6.406,
      6.219,
      6.485,
      5.854,
      6.459,
      6.341,
      6.251,
      6.185,
      6.417,
      6.749,
      6.655,
      6.297,
      7.393,
      6.728,
      6.525,
      5.976,
      5.936,
      6.301,
      6.081,
      6.701,
      6.376,
      6.317,
      6.513,
      6.209,
      5.759,
      5.952,
      6.003,
      5.926,
      5.713,
      6.167,
      6.229,
      6.437,
      6.98,
      5.427,
      6.162,
      6.484,
      5.304,
      6.185,
      6.229,
      6.242,
      6.75,
      7.061,
      5.762,
      5.871,
      6.312,
      6.114,
      5.905,
      5.454,
      5.414,
      5.093,
      5.983,
      5.983,
      5.707,
      5.926,
      5.67,
      5.39,
      5.794,
      6.019,
      5.569,
      6.027,
      6.593,
      6.12,
      6.976,
      6.794,
      6.03,
    ];
    const y = [
      24,
      21.6,
      34.7,
      33.4,
      36.2,
      28.7,
      22.9,
      27.1,
      16.5,
      18.9,
      15,
      18.9,
      21.7,
      20.4,
      18.2,
      19.9,
      23.1,
      17.5,
      20.2,
      18.2,
      13.6,
      19.6,
      15.2,
      14.5,
      15.6,
      13.9,
      16.6,
      14.8,
      18.4,
      21,
      12.7,
      14.5,
      13.2,
      13.1,
      13.5,
      18.9,
      20,
      21,
      24.7,
      30.8,
      34.9,
      26.6,
      25.3,
      24.7,
      21.2,
      19.3,
      20,
      16.6,
      14.4,
      19.4,
      19.7,
      20.5,
      25,
      23.4,
      18.9,
      35.4,
      24.7,
      31.6,
      23.3,
      19.6,
      18.7,
      16,
      22.2,
      25,
      33,
      23.5,
      19.4,
      22,
      17.4,
      20.9,
      24.2,
      21.7,
      22.8,
      23.4,
      24.1,
      21.4,
      20,
      20.8,
      21.2,
      20.3,
      28,
      23.9,
      24.8,
      22.9,
      23.9,
      26.6,
      22.5,
      22.2,
      23.6,
      28.7,
      22.6,
      22,
      22.9,
      25,
      20.6,
      28.4,
      21.4,
      38.7,
      43.8,
      33.2,
      27.5,
      26.5,
      18.6,
      19.3,
      20.1,
      19.5,
      19.5,
      20.4,
      19.8,
      19.4,
      21.7,
      22.8,
      18.8,
      18.7,
      18.5,
      18.3,
      21.2,
      19.2,
      20.4,
      19.3,
      22,
      20.3,
      20.5,
      17.3,
      18.8,
      21.4,
      15.7,
      16.2,
      18,
      14.3,
      19.2,
      19.6,
      23,
      18.4,
      15.6,
      18.1,
      17.4,
      17.1,
      13.3,
      17.8,
      14,
      14.4,
      13.4,
      15.6,
      11.8,
      13.8,
      15.6,
      14.6,
      17.8,
      15.4,
      21.5,
      19.6,
      15.3,
      19.4,
      17,
      15.6,
      13.1,
      41.3,
      24.3,
      23.3,
      27,
      50,
      50,
      50,
      22.7,
      25,
      50,
      23.8,
      23.8,
      22.3,
      17.4,
      19.1,
      23.1,
      23.6,
      22.6,
      29.4,
      23.2,
      24.6,
      29.9,
      37.2,
      39.8,
      36.2,
      37.9,
      32.5,
      26.4,
      29.6,
      50,
      32,
      29.8,
      34.9,
      37,
      30.5,
      36.4,
      31.1,
      29.1,
      50,
      33.3,
      30.3,
      34.6,
      34.9,
      32.9,
      24.1,
      42.3,
      48.5,
      50,
      22.6,
      24.4,
      22.5,
      24.4,
      20,
      21.7,
      19.3,
      22.4,
      28.1,
      23.7,
      25,
      23.3,
      28.7,
      21.5,
      23,
      26.7,
      21.7,
      27.5,
      30.1,
      44.8,
      50,
      37.6,
      31.6,
      46.7,
      31.5,
      24.3,
      31.7,
      41.7,
      48.3,
      29,
      24,
      25.1,
      31.5,
      23.7,
      23.3,
      22,
      20.1,
      22.2,
      23.7,
      17.6,
      18.5,
      24.3,
      20.5,
      24.5,
      26.2,
      24.4,
      24.8,
      29.6,
      42.8,
      21.9,
      20.9,
      44,
      50,
      36,
      30.1,
      33.8,
      43.1,
      48.8,
      31,
      36.5,
      22.8,
      30.7,
      50,
      43.5,
      20.7,
      21.1,
      25.2,
      24.4,
      35.2,
      32.4,
      32,
      33.2,
      33.1,
      29.1,
      35.1,
      45.4,
      35.4,
      46,
      50,
      32.2,
      22,
      20.1,
      23.2,
      22.3,
      24.8,
      28.5,
      37.3,
      27.9,
      23.9,
      21.7,
      28.6,
      27.1,
      20.3,
      22.5,
      29,
      24.8,
      22,
      26.4,
      33.1,
      36.1,
      28.4,
      33.4,
      28.2,
      22.8,
      20.3,
      16.1,
      22.1,
      19.4,
      21.6,
      23.8,
      16.2,
      17.8,
      19.8,
      23.1,
      21,
      23.8,
      23.1,
      20.4,
      18.5,
      25,
      24.6,
      23,
      22.2,
      19.3,
      22.6,
      19.8,
      17.1,
      19.4,
      22.2,
      20.7,
      21.1,
      19.5,
      18.5,
      20.6,
      19,
      18.7,
      32.7,
      16.5,
      23.9,
      31.2,
      17.5,
      17.2,
      23.1,
      24.5,
      26.6,
      22.9,
      24.1,
      18.6,
      30.1,
      18.2,
      20.6,
      17.8,
      21.7,
      22.7,
      22.6,
      25,
      19.9,
      20.8,
      16.8,
      21.9,
      27.5,
      21.9,
      23.1,
      50,
      50,
      50,
      50,
      50,
      13.8,
      13.8,
      15,
      13.9,
      13.3,
      13.1,
      10.2,
      10.4,
      10.9,
      11.3,
      12.3,
      8.8,
      7.2,
      10.5,
      7.4,
      10.2,
      11.5,
      15.1,
      23.2,
      9.7,
      13.8,
      12.7,
      13.1,
      12.5,
      8.5,
      5,
      6.3,
      5.6,
      7.2,
      12.1,
      8.3,
      8.5,
      5,
      11.9,
      27.9,
      17.2,
      27.5,
      15,
      17.2,
      17.9,
      16.3,
      7,
      7.2,
      7.5,
      10.4,
      8.8,
      8.4,
      16.7,
      14.2,
      20.8,
      13.4,
      11.7,
      8.3,
      10.2,
      10.9,
      11,
      9.5,
      14.5,
      14.1,
      16.1,
      14.3,
      11.7,
      13.4,
      9.6,
      8.7,
      8.4,
      12.8,
      10.5,
      17.1,
      18.4,
      15.4,
      10.8,
      11.8,
      14.9,
      12.6,
      14.1,
      13,
      13.4,
      15.2,
      16.1,
      17.8,
      14.9,
      14.1,
      12.7,
      13.5,
      14.9,
      20,
      16.4,
      17.7,
      19.5,
      20.2,
      21.4,
      19.9,
      19,
      19.1,
      19.1,
      20.1,
      19.9,
      19.6,
      23.2,
      29.8,
      13.8,
      13.3,
      16.7,
      12,
      14.6,
      21.4,
      23,
      23.7,
      25,
      21.8,
      20.6,
      21.2,
      19.1,
      20.6,
      15.2,
      7,
      8.1,
      13.6,
      20.1,
      21.8,
      24.5,
      23.1,
      19.7,
      18.3,
      21.2,
      17.5,
      16.8,
      22.4,
      20.6,
      23.9,
      22,
      11.9,
    ];
    const actual = new SimpleLinearRegression(x, y).fit();
    const coef = _.ceil(actual.coef, 7);
    const intercept = _.ceil(actual.intercept, 7);

    test("boston data coef =  9.1021089 intercept = -34.6706207764", () => {
      /*
      from sklearn.linear_model import LinearRegression
      lr = LinearRegression()
      
      x = boston_df['RM'].values         # 説明変数（Numpyの配列）
      y = boston_df['MEDV'].values 
      */
      expect({ coef, intercept }).toEqual({
        coef: _.ceil(9.10210898118031, 7), // output by sklearn
        intercept: _.ceil(-34.67062077643857, 7),
      });
    });
  });
});

describe("MultipleLinearRegression", () => {
  describe("multi-colinearlity", () => {
    test("exists", () => {
      const x = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ];
      const y = [2, 3, 6];
      const mlr = new MultipleLinearRegression(x, y);

      expect(mlr._hasMultiCo).toEqual(true);
    });

    test("doesn't exist", () => {
      const x = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 4, 3],
      ];
      const y = [2, 3, 6];
      const mlr = new MultipleLinearRegression(x, y);

      expect(mlr._hasMultiCo).toEqual(false);
    });
  });

  describe("multi-colinearlity, every variable should have coefficients", () => {
    test("case 1", () => {
      const x = [
        [1, 1],
        [2, 2],
        [3, 3],
      ];
      const y = [2, 3, 6];
      const result = new MultipleLinearRegression(x, y).fit();

      const expected = [[-0.3333333333333333], [1], [1]];

      expect(result._w).toEqual(expected);
    });

    test("case 2", () => {
      const x = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ];
      const y = [2, 3, 3];
      const result = new MultipleLinearRegression(x, y).fit();

      const expected = [
        [1.6666666666666667],
        [0.16666666666666666],
        [0.16666666666666666],
        [0.16666666666666666],
      ];
      expect(result._w).toEqual(expected);
    });
  });

  test("not multi-colinearlity", () => {
    const x = [
      [1, 1],
      [2, 2],
      [3, 2],
    ];
    const y = [2, 3, 6];
    const result = new MultipleLinearRegression(x, y).fit();
    const expected = [[1], [3], [-2]];
    expect(result._w).toEqual(expected);
  });

  describe("predict", () => {
    test("", () => {
      const x = [
        [10, 20, 30],
        [20, 42, 63],
        [4, 8, 16],
      ];
      const y = [1, 2, 3];
      const predictX = [10, 20, 30];
      const reg = new MultipleLinearRegression(x, y);
      reg.fit();
      const expected = [[0.9999999999999787]];

      expect(reg.predict(predictX)).toEqual(expected);
    });

    test("", () => {
      const x = [
        [10, 20, 30],
        [20, 42, 63],
        [4, 8, 16],
      ];
      const y = [1, 2, 3];
      const predictX = [
        [10, 20, 30],
        [20, 42, 63],
      ];
      const reg = new MultipleLinearRegression(x, y);
      reg.fit();
      const expected = [[0.9999999999999787], [2.000000000000007]];

      expect(reg.predict(predictX)).toEqual(expected);
    });

    test("input size error", () => {
      const x = [
        [10, 20, 30],
        [20, 42, 63],
        [4, 8, 16],
      ];
      const y = [1, 2, 3];
      const predictX = [
        [10, 20],
        [20, 42, 63],
      ];
      const reg = new MultipleLinearRegression(x, y);
      reg.fit();

      expect(() => {
        reg.predict(predictX);
      }).toThrowError(new Error("The number of variables should be 3"));
    });
  });

  describe("summary", () => {
    test("", () => {
      const x = [
        [10, 20, 30],
        [20, 42, 63],
        [4, 8, 16],
      ];
      const y = [1, 2, 3];
      const reg = new MultipleLinearRegression(x, y).fit();

      const expected = {
        intercept: 0.3717447916666898,
        r2Score: 1,
        x1: -0.3089192708334065,
        x2: -0.7054850260416322,
        x3: 0.59423828125,
      };
      expect(reg.summary()).toEqual(expected);
    });
  });
});

describe("RidgeRegression", () => {
  describe("case 1", () => {
    const x = [[4], [9], [12]];
    const y = [1, 2, 3];
    const reg = new RidgeRegression(x, y).fit();

    test("_w", () => {
      const expected = [[0.005830903790087803], [0.23906705539358597]];
      expect(reg._w).toEqual(expected);
    });

    test("predict()", () => {
      const a = [[1], [2]];
      const expected = [[0.24489795918367377], [0.48396501457725977]];
      expect(reg.predict(a)).toEqual(expected);
    });
  });

  describe("boston data", () => {
    const x = [
      [6.575],
      [6.421],
      [7.185],
      [6.998],
      [7.147],
      [6.43],
      [6.012],
      [6.172],
      [5.631],
      [6.004],
      [6.377],
      [6.009],
      [5.889],
      [5.949],
      [6.096],
      [5.834],
      [5.935],
      [5.99],
      [5.456],
      [5.727],
      [5.57],
      [5.965],
      [6.142],
      [5.813],
      [5.924],
      [5.599],
      [5.813],
      [6.047],
      [6.495],
      [6.674],
      [5.713],
      [6.072],
      [5.95],
      [5.701],
      [6.096],
      [5.933],
      [5.841],
      [5.85],
      [5.966],
      [6.595],
      [7.024],
      [6.77],
      [6.169],
      [6.211],
      [6.069],
      [5.682],
      [5.786],
      [6.03],
      [5.399],
      [5.602],
      [5.963],
      [6.115],
      [6.511],
      [5.998],
      [5.888],
      [7.249],
      [6.383],
      [6.816],
      [6.145],
      [5.927],
      [5.741],
      [5.966],
      [6.456],
      [6.762],
      [7.104],
      [6.29],
      [5.787],
      [5.878],
      [5.594],
      [5.885],
      [6.417],
      [5.961],
      [6.065],
      [6.245],
      [6.273],
      [6.286],
      [6.279],
      [6.14],
      [6.232],
      [5.874],
      [6.727],
      [6.619],
      [6.302],
      [6.167],
      [6.389],
      [6.63],
      [6.015],
      [6.121],
      [7.007],
      [7.079],
      [6.417],
      [6.405],
      [6.442],
      [6.211],
      [6.249],
      [6.625],
      [6.163],
      [8.069],
      [7.82],
      [7.416],
      [6.727],
      [6.781],
      [6.405],
      [6.137],
      [6.167],
      [5.851],
      [5.836],
      [6.127],
      [6.474],
      [6.229],
      [6.195],
      [6.715],
      [5.913],
      [6.092],
      [6.254],
      [5.928],
      [6.176],
      [6.021],
      [5.872],
      [5.731],
      [5.87],
      [6.004],
      [5.961],
      [5.856],
      [5.879],
      [5.986],
      [5.613],
      [5.693],
      [6.431],
      [5.637],
      [6.458],
      [6.326],
      [6.372],
      [5.822],
      [5.757],
      [6.335],
      [5.942],
      [6.454],
      [5.857],
      [6.151],
      [6.174],
      [5.019],
      [5.403],
      [5.468],
      [4.903],
      [6.13],
      [5.628],
      [4.926],
      [5.186],
      [5.597],
      [6.122],
      [5.404],
      [5.012],
      [5.709],
      [6.129],
      [6.152],
      [5.272],
      [6.943],
      [6.066],
      [6.51],
      [6.25],
      [7.489],
      [7.802],
      [8.375],
      [5.854],
      [6.101],
      [7.929],
      [5.877],
      [6.319],
      [6.402],
      [5.875],
      [5.88],
      [5.572],
      [6.416],
      [5.859],
      [6.546],
      [6.02],
      [6.315],
      [6.86],
      [6.98],
      [7.765],
      [6.144],
      [7.155],
      [6.563],
      [5.604],
      [6.153],
      [7.831],
      [6.782],
      [6.556],
      [7.185],
      [6.951],
      [6.739],
      [7.178],
      [6.8],
      [6.604],
      [7.875],
      [7.287],
      [7.107],
      [7.274],
      [6.975],
      [7.135],
      [6.162],
      [7.61],
      [7.853],
      [8.034],
      [5.891],
      [6.326],
      [5.783],
      [6.064],
      [5.344],
      [5.96],
      [5.404],
      [5.807],
      [6.375],
      [5.412],
      [6.182],
      [5.888],
      [6.642],
      [5.951],
      [6.373],
      [6.951],
      [6.164],
      [6.879],
      [6.618],
      [8.266],
      [8.725],
      [8.04],
      [7.163],
      [7.686],
      [6.552],
      [5.981],
      [7.412],
      [8.337],
      [8.247],
      [6.726],
      [6.086],
      [6.631],
      [7.358],
      [6.481],
      [6.606],
      [6.897],
      [6.095],
      [6.358],
      [6.393],
      [5.593],
      [5.605],
      [6.108],
      [6.226],
      [6.433],
      [6.718],
      [6.487],
      [6.438],
      [6.957],
      [8.259],
      [6.108],
      [5.876],
      [7.454],
      [8.704],
      [7.333],
      [6.842],
      [7.203],
      [7.52],
      [8.398],
      [7.327],
      [7.206],
      [5.56],
      [7.014],
      [8.297],
      [7.47],
      [5.92],
      [5.856],
      [6.24],
      [6.538],
      [7.691],
      [6.758],
      [6.854],
      [7.267],
      [6.826],
      [6.482],
      [6.812],
      [7.82],
      [6.968],
      [7.645],
      [7.923],
      [7.088],
      [6.453],
      [6.23],
      [6.209],
      [6.315],
      [6.565],
      [6.861],
      [7.148],
      [6.63],
      [6.127],
      [6.009],
      [6.678],
      [6.549],
      [5.79],
      [6.345],
      [7.041],
      [6.871],
      [6.59],
      [6.495],
      [6.982],
      [7.236],
      [6.616],
      [7.42],
      [6.849],
      [6.635],
      [5.972],
      [4.973],
      [6.122],
      [6.023],
      [6.266],
      [6.567],
      [5.705],
      [5.914],
      [5.782],
      [6.382],
      [6.113],
      [6.426],
      [6.376],
      [6.041],
      [5.708],
      [6.415],
      [6.431],
      [6.312],
      [6.083],
      [5.868],
      [6.333],
      [6.144],
      [5.706],
      [6.031],
      [6.316],
      [6.31],
      [6.037],
      [5.869],
      [5.895],
      [6.059],
      [5.985],
      [5.968],
      [7.241],
      [6.54],
      [6.696],
      [6.874],
      [6.014],
      [5.898],
      [6.516],
      [6.635],
      [6.939],
      [6.49],
      [6.579],
      [5.884],
      [6.728],
      [5.663],
      [5.936],
      [6.212],
      [6.395],
      [6.127],
      [6.112],
      [6.398],
      [6.251],
      [5.362],
      [5.803],
      [8.78],
      [3.561],
      [4.963],
      [3.863],
      [4.97],
      [6.683],
      [7.016],
      [6.216],
      [5.875],
      [4.906],
      [4.138],
      [7.313],
      [6.649],
      [6.794],
      [6.38],
      [6.223],
      [6.968],
      [6.545],
      [5.536],
      [5.52],
      [4.368],
      [5.277],
      [4.652],
      [5],
      [4.88],
      [5.39],
      [5.713],
      [6.051],
      [5.036],
      [6.193],
      [5.887],
      [6.471],
      [6.405],
      [5.747],
      [5.453],
      [5.852],
      [5.987],
      [6.343],
      [6.404],
      [5.349],
      [5.531],
      [5.683],
      [4.138],
      [5.608],
      [5.617],
      [6.852],
      [5.757],
      [6.657],
      [4.628],
      [5.155],
      [4.519],
      [6.434],
      [6.782],
      [5.304],
      [5.957],
      [6.824],
      [6.411],
      [6.006],
      [5.648],
      [6.103],
      [5.565],
      [5.896],
      [5.837],
      [6.202],
      [6.193],
      [6.38],
      [6.348],
      [6.833],
      [6.425],
      [6.436],
      [6.208],
      [6.629],
      [6.461],
      [6.152],
      [5.935],
      [5.627],
      [5.818],
      [6.406],
      [6.219],
      [6.485],
      [5.854],
      [6.459],
      [6.341],
      [6.251],
      [6.185],
      [6.417],
      [6.749],
      [6.655],
      [6.297],
      [7.393],
      [6.728],
      [6.525],
      [5.976],
      [5.936],
      [6.301],
      [6.081],
      [6.701],
      [6.376],
      [6.317],
      [6.513],
      [6.209],
      [5.759],
      [5.952],
      [6.003],
      [5.926],
      [5.713],
      [6.167],
      [6.229],
      [6.437],
      [6.98],
      [5.427],
      [6.162],
      [6.484],
      [5.304],
      [6.185],
      [6.229],
      [6.242],
      [6.75],
      [7.061],
      [5.762],
      [5.871],
      [6.312],
      [6.114],
      [5.905],
      [5.454],
      [5.414],
      [5.093],
      [5.983],
      [5.983],
      [5.707],
      [5.926],
      [5.67],
      [5.39],
      [5.794],
      [6.019],
      [5.569],
      [6.027],
      [6.593],
      [6.12],
      [6.976],
      [6.794],
      [6.03],
    ];
    const y = [
      24,
      21.6,
      34.7,
      33.4,
      36.2,
      28.7,
      22.9,
      27.1,
      16.5,
      18.9,
      15,
      18.9,
      21.7,
      20.4,
      18.2,
      19.9,
      23.1,
      17.5,
      20.2,
      18.2,
      13.6,
      19.6,
      15.2,
      14.5,
      15.6,
      13.9,
      16.6,
      14.8,
      18.4,
      21,
      12.7,
      14.5,
      13.2,
      13.1,
      13.5,
      18.9,
      20,
      21,
      24.7,
      30.8,
      34.9,
      26.6,
      25.3,
      24.7,
      21.2,
      19.3,
      20,
      16.6,
      14.4,
      19.4,
      19.7,
      20.5,
      25,
      23.4,
      18.9,
      35.4,
      24.7,
      31.6,
      23.3,
      19.6,
      18.7,
      16,
      22.2,
      25,
      33,
      23.5,
      19.4,
      22,
      17.4,
      20.9,
      24.2,
      21.7,
      22.8,
      23.4,
      24.1,
      21.4,
      20,
      20.8,
      21.2,
      20.3,
      28,
      23.9,
      24.8,
      22.9,
      23.9,
      26.6,
      22.5,
      22.2,
      23.6,
      28.7,
      22.6,
      22,
      22.9,
      25,
      20.6,
      28.4,
      21.4,
      38.7,
      43.8,
      33.2,
      27.5,
      26.5,
      18.6,
      19.3,
      20.1,
      19.5,
      19.5,
      20.4,
      19.8,
      19.4,
      21.7,
      22.8,
      18.8,
      18.7,
      18.5,
      18.3,
      21.2,
      19.2,
      20.4,
      19.3,
      22,
      20.3,
      20.5,
      17.3,
      18.8,
      21.4,
      15.7,
      16.2,
      18,
      14.3,
      19.2,
      19.6,
      23,
      18.4,
      15.6,
      18.1,
      17.4,
      17.1,
      13.3,
      17.8,
      14,
      14.4,
      13.4,
      15.6,
      11.8,
      13.8,
      15.6,
      14.6,
      17.8,
      15.4,
      21.5,
      19.6,
      15.3,
      19.4,
      17,
      15.6,
      13.1,
      41.3,
      24.3,
      23.3,
      27,
      50,
      50,
      50,
      22.7,
      25,
      50,
      23.8,
      23.8,
      22.3,
      17.4,
      19.1,
      23.1,
      23.6,
      22.6,
      29.4,
      23.2,
      24.6,
      29.9,
      37.2,
      39.8,
      36.2,
      37.9,
      32.5,
      26.4,
      29.6,
      50,
      32,
      29.8,
      34.9,
      37,
      30.5,
      36.4,
      31.1,
      29.1,
      50,
      33.3,
      30.3,
      34.6,
      34.9,
      32.9,
      24.1,
      42.3,
      48.5,
      50,
      22.6,
      24.4,
      22.5,
      24.4,
      20,
      21.7,
      19.3,
      22.4,
      28.1,
      23.7,
      25,
      23.3,
      28.7,
      21.5,
      23,
      26.7,
      21.7,
      27.5,
      30.1,
      44.8,
      50,
      37.6,
      31.6,
      46.7,
      31.5,
      24.3,
      31.7,
      41.7,
      48.3,
      29,
      24,
      25.1,
      31.5,
      23.7,
      23.3,
      22,
      20.1,
      22.2,
      23.7,
      17.6,
      18.5,
      24.3,
      20.5,
      24.5,
      26.2,
      24.4,
      24.8,
      29.6,
      42.8,
      21.9,
      20.9,
      44,
      50,
      36,
      30.1,
      33.8,
      43.1,
      48.8,
      31,
      36.5,
      22.8,
      30.7,
      50,
      43.5,
      20.7,
      21.1,
      25.2,
      24.4,
      35.2,
      32.4,
      32,
      33.2,
      33.1,
      29.1,
      35.1,
      45.4,
      35.4,
      46,
      50,
      32.2,
      22,
      20.1,
      23.2,
      22.3,
      24.8,
      28.5,
      37.3,
      27.9,
      23.9,
      21.7,
      28.6,
      27.1,
      20.3,
      22.5,
      29,
      24.8,
      22,
      26.4,
      33.1,
      36.1,
      28.4,
      33.4,
      28.2,
      22.8,
      20.3,
      16.1,
      22.1,
      19.4,
      21.6,
      23.8,
      16.2,
      17.8,
      19.8,
      23.1,
      21,
      23.8,
      23.1,
      20.4,
      18.5,
      25,
      24.6,
      23,
      22.2,
      19.3,
      22.6,
      19.8,
      17.1,
      19.4,
      22.2,
      20.7,
      21.1,
      19.5,
      18.5,
      20.6,
      19,
      18.7,
      32.7,
      16.5,
      23.9,
      31.2,
      17.5,
      17.2,
      23.1,
      24.5,
      26.6,
      22.9,
      24.1,
      18.6,
      30.1,
      18.2,
      20.6,
      17.8,
      21.7,
      22.7,
      22.6,
      25,
      19.9,
      20.8,
      16.8,
      21.9,
      27.5,
      21.9,
      23.1,
      50,
      50,
      50,
      50,
      50,
      13.8,
      13.8,
      15,
      13.9,
      13.3,
      13.1,
      10.2,
      10.4,
      10.9,
      11.3,
      12.3,
      8.8,
      7.2,
      10.5,
      7.4,
      10.2,
      11.5,
      15.1,
      23.2,
      9.7,
      13.8,
      12.7,
      13.1,
      12.5,
      8.5,
      5,
      6.3,
      5.6,
      7.2,
      12.1,
      8.3,
      8.5,
      5,
      11.9,
      27.9,
      17.2,
      27.5,
      15,
      17.2,
      17.9,
      16.3,
      7,
      7.2,
      7.5,
      10.4,
      8.8,
      8.4,
      16.7,
      14.2,
      20.8,
      13.4,
      11.7,
      8.3,
      10.2,
      10.9,
      11,
      9.5,
      14.5,
      14.1,
      16.1,
      14.3,
      11.7,
      13.4,
      9.6,
      8.7,
      8.4,
      12.8,
      10.5,
      17.1,
      18.4,
      15.4,
      10.8,
      11.8,
      14.9,
      12.6,
      14.1,
      13,
      13.4,
      15.2,
      16.1,
      17.8,
      14.9,
      14.1,
      12.7,
      13.5,
      14.9,
      20,
      16.4,
      17.7,
      19.5,
      20.2,
      21.4,
      19.9,
      19,
      19.1,
      19.1,
      20.1,
      19.9,
      19.6,
      23.2,
      29.8,
      13.8,
      13.3,
      16.7,
      12,
      14.6,
      21.4,
      23,
      23.7,
      25,
      21.8,
      20.6,
      21.2,
      19.1,
      20.6,
      15.2,
      7,
      8.1,
      13.6,
      20.1,
      21.8,
      24.5,
      23.1,
      19.7,
      18.3,
      21.2,
      17.5,
      16.8,
      22.4,
      20.6,
      23.9,
      22,
      11.9,
    ];
    const reg = new RidgeRegression(x, y, 0.5).fit();

    test("", () => {
      /*
      from sklearn.linear_model import LinearRegression
      lr = LinearRegression()
      
      x = boston_df['RM'].values         # 説明変数（Numpyの配列）
      y = boston_df['MEDV'].values 
      */
      const expected = [[-31.995123945883126], [8.68141925883909]];
      expect(reg._w).toEqual(expected);
    });
  });
});

describe("describeStats", () => {
  /*
    import scipy
    scipy.stats.ttest_1samp([5,5,5,5,5,5,6,10],5.0)
    # Ttest_1sampResult(statistic=1.2104198771788934, pvalue=0.2653980394260696)
  */
  describe("[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]", () => {
    // np.mean([5, 5, 5, 5, 5, 5, 6, 10])
    const result = descripeStats([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    test("size", () => {
      expect(result.size).toEqual(10);
    });

    test("min", () => {
      expect(result.min).toEqual(0);
    });

    test("max", () => {
      expect(result.max).toEqual(9);
    });

    test("mean", () => {
      expect(result.mean).toEqual(4.5);
    });

    test("variance", () => {
      expect(result.variance).toEqual(9.166666666666666);
    });

    test("skewness", () => {
      expect(result.skewness).toEqual(0);
    });

    test("kurtosis", () => {
      expect(result.kurtosis).toEqual(-1.2);
    });
  });
});
describe("consSimilarity", () => {
  describe("", () => {
    test("", () => {
      const a = [1, 1];
      const b = [0, 1];
      expect(cosSimilarity(a, b)).toEqual(0.7071067811865475);
    });

    test("", () => {
      const a = [1, 0];
      const b = [0, 1];
      expect(cosSimilarity(a, b)).toEqual(0);
    });

    test("", () => {
      const a = [1, 1];
      const b = [1, 1];
      expect(cosSimilarity(a, b)).toEqual(1);
    });
  });
});

describe("pearsonr", () => {
  describe("case 1", () => {
    const a = [0, 0, 0, 1, 1, 1, 1];
    const b = [0, 1, 2, 3, 4, 5, 6];
    const result = pearsonr(a, b);

    test("r", () => {
      expect(result.r).toEqual(0.8660254037844386);
    });
    test("pValue", () => {
      expect(result.pValue).toEqual(0.011724811003882547);
    });
  });

  describe("case 2", () => {
    const a = [2, 3, 5, 6, 3, 4, 7, 5];
    const b = [4, 3, 8, 7, 5, 4, 8, 9];
    const result = pearsonr(a, b);

    test("r", () => {
      expect(result.r).toEqual(0.785081015728862);
    });
    test("pValue", () => {
      expect(result.pValue).toEqual(0.020989440024479375);
    });
  });
});

describe("tTest1Sample", () => {
  /*
    import scipy
    scipy.stats.ttest_1samp([5,5,5,5,5,5,6,10],5.0)
    # Ttest_1sampResult(statistic=1.2104198771788934, pvalue=0.2653980394260696)
  */
  describe("([5, 5, 5, 5, 5, 5, 6, 10], 5.0)", () => {
    // np.mean([5, 5, 5, 5, 5, 5, 6, 10])
    const result = tTest1Sample([5, 5, 5, 5, 5, 5, 6, 10], 5.0);
    test("mean", () => {
      expect(result.mean).toEqual(5.75);
    });

    test("sd", () => {
      expect(result.sd).toEqual(1.6393596310755);
    });

    test("result", () => {
      expect(result.statistic).toEqual(1.2104198771788937);
      expect(result.pValue).toEqual(0.26539803962501435);
    });
  });
});

describe("tTestInd", () => {
  /*
    import scipy
    scipy.stats.ttest_ind([4,5,6,4,5], [1,2,3,4,5], equal_var=True)
    # Ttest_indResult(statistic=2.2499999999999996, pvalue=0.05456730579993522)
  */
  describe("[4,5,6,4,5], [1,2,3,4,5], equalVar true", () => {
    // np.mean([5, 5, 5, 5, 5, 5, 6, 10])
    const result = tTestInd([4, 5, 6, 4, 5], [1, 2, 3, 4, 5], true);
    test("statistic", () => {
      expect(result.statistic).toEqual(2.2499999999999996);
    });

    test("pValue", () => {
      expect(result.pValue).toEqual(0.054567305799939875);
    });

    test("se", () => {
      expect(result.se).toEqual(1.2649110640673518);
    });

    test("df", () => {
      expect(result.df).toEqual(8);
    });
  });

  /*
    import scipy
    scipy.stats.ttest_ind([4,5,6,4,5], [1,2,3,4,5], equal_var=False)
    # Ttest_indResult(statistic=2.2499999999999996, pvalue=0.06488370852883803)
  */
  describe("[4,5,6,4,5], [1,2,3,4,5], equalVar false", () => {
    // np.mean([5, 5, 5, 5, 5, 5, 6, 10])
    const result = tTestInd([4, 5, 6, 4, 5], [1, 2, 3, 4, 5], false);
    test("statistic", () => {
      expect(result.statistic).toEqual(2.2499999999999996);
    });

    test("pValue", () => {
      expect(result.pValue).toEqual(0.06488370852885418);
    });

    test("se", () => {
      expect(result.se).toEqual(0.8);
    });

    test("df", () => {
      expect(result.df).toEqual(6.077151335311573);
    });
  });
});

describe("tTestIndFromStats", () => {
  /*
    import scipy
    ttest_ind_from_stats(mean1=0.2, std1=np.sqrt(0.16), nobs1=150,
    ...                      mean2=0.225, std2=np.sqrt(0.17437), nobs2=200)
    # Ttest_indResult(statistic=-0.564327545549774, pvalue=0.5728947691244874)
  */
  describe("equalVar true", () => {
    const result = tTestIndFromStats(
      0.2,
      Math.sqrt(0.16),
      150,
      0.225,
      Math.sqrt(0.17437),
      200,
      true
    );
    test("statistic", () => {
      expect(result.statistic).toEqual(-0.564327545549774);
    });

    test("pValue", () => {
      expect(result.pValue).toEqual(0.572894755162566);
    });
  });
});

describe("tTestRel", () => {
  /*
    import scipy
    scipy.stats.ttest_rel([4,5,6,4,5], [1,2,3,4,5])
    # Ttest_relResult(statistic=2.449489742783178, pvalue=0.07048399691021993)
  */
  describe("", () => {
    const result = tTestRel([4, 5, 6, 4, 5], [1, 2, 3, 4, 5]);
    test("statistic", () => {
      expect(result.statistic).toEqual(2.449489742783178);
    });

    test("pValue", () => {
      expect(result.pValue).toEqual(0.07048399691022006);
    });
  });
});

describe("goodness-of-fit test", () => {
  test("[10,1,1], [10,1,1]", () => {
    const result = chiSqaure([10, 1, 1], [10, 1, 1]);
    expect(result.statistic).toEqual(0);
    expect(result.pValue).toEqual(1);
  });

  /*
    import scipy
    a = scipy.array([10,1,1,1])
    b = scipy.array([15,1,1,1])
    scipy.stats.chisquare(a, f_exp=b)
  */
  test("[10,1,1,1], [15,1,1,1]", () => {
    const result = chiSqaure([10, 1, 1, 1], [15, 1, 1, 1]);
    expect(result.statistic).toEqual(1.6666666666666667);
    expect(result.pValue).toEqual(0.6443698056370236);
  });
});

describe("test for independence", () => {
  /*
    import scipy
    scipy.stats.chi2_contingency(np.array([[55, 22, 16, 7], [40, 32, 24, 4]]))
    (6.63845472266525, 0.08435923449835014, 3, array([[47.5, 27. , 20. ,  5.5],
        [47.5, 27. , 20. ,  5.5]]))
  */
  test("[55, 22, 16, 7], [40, 32, 24, 4]", () => {
    const result = chi2Contingency([55, 22, 16, 7], [40, 32, 24, 4]);
    expect(result.statistic).toEqual(6.63845472266525);
    expect(result.pValue).toEqual(0.08435923449835192);
  });
});

describe("oneWayANOVA", () => {
  /*
  import scipy
  a = np.array([66, 62, 80, 50, 57, 68, 73, 65])
  b = np.array([62, 60, 66, 63, 55, 53, 59, 63])
  c = np.array([65, 60, 78, 52, 59, 66, 73, 64])
  d = np.array([52, 59, 44, 67, 47, 53, 58, 49])
  scipy.stats.f_oneway(a,b,c,d) 
  # F_onewayResult(statistic=4.024870903151017, pvalue=0.016859897941251333)
  */

  test("[55, 22, 16, 7], [40, 32, 24, 4]", () => {
    const a = [66, 62, 80, 50, 57, 68, 73, 65];
    const b = [62, 60, 66, 63, 55, 53, 59, 63];
    const c = [65, 60, 78, 52, 59, 66, 73, 64];
    const d = [52, 59, 44, 67, 47, 53, 58, 49];
    const result = oneWayANOVA(a, b, c, d);
    expect(result.statistic).toEqual(4.024870903151017);
    expect(result.pValue).toEqual(0.01685989800789034);
  });
});

import { SimpleLinearRegression, MultipleLinearRegression } from "./index";

describe("SimpleLinearRegression", () => {
  test("conef: 1, intercept: 0", () => {
    const x = [1, 2, 3];
    const y = [1, 2, 3];

    expect(new SimpleLinearRegression(x, y).fit()).toEqual({
      coef: 1,
      intercept: 0,
    });
  });

  test("conef: 1/3, intercept: 1", () => {
    const x = [0, 3, 6];
    const y = [1, 2, 3];
    expect(new SimpleLinearRegression(x, y).fit()).toEqual({
      coef: 1 / 3,
      intercept: 1,
    });
  });
});

describe("MultipleLinearRegression", () => {
  test("", () => {
    const x = [
      [10, 20, 30],
      [20, 42, 63],
      [4, 8, 16],
    ];
    const y = [1, 2, 3];
    const expected = [
      [0.3717447916666898],
      [-0.3089192708334065],
      [-0.7054850260416322],
      [0.59423828125],
    ];

    expect(new MultipleLinearRegression(x, y).fit()).toEqual(expected);
  });
});

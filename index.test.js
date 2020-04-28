import LinearRegression from "./index";

test("conef: 1, intercept: 0", () => {
  const x = [1, 2, 3];
  const y = [1, 2, 3];

  expect(new LinearRegression(x, y).fit()).toEqual({ coef: 1, intercept: 0 });
});

test("conef: 1/3, intercept: 1", () => {
  const x = [0, 3, 6];
  const y = [1, 2, 3];
  expect(new LinearRegression(x, y).fit()).toEqual({
    coef: 1 / 3,
    intercept: 1,
  });
});

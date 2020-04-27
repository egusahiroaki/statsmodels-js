import LinearRegression from "./index";

test("conef: 1, intercept: 0", () => {
  const l = new LinearRegression();
  const x = [1, 2, 3];
  const y = [1, 2, 3];
  expect(l.fit(x, y)).toEqual({ coef: 1, intercept: 0 });
});

test("conef: 1, intercept: 0", () => {
  const l = new LinearRegression();
  const x = [0, 3, 6];
  const y = [1, 2, 3];
  expect(l.fit(x, y)).toEqual({ coef: 1 / 3, intercept: 1 });
});

const LinearRegression = require("./index");

test("test", () => {
  const l = new LinearRegression();
  const x = [1, 2, 3];
  const y = [1, 2, 3];
  expect(l.fit(x, y)).toEqual({ coef: 1, intercept: 0 });
});

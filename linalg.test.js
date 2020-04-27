import { matrixRank, solve } from "./linalg";

test("", () => {
  const a = [
    [1, 1, 4, 1],
    [0, 3, 1, 1],
    [0, 6, 2, 3],
  ];

  expect(matrixRank(a)).toEqual(3);
});

test("", () => {
  const a = [
    [1, 1, 4, 1],
    [0, 3, 1, 1],
    [0, 6, 2, 2],
  ];

  expect(matrixRank(a)).toEqual(2);
});

test("", () => {
  const a = [
    [1, 1, 4, 1, 0],
    [1, 1, 4, 1, 1],
    [0, 3, 1, 1, 1],
    [0, 6, 2, 2, 2],
  ];

  expect(matrixRank(a)).toEqual(3);
});

test("", () => {
  const A = [
    [1, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 3, 0],
    [0, 0, 0, 4],
  ];

  const b = [-1, -1, -1, -1];
  const expected = [[-1], [-0.5], [-1 / 3], [-0.25]];
  expect(solve(A, b)).toEqual(expected);
});

import matrixRank from "./linalg";

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

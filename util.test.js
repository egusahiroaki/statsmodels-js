const dot = require("./util");

test("one dimensional array", () => {
  const actual = dot([1, 2], [3, 4]);
  const expected = 11;
  expect(actual).toEqual(expected);
});

test("two dimensional array", () => {
  const actual = dot(
    [
      [1, 0],
      [0, 1],
    ],
    [
      [4, 1],
      [2, 2],
    ]
  );
  const expected = [
    [4, 1],
    [2, 2],
  ];
  expect(actual).toEqual(expected);
});

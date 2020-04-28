import dot from "./util";

test("one dimensional array", () => {
  const actual = dot([1, 2], [3, 4]);
  const expected = 11;
  expect(actual).toEqual(expected);
});

test("one dimensional array", () => {
  const actual = dot(
    [
      [1, 1],
      [10, 12],
      [11, 13],
    ],
    [1, 2]
  );
  const expected = [3, 34, 37];
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

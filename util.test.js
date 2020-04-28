import { dot, transpose } from "./util";

describe("dot function", () => {
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
});

describe("transpose function", () => {
  test("", () => {
    const a = [[1, 2, 3]];
    const expected = [[1], [2], [3]];
    expect(transpose(a)).toEqual(expected);
  });

  test("", () => {
    const a = [
      [1, 2, 3],
      [3, 4, 5],
    ];
    const expected = [
      [1, 3],
      [2, 4],
      [3, 5],
    ];
    expect(transpose(a)).toEqual(expected);
  });
});

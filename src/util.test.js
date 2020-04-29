import {
  dot,
  transpose,
  hasEverySameArray,
  unitMatrix,
  matrixAdd,
} from "./util";

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

describe("hasEverySameArray function", () => {
  test("same", () => {
    const a = [
      [1, 2, 3],
      [1, 2, 3],
    ];
    const expected = true;
    expect(hasEverySameArray(a)).toEqual(expected);
  });

  test("same 2", () => {
    const a = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ];
    const expected = true;
    expect(hasEverySameArray(a)).toEqual(expected);
  });

  test("not same", () => {
    const a = [
      [1, 2, 3],
      [1, 2, 1],
    ];
    const expected = false;
    expect(hasEverySameArray(a)).toEqual(expected);
  });

  test("not same", () => {
    const a = [
      [1, 2, 3],
      [1, 2, 1],
      [1, 2, 3],
      [1, 2, 3],
    ];
    const expected = false;
    expect(hasEverySameArray(a)).toEqual(expected);
  });
});

describe("unitMatrix", () => {
  test("", () => {
    const expected = [
      [1, 0],
      [0, 1],
    ];
    expect(unitMatrix(2)).toEqual(expected);
  });

  test("", () => {
    const expected = [
      [3, 0],
      [0, 3],
    ];
    expect(unitMatrix(2, 3)).toEqual(expected);
  });

  test("", () => {
    const expected = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    expect(unitMatrix(4)).toEqual(expected);
  });
});

describe("matrixAdd", () => {
  test("", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];

    const b = [
      [10, 20],
      [30, 40],
    ];

    const expected = [
      [11, 22],
      [33, 44],
    ];
    expect(matrixAdd(a, b)).toEqual(expected);
  });
});

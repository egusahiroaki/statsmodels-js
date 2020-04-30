import { ndArray } from "./ndarray";

describe("ndArray", () => {
  test("one dimention", () => {
    const array = [1, 1, 1];
    const a = new ndArray(array);
    const expected = [3];
    expect(a._shape).toEqual(expected);
  });

  test("two dimention", () => {
    const array = [[1], [1], [1]];
    const a = new ndArray(array);
    const expected = [3, 1];
    expect(a._shape).toEqual(expected);
  });

  test("invalid elements", () => {
    const array = [[1, 2], [1], [1, 2]];
    expect(() => {
      new ndArray(array);
    }).toThrowError(new Error("invalid elements"));
  });
});

import { ndArray } from "./ndarray";

describe("ndArray", () => {
  describe("new", () => {
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

  describe("add", () => {
    describe("one dimension", () => {
      test("different shape", () => {
        const a = new ndArray([1, 1, 1]);
        const b = new ndArray([2, 3]);
        expect(() => {
          a.add(b);
        }).toThrowError(new Error("different shape"));
      });

      test("", () => {
        const a = new ndArray([1, 1, 1]);
        const b = new ndArray([2, 3, 4]);
        const expected = [3, 4, 5];
        expect(a.add(b)).toEqual(expected);
      });
    });
  });

  describe("two dimension", () => {
    test("different shape", () => {
      const a = new ndArray([
        [1, 2],
        [2, 3],
        [4, 5],
      ]);
      const b = new ndArray([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
      ]);
      expect(() => {
        a.add(b);
      }).toThrowError(new Error("different shape"));
    });

    test("", () => {
      const a = new ndArray([
        [1, 2],
        [2, 3],
        [4, 5],
      ]);
      const b = new ndArray([
        [10, 20],
        [20, 30],
        [40, 50],
      ]);
      const expected = [
        [11, 22],
        [22, 33],
        [44, 55],
      ];
      expect(a.add(b)).toEqual(expected);
    });
  });

  describe("multiple", () => {
    describe("one dimension", () => {
      test("", () => {
        const a = new ndArray([1, 1, 1]);
        const b = 4;
        const expected = [4, 4, 4];
        expect(a.multiply(b)).toEqual(expected);
      });
    });

    describe("two dimension", () => {
      test("", () => {
        const a = new ndArray([
          [1, 2],
          [2, 3],
          [4, 5],
        ]);
        const b = 10;
        const expected = [
          [10, 20],
          [20, 30],
          [40, 50],
        ];
        expect(a.multiply(b)).toEqual(expected);
      });
    });
  });
});

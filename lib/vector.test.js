import { Vector } from "./Vector";

describe("Vector", () => {
  describe("add", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.add(b)._array).toEqual([3, 5, 7]);
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3]);
      expect(() => {
        a.add(b);
      }).toThrowError(new Error("different shape"));
    });
  });

  describe("substract", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.substract(b)._array).toEqual([-1, -1, -1]);
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3]);
      expect(() => {
        a.substract(b);
      }).toThrowError(new Error("different shape"));
    });
  });

  describe("multip]y", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 10;
      expect(a.multiply(b)._array).toEqual([10, 20, 30]);
    });
  });

  describe("dot", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.dot(b)._array).toEqual([2, 6, 12]);
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3]);
      expect(() => {
        a.substract(b);
      }).toThrowError(new Error("different shape"));
    });
  });
});
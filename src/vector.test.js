import Vector from "./Vector";

describe("Vector", () => {
  describe("add", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 2;
      expect(a.add(b)._array).toEqual([3, 4, 5]);
    });
  });

  describe("addVec", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.addVec(b)._array).toEqual([3, 5, 7]);
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3]);
      expect(() => {
        a.addVec(b);
      }).toThrowError(new Error("different shape"));
    });
  });

  describe("substract", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 2;
      expect(a.substract(b)._array).toEqual([-1, 0, 1]);
    });
  });

  describe("substractVec", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.substractVec(b)._array).toEqual([-1, -1, -1]);
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3]);
      expect(() => {
        a.substractVec(b);
      }).toThrowError(new Error("different shape"));
    });
  });

  describe("multiply", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 10;
      expect(a.multiply(b)._array).toEqual([10, 20, 30]);
    });
  });
  describe("multiplyVec", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.multiplyVec(b)._array).toEqual([2, 6, 12]);
    });
  });

  describe("divide", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 0;
      expect(() => {
        a.divide(b);
      }).toThrowError(new Error("argument should be not zero"));
    });

    test("", () => {
      const a = new Vector([10, 20, 30]);
      const b = 10;
      expect(a.divide(b)._array).toEqual([1, 2, 3]);
    });
  });

  describe("divideVec", () => {
    test("", () => {
      const a = new Vector([10, 20, 30]);
      const b = new Vector([2, 4, 5]);
      expect(a.divideVec(b)._array).toEqual([5, 5, 6]);
    });

    test("", () => {
      const a = new Vector([10, 20, 30]);
      const b = 10;
      expect(a.divide(b)._array).toEqual([1, 2, 3]);
    });
  });

  describe("pow", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 2;
      expect(a.pow(b)._array).toEqual([1, 4, 9]);
    });
  });

  describe("dot", () => {
    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3, 4]);
      expect(a.dot(b)).toEqual(new Vector([2, 6, 12]).sum());
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([2, 3]);
      expect(() => {
        a.dot(b);
      }).toThrowError(new Error("different shape"));
    });
  });

  describe("mean", () => {
    test("", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      expect(a.mean()).toEqual(3.5);
    });
  });

  describe("sd", () => {
    test("", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      expect(a.sd()).toEqual(1.707825127659933);
    });
  });

  describe("var", () => {
    test("", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      expect(a.var()).toEqual(2.9166666666666665);
    });
  });

  describe("sem", () => {
    test("", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      expect(a.sem()).toEqual(0.6972166887783964);
    });
  });
});

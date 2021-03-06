import Vector from "./vector";

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

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 1;
      expect(() => {
        a.addVec(b);
      }).toThrowError(new Error("invalid arguments"));
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

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 1;
      expect(() => {
        a.substractVec(b);
      }).toThrowError(new Error("invalid arguments"));
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

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 1;
      expect(() => {
        a.multiplyVec(b);
      }).toThrowError(new Error("invalid arguments"));
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = new Vector([1, 2]);
      expect(() => {
        a.multiplyVec(b);
      }).toThrowError(new Error("different shape"));
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
      const a = new Vector([1, 2, 3]);
      const b = new Vector([1, 2]);
      expect(() => {
        a.divideVec(b);
      }).toThrowError(new Error("different shape"));
    });

    test("", () => {
      const a = new Vector([1, 2, 3]);
      const b = 10;
      expect(() => {
        a.divideVec(b);
      }).toThrowError(new Error("invalid arguments"));
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

  describe("isEqualTo", () => {
    test("Not Array throw Error", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      const b = 1;
      expect(() => {
        a.isEqualTo(b);
      }).toThrowError(
        new Error("The argument has to be Array or Vector Object.")
      );
    });

    test("Not Array False", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      const b = [1, 2, 3, 4, 5, 7];
      expect(a.isEqualTo(b)).toBeFalsy();
    });

    test("Not Array True", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      const b = [1, 2, 3, 4, 5, 6];
      expect(a.isEqualTo(b)).toBeTruthy();
    });

    test("different size", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      const b = new Vector([1, 2, 3, 4, 5]);
      expect(a.isEqualTo(b)).toBeFalsy();
    });

    test("same size, but there are some different elements", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      const b = new Vector([1, 2, 3, 4, 5, 7]);
      expect(a.isEqualTo(b)).toBeFalsy();
    });

    test("same elements", () => {
      const a = new Vector([1, 2, 3, 4, 5, 6]);
      const b = new Vector([1, 2, 3, 4, 5, 6]);
      expect(a.isEqualTo(b)).toBeTruthy();
    });
  });
});

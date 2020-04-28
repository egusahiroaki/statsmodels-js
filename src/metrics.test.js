import { meanSquaredError, r2Score } from "./metrics";

describe("meanSquaredError", () => {
  test("", () => {
    const yTrue = [1];
    const yPred = [2, 3, 4];
    expect(() => {
      meanSquaredError(yTrue, yPred);
    }).toThrowError(new Error("The size of both arrays should be same."));
  });

  test("", () => {
    const yTrue = [3, -0.5, 2, 7];
    const yPred = [2.5, 0.0, 2, 8];

    expect(meanSquaredError(yTrue, yPred)).toEqual(0.375);
  });

  test("", () => {
    const yTrue = [3, -0.5, 2, 7];
    const yPred = [2.5, 0.0, 2, 8];

    expect(meanSquaredError(yTrue, yPred, { squared: false })).toEqual(
      0.6123724356957945
    );
  });
});

describe("r2Score", () => {
  test("", () => {
    const yTrue = [1, 2];
    const yPred = [1, 2];
    expect(r2Score(yTrue, yPred)).toEqual(1);
  });

  test("", () => {
    const yTrue = [1, 2];
    const yPred = [0.9, 2.1];
    expect(r2Score(yTrue, yPred)).toEqual(0.96);
  });

  test("", () => {
    const yTrue = [3, -0.5, 2, 7];
    const yPred = [2.5, 0.0, 2, 8];
    expect(r2Score(yTrue, yPred)).toEqual(0.9486081370449679);
  });
});

import { meanSquaredError } from "./metrics";

describe("meanSquaredError", () => {
  test("", () => {
    const yTrue = [3, -0.5, 2, 7];
    const yPred = [2.5, 0.0, 2, 8];

    expect(meanSquaredError(yTrue, yPred)).toEqual(0.375);
  });
});

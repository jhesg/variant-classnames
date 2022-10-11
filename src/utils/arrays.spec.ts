import { chunk, backfill } from "./arrays";

describe("chunk()", () => {
  it("should split array into tuples of 2 and backfill smaller chunks with given value", () => {
    expect(chunk(Array(0).fill("x"), 2, "y")).toEqual([]);
    expect(chunk(Array(1).fill("x"), 2, "y")).toEqual([["x", "y"]]);
    expect(chunk(Array(3).fill("x"), 2, "y")).toEqual([
      ["x", "x"],
      ["x", "y"],
    ]);
  });
});

describe("backfill()", () => {
  it("should create a new array of same size as input and backfill gaps with value", () => {
    expect(backfill(Array(2).fill("x"), 5, "y")).toEqual(["x", "x", "y", "y", "y"]);
    expect(backfill(Array(2).fill("x"), 1, "y")).toEqual(["x", "x"]);
    expect(backfill(Array(3).fill("x"), 0, "y")).toEqual(["x", "x", "x"]);
  });
});

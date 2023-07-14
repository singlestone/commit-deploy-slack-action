import { expect, it } from "vitest";

import { reduceAdditionalPlaceholders } from "./reducers.js";

it("reduces a valid input", () => {
  const input = ["example=example", "test=test", "equals=="];

  expect(reduceAdditionalPlaceholders(input)).toEqual({
    example: "example",
    test: "test",
    equals: "=",
  });
});

it("ignores invalid inputs", () => {
  const input = ["example=example", "test=test", "equals==", "=something", ""];

  expect(reduceAdditionalPlaceholders(input)).toEqual({
    example: "example",
    test: "test",
    equals: "=",
  });
});

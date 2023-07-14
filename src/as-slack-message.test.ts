import { expect, it } from "vitest";

import example from "./__fixtures__/example.json";
import { asSlackMessage } from "./as-slack-message.js";

it("has 1 block when no packages were published", async () => {
  const message = asSlackMessage("test");

  expect(message.buildToObject().blocks).toHaveLength(1);
});

it("outputs the expected format", async () => {
  const message = asSlackMessage("test");

  expect(JSON.parse(message.buildToJSON())).toEqual(example);
});

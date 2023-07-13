import { expect, it } from "vitest";

import example from "./__fixtures__/example.json";
import { publishedMessage } from "./publishedMessage";

it("has 1 block when no packages were published", async () => {
  const commitSha = "123";
  const repoLink = "https://github.com/test/test";
  const repoShorthand = "test/test";

  const message = publishedMessage("", commitSha, repoLink, repoShorthand);

  expect(message.buildToObject().blocks).toHaveLength(1);
});

it("has 2 blocks when no packages were published", async () => {
  const configMessage = "123";
  const commitSha = "123";
  const repoLink = "https://github.com/test/test";
  const repoShorthand = "test/test";

  const message = publishedMessage(
    configMessage,
    commitSha,
    repoLink,
    repoShorthand
  );

  expect(message.buildToObject().blocks).toHaveLength(2);
});

it("outputs the expected format", async () => {
  const commitSha = "123";
  const repoLink = "https://github.com/test/test";
  const repoShorthand = "test/test";

  const message = publishedMessage("", commitSha, repoLink, repoShorthand);

  expect(JSON.parse(message.buildToJSON())).toEqual(example);
});

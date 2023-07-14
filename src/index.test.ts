import { afterEach, beforeAll, beforeEach, expect, it } from "vitest";

import { fakeGitHubContext } from "./__fixtures__/fake-github-context.js";
import integration from "./__fixtures__/integration.json";
import { asSlackMessage } from "./as-slack-message.js";
import { register, unregister } from "./sqrl/register.js";
import { templateMessage } from "./template-message.js";

beforeAll(() => {
  unregister();
});

beforeEach(() => {
  register();
});

afterEach(() => {
  unregister();
});

it("creates a templated Slack message", () => {
  expect(
    JSON.parse(
      asSlackMessage(
        templateMessage({
          configMessage:
            ":rocket: A new [[@linkify(it.links.commitSha, 'version') /]] of [[@linkify(it.links.repository, it.repository) /]] has been deployed!",
          github: fakeGitHubContext,
          linkRoot: "https://github.com",
        }),
      ).buildToJSON(),
    ),
  ).toEqual(integration);
});

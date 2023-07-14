import { afterEach, beforeAll, beforeEach, expect, it } from "vitest";

import { fakeGitHubContext } from "./__fixtures__/fake-github-context.js";
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

it("templates a message", () => {
  expect(
    templateMessage({
      configMessage:
        ":rocket: A new [[@linkify(it.links.commitSha, 'version') /]] of [[@linkify(it.links.repository, it.repository) /]] has been deployed!",
      github: fakeGitHubContext,
      linkRoot: "https://github.com",
    }),
  ).toEqual(
    ":rocket: A new <https://github.com/singlestone/commit-deploy-slack-action/commit/test|version> of <https://github.com/singlestone/commit-deploy-slack-action|singlestone/commit-deploy-slack-action> has been deployed!",
  );
});

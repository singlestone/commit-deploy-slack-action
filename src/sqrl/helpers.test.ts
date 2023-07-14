import { render } from "squirrelly";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { registerHelpers, unregisterHelpers } from "./helpers";

beforeAll(() => {
  unregisterHelpers();
});

beforeEach(() => {
  registerHelpers();
});

afterEach(() => {
  unregisterHelpers();
});

describe("linkify", async () => {
  it("throws an error when given no arguments", () => {
    expect(() =>
      render("{{@linkify /}}", {
        links: {
          commitSha:
            "https://github.com/singlestone/commit-deploy-slack-action/commit/test",
        },
      }),
    ).toThrowError();
  });

  it("creates a link", () => {
    expect(
      render("{{@linkify(it.links.commitSha) /}}", {
        links: {
          commitSha:
            "https://github.com/singlestone/commit-deploy-slack-action/commit/test",
        },
      }),
    ).toEqual(
      "<https://github.com/singlestone/commit-deploy-slack-action/commit/test>",
    );
  });

  it("uses the provided alias", () => {
    expect(
      render("{{@linkify(it.links.commitSha, 'version') /}}", {
        links: {
          commitSha:
            "https://github.com/singlestone/commit-deploy-slack-action/commit/test",
        },
      }),
    ).toEqual(
      "<https://github.com/singlestone/commit-deploy-slack-action/commit/test|version>",
    );
  });
});

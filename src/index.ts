import * as core from "@actions/core";
import * as github from "@actions/github";

import { asSlackMessage } from "./as-slack-message.js";
import { notifySlackWebhook } from "./notify.js";
import { register } from "./sqrl/register.js";
import { templateMessage } from "./template-message.js";

(async () => {
  register();

  const dryRun = core.getBooleanInput("dryRun");
  const webhook = core.getInput("slackWebhook", { required: true });
  const configMessage = core.getInput("message");
  const linkRoot = core.getInput("linkRoot") || "https://github.com";

  const templatedMessage = templateMessage({
    configMessage,
    github: github.context,
    linkRoot,
  });
  const message = asSlackMessage(templatedMessage);

  if (!dryRun) {
    await notifySlackWebhook(webhook, message.buildToJSON());
  } else {
    console.log("Dry run enabled, printing message instead!");
    console.log(message);
  }
})().catch((e) => {
  console.error(e);
  if (
    typeof e === "object" &&
    e != null &&
    "message" in e &&
    typeof e.message === "string"
  ) {
    core.setFailed(e.message);
  } else {
    core.setFailed("Unable to determine why, but it failed!");
  }
});

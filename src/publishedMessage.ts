import { Blocks, Md, Message } from "slack-block-builder";
import dedent from "ts-dedent";

export const publishedMessage = (
  configMessage: string,
  commitSha: string,
  repoLink: string,
  repoShorthand: string
) => {
  const linkToRepo = Md.link(repoLink, repoShorthand);
  const linkToCommit = Md.link(`${repoLink}/commit/${commitSha}`, "version");

  const baseMessage = Message()
    .asUser()
    .blocks(
      Blocks.Section({
        text: dedent`
        ${Md.emoji(
          "ship"
        )} A new ${linkToCommit} of ${linkToRepo} has been deployed!
      `,
      })
    );
  if (configMessage) {
    return baseMessage.blocks(
      Blocks.Section({
        text: dedent`
          ${configMessage}
        `,
      })
    );
  }
  return baseMessage;
};

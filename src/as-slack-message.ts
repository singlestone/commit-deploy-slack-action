import { Blocks, Message } from "slack-block-builder";

export const asSlackMessage = (message: string) => {
  return Message()
    .asUser()
    .blocks(
      Blocks.Section({
        text: message,
      }),
    );
};

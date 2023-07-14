import { Md } from "slack-block-builder";
import { helpers } from "squirrelly";
import type { HelperFunction } from "squirrelly/dist/types/containers";

export const linkify: HelperFunction = (content, blocks) => {
  if (blocks && blocks.length > 0) {
    throw new Error("Helper 'linkify' doesn't accept blocks");
  }
  const params = content.params;
  if (params.length < 1) {
    throw new Error("Helper 'linkify' requires at least one parameter");
  }
  const url = String(params.at(0));
  const alias = params.at(1);
  return Md.link(url, alias ? String(alias) : undefined);
};

export const registerHelpers = () => {
  helpers.define("linkify", linkify);
};

export const unregisterHelpers = () => {
  helpers.remove("linkify");
};

import { context } from "@actions/github";
import { render } from "squirrelly";

interface TemplateMessageParams {
  additionalPlaceholders: Record<string, string>;
  configMessage: string;
  github: typeof context;
  linkRoot: string;
}
export const templateMessage = (params: TemplateMessageParams): string => {
  const repository = `${params.github.repo.owner}/${params.github.repo.repo}`;
  const links = {
    commitSha: [params.linkRoot, repository, "commit", params.github.sha].join(
      "/",
    ),
    repository: [params.linkRoot, repository].join("/"),
    run: [
      params.linkRoot,
      repository,
      "actions",
      "runs",
      params.github.runId,
    ].join("/"),
  };

  return render(
    params.configMessage,
    {
      github: params.github,
      links,
      repository,
      ...params.additionalPlaceholders,
    },
    {
      tags: ["[[", "]]"],
    },
  );
};

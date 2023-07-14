import { context } from "@actions/github";

export const fakeGitHubContext: typeof context = {
  payload: {},
  eventName: "",
  sha: "test",
  ref: "test",
  workflow: "",
  action: "",
  actor: "",
  job: "",
  runNumber: 0,
  runId: 0,
  apiUrl: "",
  serverUrl: "",
  graphqlUrl: "",
  issue: { owner: "", repo: "", number: 0 },
  repo: {
    owner: "singlestone",
    repo: "commit-deploy-slack-action",
  },
};

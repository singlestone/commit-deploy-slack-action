# Commit Deploy Slack Action

GitHub Action to publish messages to a Slack webhook after a deployment.

## Example Workflow

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Send a Slack notification
        with:
          slackWebhook: ${{ secrets.SLACK_WEBHOOK }}
```

## Message Customization

By default, a message like the below will be used. You can override this by providing a `message` configuration value.
We use [squirrelly](https://squirrelly.js.org/) as the templating engine with `[[` and `]]` as delimiters.

![A new version of singlestone/team-insights-ui has been deployed!](./img/message.png)

### Helpers

- `@linkify`: Helps with building links to things. Example: `@linkify('https://google.com')`
  - Input:
    - `url`: **mandatory** - obviously the URL you want to link to :)
    - `text`: **optional** - what text you want to show instead of just the link text

### Supported placeholders

- `it.github.*`: You can get everything off of the regular GitHub context provided to GitHub actions.
- `it.repository`: The shorthand name for the repo (e.g., `singlestone/commit-deploy-slack-action`)
- `it.links.commitSha`: Link to the commit that triggered this action.
- `it.links.repository`: Link to the repository that triggered this action.
- `it.links.run`: Link to the GitHub Actions run that triggered this action.

### Additional placeholders

You can provide your own placeholders you can use with the message.

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Send a Slack notification
        with:
          additionalPlaceholders: |
            non-production=https://google.com
          message: ":rocket: A new [[@linkify(it.links.commitSha, 'version') /]] of [[@linkify(it.links.repository, it.repository) /]] has been deployed to [[@linkify(it['non-production'], 'non-production') /]]!"
          slackWebhook: ${{ secrets.SLACK_WEBHOOK }}
```

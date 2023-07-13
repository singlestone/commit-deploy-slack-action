# Changesets Publish Slack Action

GitHub Action to publish messages to a Slack webhook after publishing packages with [Changesets].

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
      - name: Checkout Repo
        uses: actions/checkout@v3

      - name: Setup Node.js 16.x
        uses: actions/setup-node@v3
        with:
          node-version: 16.x

      - name: Install Dependencies
        run: yarn

      - name: Create Release Pull Request or Publish to npm
        id: changesets
        uses: changesets/action@v1
        with:
          # This expects you to have a script called release which does a build for your packages and calls changeset publish
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Send a Slack notification if a publish happens
        uses: ToppleTheNun/changesets-slack-publish-action@v1
        if: steps.changesets.outputs.published == 'true'
        with:
          publishedPackages: ${{ steps.changesets.outputs.publishedPackages }}
          slackWebhook: ${{ secrets.SLACK_WEBHOOK }}
```

[Changesets]: https://github.com/changesets/changesets

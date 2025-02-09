---
description: List of all available commands that you can use to help us with development and testing
menuTitle: Available Commands
---

# docker-to-iac Available Commands

The following commands are currently supported:

- `npm run build`
  - Will build the module and create output files inside `dist/` direcotry.
- `npm run lint`
  - Will run eslint command. ESLint is also run as part of GitHub action test for new pull request on the default `main` branch.
- `npm run test`
  - Runs the tests defined in the `test/test.ts` file. The tests are also part of the GitHub action pipeline for new pull requests into `main`.
- `npm run semantic-release`
  - Runs the semantic-release command which is part of the release process of [docker-to-iac](https://www.npmjs.com/package/@deploystack/docker-to-iac) modules to npm registry. The release is executed through a [GitHub action pipeline](/docs/docker-to-iac/publishing-to-npm.md).

View all commands config from [package.json](https://github.com/deploystackio/docker-to-iac/blob/main/package.json).

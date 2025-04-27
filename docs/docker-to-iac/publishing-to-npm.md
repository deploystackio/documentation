---
description: Explore our automated NPM publishing workflow for docker-to-iac. From pull request to package release, understand how we ensure quality through CI/CD.
---

# Publishing docker-to-iac module to NPM

We have created an organization @deploystack for NPM. Publishing in NPM happens automatically through `semantic-release`. Config: [https://github.com/deploystackio/docker-to-iac/blob/main/.github/workflows/release-pr.yml](https://github.com/deploystackio/docker-to-iac/blob/main/.github/workflows/release-pr.yml)

The prerequisite for a release is a successful pull request to the default branch `main`. This means that all tests must first be successfully completed. `semantic-release` creates a new version and automatically publishes the node package to: [https://www.npmjs.com/package/@deploystack/docker-to-iac](https://www.npmjs.com/package/@deploystack/docker-to-iac)

Semantic-Release docs: [https://semantic-release.gitbook.io/semantic-release](https://semantic-release.gitbook.io/semantic-release)

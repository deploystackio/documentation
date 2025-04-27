---
description: Explore our automated NPM publishing workflow for docker-to-iac. From preparing a release branch to package deployment, understand our conventional commits-based process.
menuTitle: Publishing to NPM
---

# Publishing docker-to-iac module to NPM

We have created an organization @deploystack for NPM. Publishing in NPM happens automatically through `semantic-release`. Config: [https://github.com/deploystackio/docker-to-iac/blob/main/.github/workflows/release-pr.yml](https://github.com/deploystackio/docker-to-iac/blob/main/.github/workflows/release-pr.yml)

## Release Process Overview

The release process follows these steps:

1. Initiate a release preparation using the GitHub workflow
2. Review and merge the release pull request
3. Automatic publishing to NPM when the release PR is merged

## Starting a Release

Releases can be initiated through the GitHub Actions UI:

1. Navigate to the "Actions" tab in the repository
2. Select the "Release Process" workflow
3. Click "Run workflow"
4. Choose the release type:
   - `patch` (bug fixes)
   - `minor` (new features)
   - `major` (breaking changes)
5. Optionally select "Prerelease" for beta versions
6. Click "Run workflow"

## What Happens During Release Preparation

The workflow performs the following steps:

1. Updates the version in package.json based on conventional commits
2. Updates the CHANGELOG.md file with details of changes since the last release
3. Creates a new branch with these changes (named `release-v{version}`)
4. Provides a link to create a pull request

## Creating the Pull Request

After the workflow completes:

1. Follow the link provided in the workflow output to create a pull request
2. **Important**: Add the `release` label to your pull request
3. Request a review of the PR

## Publishing Process

When the pull request with the `release` label is merged:

1. The GitHub Action automatically creates a Git tag for the new version
2. A GitHub release is created with the changelog contents
3. The package is built using `npm run build`
4. The package is published to NPM with public access

## Npm Package

The published package is available at: [https://www.npmjs.com/package/@deploystack/docker-to-iac](https://www.npmjs.com/package/@deploystack/docker-to-iac)

## Conventional Commits

The project uses conventional commits to determine version bumps and generate changelogs. Commit messages should follow this pattern:

- `feat: ...` - A new feature (minor version bump)
- `fix: ...` - A bug fix (patch version bump)
- `chore: ...` - Maintenance changes
- `docs: ...` - Documentation changes
- `style: ...` - Code style changes
- `refactor: ...` - Code refactoring
- `perf: ...` - Performance improvements
- `test: ...` - Test updates

Breaking changes should include `BREAKING CHANGE:` in the commit message body or footer.

## Configuration Files

The release process is configured through several files:

- `.github/workflows/release-pr.yml` - GitHub Actions workflow
- `.release-it.js` - Configuration for release-it
- `package.json` - NPM scripts for the release process

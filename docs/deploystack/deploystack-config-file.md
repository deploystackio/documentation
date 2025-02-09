---
description: Documentation for DeployStack's config.yml schema. Customize your application's presentation with automatic IDE validation and flexible repository metadata overrides.
menuTitle: DeployStack Config File
---

# DeployStack Configuration File Reference

The `.deploystack/config.yml` file allows you to customize how your application appears in the DeployStack catalog and deployment interfaces. This configuration file supports automatic validation in popular IDEs through SchemaStore integration.

## Configuration File Location

Create a `config.yml` file in your repository's `.deploystack` directory:

```bash
your-repository/
├── .deploystack/
│   ├── config.yml
│   └── docker-compose.yml (example, or docker-run.txt)
└── README.md
```

## Basic Configuration

Here's a minimal configuration example:

```yaml
application:
  name: "My Application"
  description: "A scalable web application with Redis caching"
  logo: "https://example.com/path/to/logo.png"
```

## Configuration Options

### Application Settings

When you submit a repository to DeployStack, we automatically use:

- Repository name as the application name
- Repository description as the application description

You can override these values using the `config.yml` (only on your main branch) file:

| Property | Type | Description | Constraints |
|----------|------|-------------|-------------|
| `name` | String | Override the repository name for DeployStack display | Maximum 40 characters |
| `description` | String | Override the repository description for DeployStack display | Maximum 500 characters |
| `logo` | String | URL to your application logo | [Application Logo Configuration](/docs/deploystack/application-logo-configuration.md) |

The override process follows this order:

1. DeployStack first uses your repository name and description
2. If present, values in `.deploystack/config.yml` override the repository metadata

### Branch Deployment Settings

Before configuring multiple branch deployments, ensure you have installed the [DeployStack Repository Sync GitHub App](/docs/deploystack/github-application.md), as it's required for branch monitoring and template updates.

You can configure multiple branch deployments using the `deployment.branches` section:

| Property | Type | Description | Constraints |
|----------|------|-------------|-------------|
| `label` | String | Display name for the branch | Maximum 20 characters |
| `description` | String | Explain the branch's purpose or version | Maximum 100 characters |
| `active` | Boolean | Whether this branch is available for deployment | Optional, defaults to true |
| `priority` | Number | Order in which branches appear (lower numbers first) | Minimum value: 1 |

The default branch always has `priority: 0` and appears first in the deployment options, regardless of other branch priorities.

Example configuration for multiple branches:

```yaml
application:
  name: "My Application"
  description: "A scalable web application"

deployment:
  branches:
    v2:
      label: "Beta (v2.x)"
      description: "Preview of upcoming v2.x release"
      priority: 1
    v3:
      label: "Alpha (v3.x)"
      description: "Early preview of v3.x"
      priority: 2
```

Each branch configuration allows you to:

- Provide a user-friendly label for the version
- Include a description explaining the branch's purpose
- Control deployment availability with the `active` flag
- Set display order using `priority`

When multiple branches are configured:

- DeployStack generates separate deployment templates for each branch
- Users can choose which version to deploy
- The GitHub App monitors all configured branches for updates
- The default branch is always listed first with implicit `priority: 0`

This is especially useful for projects that maintain multiple active versions simultaneously, such as stable and beta releases.

## Schema Validation

The configuration file is automatically validated against our JSON Schema when using supported IDEs (VS Code, IntelliJ, etc.). The schema is available at:

```bash
https://cdnx.deploystack.io/schema/config.yml.json
```

## Notes

- Changes to the configuration file are only processed when made on your repository's default branch
- The logo URL must be accessible and point to a valid image file
- All configuration properties are optional, but providing them improves your application's visibility in the DeployStack catalog

## Usage Examples

### Override Repository Metadata

```yaml
application:
  name: "Redis Cache Manager"      # Overrides repository name
  description: "A more detailed description that better explains your application"  # Overrides repository description
  logo: "https://example.com/logos/redis-manager.png"
```

### Minimal Configuration example for logo update

Please visit our [Application Logo Configuration](/docs/deploystack/application-logo-configuration.md) page.

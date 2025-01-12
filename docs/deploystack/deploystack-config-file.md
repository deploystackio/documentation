---
description: Documentation for DeployStack's config.yml schema. Customize your application's presentation with automatic IDE validation and flexible repository metadata overrides.
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

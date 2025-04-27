---
description: Guide to implementing multi-branch deployment strategies with DeployStack, enabling version-specific deployments and automated template management.
menuTitle: Branch Strategy
---

# Branch Strategy

DeployStack's branch strategy allows you to maintain and deploy multiple versions of your application simultaneously. This is particularly valuable when you're evolving your application while maintaining stable versions for production users.

## The Multi-Version Journey

### Starting Point: Default Branch

Every repository starts with its default branch (typically `main` or `master`). This branch:

- Always generates Infrastructure as Code templates
- Cannot be excluded from template generation
- Has implicit `priority: 0` in deployment options
- Can be changed through your repository settings

When you change your default branch in GitHub:

- DeployStack automatically detects the change - you need to install [DeployStack GitHub App](/docs/deploystack/github-application.md)
- Regenerates templates for the new default branch
- Updates all deployment buttons

### Growing Your Application: Adding New Versions

As your application evolves, you might want to:

- Develop a new major version with breaking changes
- Maintain an LTS (Long Term Support) version
- Test new features with early adopters

This is where branch configurations become powerful. You can maintain up to 5 active branches, each with:

- Its own Docker configuration
- Separate environment variables
- Independent deployment options

For example, when developing version 2 of your application:

```yaml
deployment:
  branches:
    v2:
      label: "Version 2 Beta"
      description: "Next generation features"
      priority: 1
```

### Branch-Specific Configurations

Each branch can have its own `.deploystack` directory with standard configuration files. First, create the directories on your default branch:

```bash
# Default branch configuration

your-repository/
└── .deploystack/
    ├── config.yml
    ├── docker-compose.yml
    └── env
```

```bash
# v2 branch configuration

your-repository/
└── .deploystack/
    ├── config.yml
    ├── docker-compose.yml
    └── env
```

This structure allows you to:

- Use different Docker configurations per branch
- Maintain separate environment variables
- Modify service configurations independently
- Keep each version's deployment parameters isolated

Remember: The DeployStack GitHub App only monitors the standard filenames: check [.deploystack Directory Reference for more info](/docs/deploystack/deploystack-configuration-directory.md)

## Real-World Example

Let's say you're maintaining a web application:

```yaml
application:
  name: "MyWebApp"
  description: "Modern web application stack"

deployment:
  branches:
    v1-lts:
      label: "v1 LTS"
      description: "Stable v1.x release with long-term support"
      priority: 1
    v2-beta:
      label: "v2 Beta"
      description: "New architecture with enhanced features"
      priority: 2
    experimental:
      label: "Edge"
      description: "Latest experimental features"
      priority: 3
```

Each branch can have different Docker configurations:

- `main` branch (v1.x stable):

  ```yaml
  # docker-compose.yml
  services:
    web:
      image: myapp:1.5
  ```

- `v2-beta` branch:

  ```yaml
  # docker-compose.yml
  services:
    web:
      image: myapp:2.0-beta
  ```

## Benefits for Your Users

This strategy allows your users to:

- Choose the version that best fits their needs
- Test new versions while maintaining production deployments
- Safely transition between versions at their own pace
- Deploy LTS versions for stability
- Try experimental features in isolation

## Important Notes

- Maximum of 5 active branches supported
- Each branch can have unique Docker configurations
- Default branch can be changed (switch to another branch and make it default) but not excluded
- Branch configurations ([DeployStack config file](/docs/deploystack/deploystack-config-file.md)) must be in the default branch
- All branches are automatically monitored for changes
- Template regeneration happens automatically when:
  - Branch content changes
  - Default branch is changed
  - Configuration is updated

---
description: Guide to how DeployStack manages Infrastructure as Code template updates, including automatic synchronization, update triggers, and version control.
---

# Infrastructure as Code Lifecycle

This guide explains how DeployStack manages and updates your Infrastructure as Code (IaC) templates throughout their lifecycle.

## Template Generation Process

### Initial Setup

1. Create a `.deploystack` [configuration directory](/docs/deploystack/deploystack-configuration-directory.md) in your repository
2. Add your Docker configuration files:
   - `docker-compose.yml` for Compose configurations
   - `docker-run.txt` for Docker run commands
3. Submit your repository to [deploystack.io/submit](https://deploystack.io/submit)
4. Initial IaC templates are generated and stored in our [deploy-templates](https://github.com/deploystackio/deploy-templates) repository

### Enabling Automatic Updates

Install the [DeployStack Repository Sync](/docs/deploystack/github-application.md) GitHub App to keep your templates up to date when:

- You modify Docker configurations in the `.deploystack` directory
- Cloud providers update their IaC specifications
- DeployStack improves its template generation

![DeployStack IaC Lifecycle](/docs/assets/images/deploystack/iac-lifecycle.drawio.svg)

## Update Triggers

Your IaC templates are automatically updated in these scenarios:

### Repository Changes

When you modify files in your repository's default branch:

- Changes to `docker-compose.yml` or `docker-run.txt` in `.deploystack` directory
- Updates to repository metadata

### Provider Updates

Templates are regenerated when:

- Cloud providers modify their IaC specifications
- New provider features become available
- Provider API requirements change

### System Updates

DeployStack initiates template updates when:

- The docker-to-iac module receives improvements
- New template optimizations are available
- Bug fixes are released

## Template Versioning

All template updates are version controlled in our [deploy-templates repository](https://github.com/deploystackio/deploy-templates), allowing you to:

- Track template changes over time
- Review modification history
- Understand update triggers

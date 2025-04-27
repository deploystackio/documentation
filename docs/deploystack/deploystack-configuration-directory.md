---
description: Technical guide for setting up the .deploystack directory to manage Infrastructure as Code template generation and updates across your repository.
menuTitle: .deploystack Directory
---

# .deploystack Directory Reference

The `.deploystack` directory in your repository contains configuration files that DeployStack uses to generate and maintain your Infrastructure as Code templates. Creating this repo allows you to enable the [lifecycle of IaC](/docs/deploystack/iac-lifecycle.md). The deploystack configurations repo only makes sense if you also [install DeployStack GitHub app](/docs/deploystack/github-application.md). Otherwise, changes to DeployStack backend will not be recognized.

> [!NOTE]
> `.deploystack` directory is optional. You don't need to create it to submit your repository to deploystack.io.

## Directory Structure

```bash
.deploystack/
├── docker-compose.yml  # Docker Compose configuration
├── docker-run.txt      # Docker run command
├── env                 # Environment variables (optional)
```

## Configuration Files

### DeployStack Configuration File

Please read more at [DeployStack Configuration File Reference](/docs/deploystack/deploystack-config-file.md).

### Docker Configuration

Choose one of the following:

- `docker-compose.yml` - Standard Docker Compose configuration
- `docker-run.txt` - Single Docker run command

Example `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
```

Example `docker-run.txt`:

```bash
docker run -d -p 80:80 nginx:alpine
```

### Environment Variables

Please read more from our [environment variables](/docs/deploystack/docker-environment-variables.md) page.

## Automatic Updates

When the [DeployStack GitHub App](/docs/deploystack/github-application.md) is installed:

1. Changes to specific (`docker-compose.yml` & `docker-run.txt`) file in `.deploystack/` trigger template updates
2. Updates only process when changes occur on the default branch
3. New templates are generated and stored in the [deploy-templates](https://github.com/deploystackio/deploy-templates) repository

## Important Notes

- The `.deploystack` directory is **optional**
- Without this directory, automatic template updates are **not** available
- You can add the directory and install the [DeployStack GitHub Sync App](/docs/deploystack/github-application.md) at any time
- [Environment variables](/docs/deploystack/docker-environment-variables.md) and [DeployStack config](/docs/deploystack/deploystack-config-file.md) are optional components
- Only one Docker configuration file should be used (either compose or run)

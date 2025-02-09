---
description: Technical requirements for using Docker Compose with DeployStack's cloud deployment automation. Includes supported properties, registry options, and validation rules.
menuTitle: Docker Compose Requirements
---

# Docker Compose Requirements

DeployStack is designed to work with Docker Compose files that meet specific requirements. This page outlines what we support and what limitations you need to be aware of.

## Core Requirements

Your `docker-compose.yml` file must:

1. Use pre-built Docker images
2. Reference public images from Docker Hub or another registries -> check [Supported Registries](/docs/docker-to-iac/supported-registries.md)
3. Be a valid Docker Compose file (version 3 and above)

Your docker-compose file does not necessarily have to be called `docker-compose.yml` and does not have to be located in the root directory. You can rename your docker compose file and store it in any sub directory.

If your docker compose file is not located in the root directory and has not `docker-compose.yml` as the filename, you must submit the full path name to us by using the submit form [deploystack.io/submit](https://deploystack.io/submit) i.e.: `https://github.com/vuejs/vitepress/tree/main/deployment/docker-compose.yaml`.

## Image Requirements

### Must Use Pre-built Images

Your services must specify the `image` property. For example:

```yaml [docker-compose.yml]
# ✅ Supported
services:
  app:
    image: nginx:latest
    ports:
      - "80:80"
```

### Build Instructions Not Supported

We do not support services that use the `build` directive:

```yaml [docker-compose.yml]
# ❌ Not Supported
services:
  app:
    build:
      context: ./build/app
      dockerfile: Dockerfile
```

## Why These Requirements?

The infrastructure templates we generate require specific, immutable container images to ensure consistent deployments. Cloud providers need to know exactly which image to pull, which is why we require pre-built images.

## Supported Docker Compose Properties

We currently support these Docker Compose properties -> please check [Supported Docker Compose Variables](/docs/docker-to-iac/supported-docker-compose-variables.md).

## Multiple Services Support

DeployStack can handle Docker Compose files with multiple services, but support varies by cloud provider:

- Some providers support deploying all services at once
- Others will only deploy the first service in your compose file

Check the specific [Multi Services Support](/docs/docker-to-iac/multi-services-support.md) for details about multi-service support.

## Working with Private Images

Currently, DeployStack only supports public images from Docker Hub. If you need to use private images:

1. Make your images public on Docker Hub or [other supported registries](/docs/docker-to-iac/supported-registries.md)
2. Update your docker-compose.yml to reference the public images
3. Submit your repository to DeployStack

## Environment Variables

Please read more from our [environment variables](/docs/deploystack/docker-environment-variables.md) page.

## Validation

When you submit your repository, we perform these checks:

1. Valid Docker Compose syntax
2. Presence of required `image` property
3. Absence of unsupported features

## Next Steps

- See how [One-Click Deploy](/docs/deploystack/one-click-deploy.md) works
- Check the [Troubleshooting](/docs/deploystack/troubleshooting.md) guide if you run into issues

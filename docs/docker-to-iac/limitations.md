---
description: Current limitations and constraints of the docker-to-iac module
Multi-Service Support
menuTitle: Limitations
---

# Limitations for docker-to-iac module

## Registry Support

The module currently supports Docker images from -> please check [Supported Registries for docker-to-iac module](/docs/docker-to-iac/supported-registries.md)

## Docker Image Requirement

The `docker-to-iac` module is designed to work exclusively with pre-built Docker images. This means that each service in your `docker-compose.yml` file must specify an `image` property.

## Volume Support

When working with volume mappings in your Docker configuration, be aware that volume support varies among cloud providers:

- Some providers fully support multiple volume mappings
- Some providers only support the first volume mapping defined in your configuration
- Some providers support ephemeral files only, meaning no persistent volume storage is available
- Volume mapping implementation details can differ between providers

Please check the specific provider's documentation to understand their volume mapping capabilities and limitations before deployment.

For example, if your Docker configuration includes multiple volumes:

```yaml
services:
  app:
    image: nginx:latest
    volumes:
      - ./config:/etc/nginx/conf.d
      - ./logs:/var/log/nginx
      - ./data:/usr/share/nginx/html
```

Depending on your chosen provider:

- All volume mappings might be supported
- Only the first volume mapping (`./config:/etc/nginx/conf.d`) might be implemented
- No volumes might be supported, with only ephemeral storage available

We recommend reviewing your target provider's documentation for detailed information about their volume support capabilities.

### Build Instructions Not Supported

The module does not support services that use the `build` directive. For example:

```yaml [docker-compose.yml]
# ❌ Not Supported
services:
  app:
    build:
      context: ./build/app
      dockerfile: Dockerfile
```

Instead, you must use pre-built images:

```yaml [docker-compose.yml]
# ✅ Supported
services:
  app:
    image: nginx:latest
```

#### Rationale

This limitation exists because Infrastructure as Code (IaC) templates require specific, immutable container images to ensure consistent deployments. The infrastructure and the selection of cloud providers for this docker-to-iac module only allow pre-build container images. It is technically not possible to create a build with the preconfigured infrastructure. This is why the pre-build check was built in. This happens also because the scope of this module is only pre-build container.

### Workaround

If you need to use custom Docker images:

Build your Docker images locally or in your CI/CD pipeline
Push them to a container registry (like Docker Hub, GitHub Container Registry, or AWS ECR)
Reference the pushed image in your docker-compose file using the image property

For example:

```yaml
services:
  app:
    image: ghcr.io/your-org/your-app:1.0.0
```

This ensures that your IaC templates will have access to the exact same container image across all deployments.

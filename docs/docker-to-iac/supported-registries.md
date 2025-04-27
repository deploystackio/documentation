---
description: Complete guide to Docker registries in docker-to-iac - From official Docker Hub images to GHCR, learn supported formats with practical examples.
menuTitle: Supported Registries
---

# Supported Registries for docker-to-iac module

docker-to-iac supports multiple Docker image registries. Below you'll find details about supported registries and examples of how they are handled.

## Docker Hub Registry

Docker Hub is the default and most common registry for Docker images.

### Official Images

Docker Hub official images are maintained by Docker and don't include a username/organization prefix.

**Docker Compose Example:**

```yaml
services: 
  db: 
    image: redis:latest
```

**Translated Image URL:**

```text
docker.io/library/redis:latest 
```

### User/Organization Images

Docker Hub images that belong to specific users or organizations include the username/organization as prefix.

**Docker Compose Example:**

```yaml
services: 
  app: 
    image: nginx/nginx-prometheus-exporter:0.10.0
```

**Translated Image URL:**

```text
docker.io/nginx/nginx-prometheus-exporter:0.10.0
```

## GitHub Container Registry (GHCR)

GitHub Container Registry is GitHub's container registry service that allows you to host and manage Docker container images.

**Docker Compose Example:**

```yaml
services:
  monitor: 
    image: ghcr.io/dgtlmoon/changedetection.io
```

**Translated Image URL:**

```text
ghcr.io/dgtlmoon/changedetection.io
```

## Registry URL Formats

Here's how different registry types are handled:

| Registry Type | Format | Example |
|--------------|--------|---------|
| Docker Hub (Official) | docker.io/library/[image]:[tag] | docker.io/library/redis:latest |
| Docker Hub (User) | docker.io/[user]/[image]:[tag] | docker.io/nginx/nginx-prometheus-exporter:0.10.0 |
| GitHub Container Registry | ghcr.io/[user]/[image]:[tag] | ghcr.io/dgtlmoon/changedetection.io |

## Notes

- If no tag is specified, `latest` is used as the default tag
- The module preserves the original registry URL format for custom registries
- SHA256 digests are supported for all registry types
- All supported registries work with all parsers, including AWS CloudFormation, Render.com, DigitalOcean App Platform, and Kubernetes Helm Charts

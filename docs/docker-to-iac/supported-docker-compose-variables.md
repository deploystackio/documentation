---
description: Detailed reference for Docker Compose variables compatible with docker-to-iac translations. Find supported service properties, registry options, and configuration examples for successful IaC deployments.
menuTitle: Docker Compose Variables
---

# Supported Docker Compose Variables

This document outlines all the Docker Compose variables that are currently supported by the docker-to-iac module when translating your docker-compose.yml file into Infrastructure as Code templates.

## Core Requirements

The docker-to-iac module requires that your docker-compose.yml file meets these basic requirements:

1. The file must contain at least one service
2. Each service must specify an `image` property (build instructions are not supported)

## Supported Service Properties

For each service in your docker-compose.yml file, the following properties are supported:

### Required Properties

| Property | Description | Example |
|----------|-------------|----------|
| `image` | The Docker image to use for the service. Must be a pre-built image available in a public registry. | `image: nginx:latest` |

### Optional Properties

| Property | Description | Example |
|----------|-------------|----------|
| `ports` | List of ports to expose. Supports port mapping in standard Docker format. | `ports:`<br>`  - "8080:80"`<br>`  - "443:443"` |
| `command` | Override the default command of the Docker image. | `command: "npm start"` |
| `restart` | Container restart policy. | `restart: always` |
| `volumes` | List of volume mappings. | `volumes:`<br>`  - "data:/var/lib/mysql"`<br>`  - "./config:/etc/nginx/conf.d:ro"` |
| `environment` | Environment variables as key-value pairs. | `environment:`<br>`  NODE_ENV: production`<br>`  PORT: 3000` |

## Example Configuration

Here's a complete example showing all supported variables:

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    command: "nginx -g 'daemon off;'"
    restart: always
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    environment:
      NGINX_HOST: example.com
      NGINX_PORT: 80

  api:
    image: node:16-alpine
    ports:
      - "3000:3000"
    command: "npm start"
    restart: always
    environment:
      NODE_ENV: production
      DATABASE_URL: mongodb://db:27017/myapp
```

## Important Notes

1. Build instructions (`build:`) are not supported - you must use pre-built images
2. Services must use images that are publicly accessible
3. Each service must have an `image` property specified
4. Environment variables should not contain sensitive information as they will be included in the generated IaC templates
5. Volume definitions are supported but their implementation may vary depending on the target cloud platform

## Validation

The module performs validation checks to ensure:

- The docker-compose.yml file contains at least one service
- Each service has an `image` property specified
- The Docker image reference is valid and follows the expected format

If validation fails, the module will throw a `DockerComposeValidationError` with a descriptive message explaining the issue.

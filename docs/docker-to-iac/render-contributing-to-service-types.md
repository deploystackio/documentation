---
description: Guide for contributing to Render.com service type configurations in docker-to-iac
---

# Render: Contributing to Service Types Configuration

This guide explains how to contribute to the Render.com service type configurations in docker-to-iac. The service types configuration determines whether a Docker service should be deployed as a web service or private service on Render.com.

## Configuration Location

The service types configuration is stored in:

```bash
src/config/render/service-types.json
```

This configuration is specific to Render.com and is not used by other cloud provider parsers.

## JSON Structure

The configuration file uses the following structure:

```json
{
  "serviceTypes": {
    "docker.io/library/mariadb": {
      "type": "pserv",
      "description": "MariaDB database service - requires private service type due to TCP protocol",
      "versions": "*"
    }
  }
}
```

### Field Definitions

- `serviceTypes`: Root object containing all service type mappings
- Image key (e.g., `docker.io/library/mariadb`): The fully qualified Docker image name
  - Should match the normalized format from `getImageUrl` utility
  - For official Docker Hub images, use `docker.io/library/[name]`
  - For user repositories, use `docker.io/[user]/[repo]`
  - For GHCR, use `ghcr.io/[owner]/[repo]`
- `type`: The Render service type
  - `pserv` for private services (databases, message queues, etc.)
  - `web` is the default and doesn't need to be specified
- `description`: A clear explanation of why this service type is needed
- `versions`: Version matching pattern
  - Use `"*"` for all versions
  - Future: Will support semantic version ranges

## Contributing Guidelines

1. Identify the Need
   - Service fails when deployed as `web` type
   - Service requires TCP/private networking
   - Service is a database or backend service

2. Determine the Correct Image Name

   ```typescript
   // Use the getImageUrl utility to find the correct name format
   const imageUrl = getImageUrl('mysql:5.7');
   // Returns: docker.io/library/mysql
   ```

3. Add Your Configuration
   - Create a new entry in `service-types.json`
   - Include a descriptive comment explaining the change
   - Follow the JSON structure shown above

4. Submit a Pull Request
   - Fork the repository
   - Add your changes to `service-types.json`
   - Create a pull request with:
     - Clear description of the service
     - Why it needs a specific service type
     - Any relevant documentation links

## Example Pull Request

Here's an example of a good service type addition:

```json
{
  "serviceTypes": {
    "docker.io/library/mariadb": {
      "type": "pserv",
      "description": "MariaDB database service - requires private service type due to TCP protocol",
      "versions": "*"
    },
    "docker.io/library/postgres": {
      "type": "pserv",
      "description": "PostgreSQL database service - requires private networking for security",
      "versions": "*"
    }
  }
}
```

## Validation

Before submitting:

1. Verify the image name using the `getImageUrl` utility
2. Ensure your JSON is valid
3. Test the configuration with a sample deployment
4. Check that your service works with the assigned type

## Common Service Types

Common services that should use `pserv`:

- Databases (MySQL, PostgreSQL, MongoDB)
- Message queues (RabbitMQ, Apache Kafka)
- Cache services (except Redis, which uses type: "redis")
- Backend services that don't serve HTTP traffic

Services that should remain `web`:

- HTTP APIs
- Web applications
- Frontend services
- Application servers

## Getting Help

If you're unsure about:

- Which service type to use
- How to format the image name
- Whether a service needs a specific type

Please:

- Check Render's [service types documentation](https://render.com/docs/blueprint-spec#type)
- Open a discussion in our GitHub repository [github.com/deploystackio/feedback](https://github.com/deploystackio/feedback)
- Join our [Discord community](https://discord.gg/UjFWwByB) for help
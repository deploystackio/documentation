---
description: Configure service-to-service communication in multi-container applications with docker-to-iac's service connections feature. Transform Docker Compose service references to cloud provider formats.
menuTitle: Service Connections
---

# Service Connections

The `docker-to-iac` module now supports configuring service-to-service communication when translating Docker Compose files to cloud provider IaC templates. This feature is essential for multi-container applications where services need to communicate with each other (e.g., web applications connecting to databases).

## The Challenge

In Docker Compose, services can communicate with each other using the service name as the hostname:

```yaml
# docker-compose.yml
services:
  db:
    image: mariadb:latest
    # ...
  
  app:
    image: myapp:latest
    environment:
      - DATABASE_HOST=db  # Reference to the db service
      - API_URL=http://api:3000  # Reference within a URL
    # ...
```

However, when deploying to cloud providers, each has its own format for service discovery:

- **Render.com**: Uses Blueprint's `fromService` syntax for service references
- **DigitalOcean App Platform**: Services connect using the service name directly

The Service Connections feature automatically configures these references based on the target cloud provider.

## Supported Providers

Currently, service connections are supported for:

| Provider | Implementation | Example Reference |
|----------|---------------|------------------|
| Render.com | Blueprint's `fromService` | `fromService: { name: "db", type: "web", property: "hostport" }` |
| DigitalOcean App Platform | Direct service name | `db` or `http://api:3000` |

> **Note**: AWS CloudFormation is not supported for service connections as it does not provide a direct way to reference services by name across tasks in the generated architecture.

## Usage

To configure service connections, use the `serviceConnections` option in the `translate` function:

```javascript
import { translate } from '@deploystack/docker-to-iac';

const result = translate(dockerComposeContent, {
  source: 'compose',
  target: 'RND',  // Or 'DOP'
  templateFormat: 'yaml',
  serviceConnections: {
    mappings: [
      {
        fromService: 'app',           // Service that needs to connect
        toService: 'db',              // Service to connect to
        environmentVariables: [       // List of env vars that reference the service
          'DATABASE_HOST', 
          'API_URL'
        ]
      }
    ]
  }
});
```

### Configuration Options

For each service connection mapping:

- `fromService`: The service that needs to connect to another service
- `toService`: The service being connected to
- `environmentVariables`: Array of environment variable names that reference the target service

## Provider-Specific Implementations

### Render.com

For Render.com, the module generates Blueprint configurations using the native `fromService` syntax:

```yaml
# Generated Render Blueprint
services:
  - name: app
    # ...other configuration...
    envVars:
      # Regular environment variables
      - key: NODE_ENV
        value: production
        
      # Service reference using fromService
      - key: DATABASE_HOST
        fromService:
          name: db
          type: pserv
          property: hostport
```

This approach leverages Render's built-in service discovery capabilities for reliable inter-service communication.

### DigitalOcean App Platform

For DigitalOcean App Platform, the module maintains the direct service name references, as services can communicate directly using the service name:

```yaml
# Generated DigitalOcean App Spec
services:
  - name: app
    # ...other configuration...
    envs:
      - key: DATABASE_HOST
        value: db
      - key: API_URL
        value: http://api:3000
```

## Complete Example

Here's a complete example showing Node.js microservices communicating with each other:

```javascript
const dockerComposeContent = `
version: "3"

services:
  api:
    image: node:18-alpine
    command: node /app/server.js
    ports:
      - "3000:3000"
  
  frontend:
    image: node:18-alpine
    environment:
      - API_URL=http://api:3000  # This will be transformed appropriately
    ports:
      - "8080:8080"
`;

const serviceConnections = {
  mappings: [
    {
      fromService: 'frontend',
      toService: 'api',
      environmentVariables: ['API_URL']
    }
  ]
};

// For DigitalOcean - Service name stays as "api" in http://api:3000
// For Render - Will use fromService syntax instead of string replacement
```

## Response Format

The `translate` function returns information about the resolved service connections:

```javascript
{
  files: {
    // Generated IaC template files
  },
  serviceConnections: [
    {
      fromService: 'app',
      toService: 'db',
      variables: {
        'DATABASE_HOST': {
          originalValue: 'db',
          transformedValue: 'db'  // For DigitalOcean or Render
        }
      }
    }
  ]
}
```

This information can be useful for debugging or understanding how service connections were processed.

## Limitations

- The feature only transforms environment variable values that exactly match the service name
- More complex connection strings must be handled separately
- The feature doesn't adjust ports or protocols, only service hostnames

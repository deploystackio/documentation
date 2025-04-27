---
description: Example code for adding a new parser to docker-to-iac, supporting both Docker run commands and Docker Compose files, with multi-file output and service connections
menuTitle: Adding a New Parser
---

# Adding a New Parser

> [!TIP]
> Thank you for your interest in collaborating! The docker-to-iac module will remain open source forever, helping simplify deployments across cloud providers without vendor lock-in.

## Parser Implementation

Create a new file inside `src/parsers/new-provider.ts`:

```typescript
import { 
  BaseParser, 
  ParserInfo, 
  TemplateFormat, 
  ParserConfig,
  FileOutput,
  DockerImageInfo
} from './base-parser';
import { ApplicationConfig } from '../types/container-config';
import { parsePort } from '../utils/parsePort';
import { parseCommand } from '../utils/parseCommand';

// Define default configuration for your parser
const defaultParserConfig: ParserConfig = {
  files: [
    {
      path: 'awesome-iac.yaml',
      templateFormat: TemplateFormat.yaml,
      isMain: true,
      description: 'Main IaC configuration file'
    },
    {
      path: 'templates/resources.yaml',
      templateFormat: TemplateFormat.yaml,
      description: 'Additional resources configuration'
    }
  ],
  cpu: 512,
  memory: '1GB',
  region: 'default-region',
  subscriptionName: 'basic-tier'
};

// Optional: Add helper functions for your specific provider
function getNewProviderServiceType(imageInfo: DockerImageInfo): string {
  // Logic to determine service type based on image
  // Example: Check if it's a database, web service, etc.
  return 'web-service'; // Default type
}

// Optional: Add function to determine if an image is a managed service
function isNewProviderManagedService(imageInfo: DockerImageInfo): boolean {
  // Check if this image should be handled as a managed service
  const imageUrl = `${imageInfo.repository}:${imageInfo.tag || 'latest'}`;
  return imageUrl.includes('postgres') || imageUrl.includes('redis');
}

class NewProviderParser extends BaseParser {
  // Multi-file implementation - required by BaseParser
  parseFiles(config: ApplicationConfig): { [path: string]: FileOutput } {
    // Initialize result containers
    const services: Array<any> = [];
    const managedServices: Array<any> = [];
    
    // Track service mappings for managed services
    const managedServiceMap = new Map<string, string>();
    
    // First pass: identify and register managed services
    for (const [serviceName, serviceConfig] of Object.entries(config.services)) {
      if (isNewProviderManagedService(serviceConfig.image)) {
        // Create a managed service instead of a regular service
        const managedName = `${serviceName}-managed`;
        
        // Track the mapping for service connections later
        managedServiceMap.set(serviceName, managedName);
        
        // Add to managed services collection
        managedServices.push({
          name: managedName,
          type: getNewProviderServiceType(serviceConfig.image),
          // Add provider-specific managed service properties
          plan: defaultParserConfig.subscriptionName
        });
        
        // Skip further processing of this service
        continue;
      }
      
      // Regular services will be processed in the second pass
    }
    
    // Second pass: process regular services with their connections
    for (const [serviceName, serviceConfig] of Object.entries(config.services)) {
      // Skip managed services already processed
      if (managedServiceMap.has(serviceName)) {
        continue;
      }
      
      // Extract ports from service configuration
      const ports = new Set<number>();
      if (serviceConfig.ports) {
        serviceConfig.ports.forEach(port => {
          if (typeof port === 'object' && port !== null) {
            ports.add(port.container);
          } else {
            const parsedPort = parsePort(port);
            if (parsedPort) {
              ports.add(parsedPort);
            }
          }
        });
      }
      
      // Prepare basic service definition
      const service: any = {
        name: serviceName,
        type: getNewProviderServiceType(serviceConfig.image),
        image: serviceConfig.image,
        command: parseCommand(serviceConfig.command),
        environment: []
      };
      
      // Add ports if available
      if (ports.size > 0) {
        service.ports = Array.from(ports);
      }
      
      // Process service connections if available
      if (config.serviceConnections) {
        // First add regular environment variables
        for (const [key, value] of Object.entries(serviceConfig.environment)) {
          // Check if this variable is handled by service connections
          const isHandledByConnection = config.serviceConnections.some(conn => 
            conn.fromService === serviceName && 
            Object.keys(conn.variables).includes(key)
          );
          
          if (!isHandledByConnection) {
            // Regular environment variable
            service.environment.push({
              key,
              value: value.toString()
            });
          }
        }
        
        // Then add service connection variables with provider-specific syntax
        for (const connection of config.serviceConnections) {
          if (connection.fromService === serviceName) {
            for (const [varName, varInfo] of Object.entries(connection.variables)) {
              // Check if target is a managed service
              if (managedServiceMap.has(connection.toService)) {
                const targetName = managedServiceMap.get(connection.toService);
                
                // Use provider-specific reference syntax
                service.environment.push({
                  key: varName,
                  // Example: ${resources.MANAGED_SERVICE_NAME.CONNECTION_STRING}
                  value: `\${resources.${targetName}.${connection.property || 'connectionString'}}`
                });
              } else {
                // Regular service connection
                service.environment.push({
                  key: varName,
                  // Example: ${services.SERVICE_NAME.HOST_PORT}
                  value: `\${services.${connection.toService}.${connection.property || 'hostport'}}`
                });
              }
            }
          }
        }
      } else {
        // No service connections, just add all environment variables
        service.environment = Object.entries(serviceConfig.environment).map(([key, value]) => ({
          key,
          value: value.toString()
        }));
      }
      
      // Add service to collection
      services.push(service);
    }
    
    // Create main configuration
    const mainConfig = {
      version: '1.0',
      provider: 'new-provider',
      region: defaultParserConfig.region,
      services
    };
    
    // Create resources configuration if we have managed services
    const resourcesConfig = managedServices.length > 0 ? {
      version: '1.0',
      managedResources: managedServices
    } : {};
    
    // Return file mappings - the main file is required
    const result: { [path: string]: FileOutput } = {
      'awesome-iac.yaml': {
        content: this.formatFileContent(mainConfig, TemplateFormat.yaml),
        format: TemplateFormat.yaml,
        isMain: true
      }
    };
    
    // Add resources file if we have managed services
    if (managedServices.length > 0) {
      result['templates/resources.yaml'] = {
        content: this.formatFileContent(resourcesConfig, TemplateFormat.yaml),
        format: TemplateFormat.yaml
      };
    }
    
    return result;
  }

  getInfo(): ParserInfo {
    return {
      providerWebsite: "https://newprovider.example.com",
      providerName: "New Provider Cloud",
      providerNameAbbreviation: "NP",
      languageOfficialDocs: "https://docs.newprovider.example.com/iac",
      languageAbbreviation: "NP",
      languageName: "New Provider IaC",
      defaultParserConfig
    };
  }
}

export default new NewProviderParser();
```

## Configuration and Provider-Specific Logic

### Service Type Detection

Create a file for service type configuration in `src/config/newprovider/service-types.ts`:

```typescript
interface NewProviderServiceTypeConfig {
  type: string;
  description: string;
  versions: string;
  isManaged?: boolean;
}

interface NewProviderServiceTypesConfig {
  serviceTypes: {
    [key: string]: NewProviderServiceTypeConfig;
  };
}

export const newProviderServiceTypesConfig: NewProviderServiceTypesConfig = {
  serviceTypes: {
    'docker.io/library/mariadb': {
      type: 'database',
      description: 'MariaDB database service',
      versions: '*'
    },
    'docker.io/library/postgres': {
      type: 'database',
      description: 'PostgreSQL database',
      versions: '*',
      isManaged: true
    },
    'docker.io/library/redis': {
      type: 'cache',
      description: 'Redis cache',
      versions: '*',
      isManaged: true
    }
  }
};

export function getNewProviderServiceType(imageString: string): string {
  const baseImage = imageString.split(':')[0];
  return newProviderServiceTypesConfig.serviceTypes[baseImage]?.type || 'web';
}

export function isNewProviderManagedService(imageString: string): boolean {
  const baseImage = imageString.split(':')[0];
  return !!newProviderServiceTypesConfig.serviceTypes[baseImage]?.isManaged;
}

export type { NewProviderServiceTypeConfig, NewProviderServiceTypesConfig };
```

### Service Connection Properties

Update the service connection properties in `src/config/connection-properties.ts`:

```typescript
export const servicePropertyMappings: Record<string, PropertyMapping> = {
  'host': {
    render: 'host',
    digitalOcean: 'PRIVATE_DOMAIN',
    newProvider: 'HOST'  // Add your provider mapping
  },
  'port': {
    render: 'port',
    digitalOcean: 'PRIVATE_PORT',
    newProvider: 'PORT'  // Add your provider mapping
  },
  'hostport': {
    render: 'hostport',
    digitalOcean: 'PRIVATE_URL',
    newProvider: 'ENDPOINT'  // Add your provider mapping
  }
};

export const databasePropertyMappings: Record<string, PropertyMapping> = {
  'connectionString': {
    render: 'connectionString',
    digitalOcean: 'DATABASE_URL',
    newProvider: 'CONNECTION_STRING'  // Add your provider mapping
  },
  // Add other mappings...
};
```

## Adding Your Parser to the System

Update `src/index.ts` to include your new parser:

```typescript
// Import your new parser
import newProviderParserInstance from './parsers/new-provider';

// Add it to the parsers array
const parsers: BaseParser[] = [
  cloudFormationParserInstance,
  renderParserInstance,
  digitalOceanParserInstance,
  newProviderParserInstance  // Add your parser here
];
```

## Testing

Please read our guidelines for testing parsers in the [Testing section](/docs/docker-to-iac/testing.md).

## New parser documentation

Please update documentation in the [github.com/deploystackio/documentation](https://github.com/deploystackio/documentation) repository.

## Checklist

1. Support both input types:
   - Docker run commands
   - Docker Compose files

2. Handle all service types:
   - Regular web/application services
   - Managed database services
   - Cache services

3. Handle resource mappings consistently:
   - Container ports
   - Environment variables
   - Volume mounts
   - Resource limits
   - Service connections

4. Process service connections correctly:
   - Service-to-service references
   - Service-to-managed-service references
   - Use provider-specific connection syntax

5. Provide clear error messages for:
   - Unsupported features
   - Invalid configurations
   - Missing required fields

6. Test edge cases:
   - Multiple services with interdependencies
   - Complex configurations with service connections
   - Various image formats and service types

---
description: Example code for adding a new parser to docker-to-iac, supporting both Docker run commands and Docker Compose files, with multi-file output capabilities
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
  FileOutput
} from './base-parser';
import { ApplicationConfig } from '../types/container-config';

const defaultParserConfig: ParserConfig = {
  files: [
    {
      path: 'awesome-iac.yaml',
      templateFormat: TemplateFormat.yaml,
      isMain: true,
      description: 'Main IaC configuration file'
    }
  ],
  cpu: 512,
  memory: '1GB'
};

class NewProviderParser extends BaseParser {
  // Legacy method implementation (calls parseFiles under the hood)
  parse(config: ApplicationConfig, templateFormat: TemplateFormat = TemplateFormat.yaml): any {
    return super.parse(config, templateFormat);
  }
  
  // New multi-file implementation
  parseFiles(config: ApplicationConfig): { [path: string]: FileOutput } {
    // Process the application configuration
    const services = config.services;
    
    // Your parser implementation here:
    // 1. Process each service
    // 2. Map container configurations to your IaC format
    // 3. Handle provider-specific requirements
    
    // Create your primary IaC configuration
    const primaryConfig = {
      // Your main configuration structure
    };
    
    // Return object with file mappings - at minimum return your main file
    return {
      'awesome-iac.yaml': {
        content: this.formatFileContent(primaryConfig, TemplateFormat.yaml),
        format: TemplateFormat.yaml,
        isMain: true
      }
      // Add additional files as needed:
      // 'templates/service.yaml': {
      //   content: this.formatFileContent(serviceConfig, TemplateFormat.yaml),
      //   format: TemplateFormat.yaml
      // }
    };
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

## Parser Configuration

### Multi-File Configuration

Define the files your parser will generate, please read more here: [Multi-File Configuration in docker-to-iac](/docs/docker-to-iac/multi-file-configuration.md).

### File Output

Your parser must implement the `parseFiles` method which returns a mapping of file paths to content:

```typescript
parseFiles(config: ApplicationConfig): { [path: string]: FileOutput } {
  return {
    'awesome-iac.yaml': {
      content: this.formatFileContent(mainConfig, TemplateFormat.yaml),
      format: TemplateFormat.yaml,
      isMain: true  // Mark one file as the main file
    },
    'templates/deployment.yaml': {
      content: this.formatFileContent(deploymentConfig, TemplateFormat.yaml),
      format: TemplateFormat.yaml
    }
    // Add more files as needed
  };
}
```

The `isMain: true` property is required for at least one file - this maintains backward compatibility with existing code.

### Supported Ouput Formats

Select appropriate output formats for your provider:

- `yaml` - YAML format (recommended for human readability)
- `json` - JSON format (recommended for programmatic handling)
- `text` - Plain text (if provider requires specific format)

## Testing

### Add Test Files

1. Add Docker Compose test files in `test/docker-compose-files/`:

```yaml
# test/docker-compose-files/basic-web.yml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
```

2. Add Docker run test files in `test/docker-run-files/`:

```bash
# test/docker-run-files/basic-nginx.txt
docker run -d -p 80:80 nginx:latest
```

### Test Implementation

Your parser will be automatically tested through the main test suite. The test system will:

- Process both Docker run and Docker Compose inputs
- Generate outputs in all formats
- Create organized output directories

Run tests:

```bash
npm run test
```

### Verify Outputs

Check generated files in:

- `test/output/docker-compose/[filename]/np/`
- `test/output/docker-run/[filename]/np/`

## Building and Documentation

1. Build the module:

```bash
npm run build
```

2. Update documentation:
   - Add parser-specific information
   - Document any special considerations
   - Include examples for both Docker run and Docker Compose
   - Follow [documentation guidelines](https://github.com/deploystackio/documentation/blob/main/README.md)

## Checlist

1. Support both input types:
   - Docker run commands
   - Docker Compose files

2. Handle resource mappings consistently:
   - Container ports
   - Environment variables
   - Volume mounts
   - Resource limits

3. Provide clear error messages for:
   - Unsupported features
   - Invalid configurations
   - Missing required fields

4. Test edge cases:
   - Multiple services
   - Complex configurations
   - Various image formats

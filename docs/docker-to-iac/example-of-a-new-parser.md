---
description: Example code for adding a new parser to docker-to-iac, supporting both Docker run commands and Docker Compose files
---

# Adding a New Parser

> [!TIP]
> __Thank you__ for your interest in collaborating! The docker-to-iac module will remain open source forever, helping simplify deployments across cloud providers without vendor lock-in.

## Parser Implementation

Create a new file inside `src/parsers/new-provider.ts`:

```typescript
import { 
  BaseParser, 
  ParserInfo, 
  ContainerConfig,
  TemplateFormat, 
  formatResponse, 
  DefaultParserConfig 
} from './base-parser';

const defaultParserConfig: DefaultParserConfig = {
  cpu: 512,
  memory: '1GB',
  fileName: 'awesome-iac.yaml',
  templateFormat: TemplateFormat.yaml
};

class NewProviderParser extends BaseParser {
  parse(containerConfig: ContainerConfig, templateFormat: TemplateFormat = defaultParserConfig.templateFormat): any {
    let response: any = {};

    // Get container configurations
    const services = containerConfig.services;
    
    // Your parser implementation here:
    // 1. Process each service
    // 2. Map container configurations to your IaC format
    // 3. Handle provider-specific requirements
    
    return formatResponse(JSON.stringify(response, null, 2), templateFormat);
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

### Default Parser Config

Set appropriate defaults for your cloud provider:

```typescript
const defaultParserConfig: DefaultParserConfig = {
  cpu: 512,                        // Minimum viable CPU allocation
  memory: '1GB',                   // Minimum viable memory
  fileName: 'awesome-iac.yaml',    // Default output filename
  templateFormat: TemplateFormat.yaml // Default format
};
```

Choose conservative resource defaults to prevent unexpected costs for users.

### Supported Formats

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

## Best Practices

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

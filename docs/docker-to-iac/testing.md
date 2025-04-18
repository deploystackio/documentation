---
description: Learn how to test the docker-to-iac module including Docker run commands and Docker Compose files, with support for integration and end-to-end testing.
menuTitle: Testing
---

# Testing docker-to-iac Module

Before submitting a pull request, test your code locally. Testing covers both code quality and functional aspects for Docker run commands and Docker Compose files, including multi-file output capabilities and cross-platform compatibility.

## Running Tests

### Code Quality Check

First, run ESLint to ensure code quality:

```bash
npm run lint
```

ESLint must pass locally before submitting your PR, as GitHub Actions CI/CD will block any PR that fails the lint check.

### Unit Testing

To run unit tests only:

```bash
npm run test:unit
```

Unit tests verify individual functions and components work correctly in isolation.

### End-to-End Testing

To run end-to-end tests only:

```bash
npm run test:e2e
```

End-to-end tests validate the entire translation process with real inputs and outputs.

### All Tests

Run the complete test suite:

```bash
npm run test
```

This will execute both unit tests and end-to-end tests to ensure comprehensive coverage.

## Test Suite Structure

The test suite is organized in a hierarchical structure:

```bash
test/
├── e2e/                     # End-to-end tests
│   ├── assertions/          # Testing assertions for output validation
│   │   ├── digitalocean.ts  # DigitalOcean-specific assertions
│   │   ├── do-port-assertions.ts
│   │   ├── port-assertions.ts
│   │   └── render.ts        # Render-specific assertions
│   ├── docker-compose-files/ # Test docker-compose files
│   │   ├── test1.yml
│   │   ├── test2.yml
│   │   └── ...
│   ├── docker-run-files/    # Test docker run commands
│   │   ├── test1.txt
│   │   ├── test2.txt
│   │   └── ...
│   ├── output/              # Generated test outputs
│   │   └── README.md        # Explanation of the output directory
│   ├── utils/               # Testing utilities
│   ├── index.ts             # Main e2e test executor
│   ├── test1.ts             # Environment variables and volume mapping tests
│   ├── test2.ts             # Port mapping tests
│   ├── test3.ts             # Environment variable substitution tests
│   └── test4.ts             # Render-specific validation
├── unit/                    # Unit tests
│   ├── config/              # Tests for configuration
│   ├── parsers/             # Tests for parsers
│   ├── sources/             # Tests for sources
│   └── utils/               # Tests for utility functions
└── test.ts                  # Main test file
```

## End-to-End Test Scenarios

The end-to-end tests cover four main scenarios:

### Test 1: Environment Variables and Volume Mapping

Tests the translation of environment variables and volume mappings for both Docker run commands and Docker Compose files. It verifies:

- Environment variables are correctly passed through to the output
- Environment variables with defaults are handled properly
- Volume mappings are correctly configured in the output

### Test 2: Port Mappings

Tests port mapping functionality for both Docker run commands and Docker Compose files. It verifies:

- Basic port mappings are correctly translated
- Multiple port mappings are handled properly
- Database service port configurations are correctly set
- PORT environment variables are properly set

### Test 3: Environment Variable Substitution

Tests the functionality to substitute environment variables from a .env file. It verifies:

- Environment variables can be substituted with values from a .env file
- Default values are used when variables are not defined
- Substitution works in both Docker run and Docker Compose scenarios

### Test 4: Schema Validation

Tests that the generated Render.com YAML output conforms to the official Render.com schema. It verifies:

- Output is valid according to the Render.com schema
- Required fields are present and correctly formatted
- Service configurations are properly structured

## Test Output Structure

End-to-end tests generate organized output directories:

```bash
test/e2e/output/
├── test1/                   # Environment variables and volume mapping test
│   ├── docker-compose/      # Docker Compose test outputs
│   │   ├── dop/             # DigitalOcean outputs
│   │   │   └── .do/
│   │   │       └── deploy.template.yaml
│   │   └── rnd/             # Render outputs
│   │       └── render.yaml
│   └── docker-run/          # Docker run test outputs
│       ├── dop/
│       │   └── .do/
│       │       └── deploy.template.yaml
│       └── rnd/
│           └── render.yaml
├── test2/                   # Port mapping test
│   ├── docker-compose/
│   │   ├── dop/
│   │   │   └── .do/
│   │   │       └── deploy.template.yaml
│   │   └── rnd/
│   │       └── render.yaml
│   └── docker-run/
│       ├── dop/
│       │   └── .do/
│       │       └── deploy.template.yaml
│       └── rnd/
│           └── render.yaml
└── ...
```

## Adding Test Cases

### For Docker Compose Tests

Add your test files to `test/e2e/docker-compose-files/` with `.yml` or `.yaml` extension. Each file should represent a specific test scenario.

### For Docker Run Commands

Add your test commands to `test/e2e/docker-run-files/` with `.txt` extension. Each file should contain a single Docker run command. You can use line continuations with `\` for readability:

```bash
docker run -d \
  --name nginx-proxy \
  -p 80:80 \
  -v /etc/nginx/conf.d:/etc/nginx/conf.d:ro \
  nginx:alpine
```

### Adding New End-to-End Tests

To add a new end-to-end test:

1. Create a new test file (e.g., `test5.ts`) in `test/e2e/`
2. Follow the pattern of existing test files:
   - Define the test scenario
   - Create test functions for Docker run and Docker Compose
   - Use assertions to validate the output
3. Add your test to `test/e2e/index.ts` to ensure it gets executed

### Adding Assertions

For new validation requirements:

1. Add assertion functions to the appropriate file in `test/e2e/assertions/`
2. Use these assertions in your test functions
3. For provider-specific assertions, create new files if needed

## Unit Tests

Unit tests validate individual components of the codebase:

- **Config tests**: Verify configuration files and settings
- **Parser tests**: Check that parsers handle input correctly
- **Source tests**: Validate source handling (Docker run, Docker Compose)
- **Utility tests**: Ensure utility functions work as expected

To add a new unit test:

1. Create a new test file in the appropriate directory under `test/unit/`
2. Use the Vitest framework for testing (similar to Jest)
3. Follow the naming convention: `*.test.ts`

## Local Testing with `npm link`

Test locally using `npm link`. Development environment setup:

```bash
some-root-dir/
|-- docker-to-iac/
|-- my-dev-env/
|   |-- index.js
|   |-- docker-compose.yml
|   |-- docker-run.txt
|   |-- node_modules/
|   |-- package.json
```

Setup steps:

1. In `docker-to-iac/`: `npm link`
2. In `my-dev-env`: `npm link @deploystack/docker-to-iac`

### Setting up my-dev-env

1. Initialize: `npm init`

2. Create `index.js`:

```javascript
import { translate } from '@deploystack/docker-to-iac';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Test Docker Compose
const dockerComposeContent = readFileSync('docker-compose.yml', 'utf8');
const composeResult = translate(dockerComposeContent, {
  source: 'compose',
  target: 'RND',  // Render.com output
  templateFormat: 'yaml'
});

console.log('Docker Compose Translation - Files:', Object.keys(composeResult.files));

// Write output files preserving directory structure
Object.entries(composeResult.files).forEach(([path, fileData]) => {
  const fullPath = join('output', 'compose', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
});

// Test Docker Run
const dockerRunContent = readFileSync('docker-run.txt', 'utf8');
const runResult = translate(dockerRunContent, {
  source: 'run',
  target: 'DOP',  // DigitalOcean output
  templateFormat: 'yaml'
});

console.log('Docker Run Translation - Files:', Object.keys(runResult.files));

// Write output files preserving directory structure
Object.entries(runResult.files).forEach(([path, fileData]) => {
  const fullPath = join('output', 'run', path);
  const dir = dirname(fullPath);
  
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(fullPath, fileData.content);
});
```

3. Test changes:
   - Make changes in `docker-to-iac/`
   - Run `npm run build` in docker-to-iac
   - Test in `my-dev-env/` with `node index.js`
   - Check the output directory for generated files

## Test Results

The test suite shows detailed results for each test:

- Unit tests show individual function validation results
- E2E tests provide a summary of passed and failed tests
- Test failures include specific error messages for debugging

On failure:

- Error details are logged
- Process exits with code 1
- GitHub Actions fails PR check

## Code Coverage

To generate code coverage reports:

```bash
npm run test:coverage
```

This will create coverage reports in the `coverage/` directory, including HTML reports you can view in a browser.

## Troubleshooting Test Failures

If tests fail:

1. Check the test output for specific error messages
2. Review the actual and expected values in assertion failures
3. Check the generated files in `test/e2e/output/` to see what was produced
4. For schema validation failures, check the error details against the provider's schema documentation

By following these steps, you can ensure your changes are fully tested and compatible with all supported output formats.

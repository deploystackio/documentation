---
description: DeployStack logo configuration guide. Add a custom logo to your application with automatic WebP conversion, CDN delivery, and square format optimization.
---

# Application Logo Configuration

Add a custom logo to make your application stand out in the DeployStack catalog. Your logo will be automatically optimized and served through our CDN for the best performance.

## Adding Your Logo

Configure your logo in `.deploystack/config.yml` - [DeployStack Configuration File Reference](/docs/deploystack/deploystack-config-file.md):

```yaml
application:
  logo: "https://example.com/path/to/logo.png"
```

## Logo Requirements

### Supported Formats

- PNG (`.png`)
- JPEG (`.jpg`, `.jpeg`)
- WebP (`.webp`)
- SVG (`.svg`)

### Size Guidelines

- Maximum input: 2 MB.
- Final output will be:
  - Square format (1:1 aspect ratio)
  - Maximum 500x500 pixels
- Input images will be:
  - Resized if larger than 500px in either dimension
  - Centered and cropped to maintain 1:1 aspect ratio
  - Padded with transparency if needed to achieve square format

## Image Processing

When you configure a logo, DeployStack automatically:

1. Downloads your original image
2. Optimizes it for web delivery
3. Converts it to WebP format
4. Stores it on our CDN
5. Serves it through our global CDN network

### Optimization Process

- Images larger than 500px in either dimension are resized
- Conversion to WebP for optimal compression
- Automatic quality optimization for web delivery

## Notes

- The logo configuration is optional
- You can update your logo at any time by modifying the config file
- Logo changes are processed only when made on the default branch
- Previous logo versions are automatically cleaned up

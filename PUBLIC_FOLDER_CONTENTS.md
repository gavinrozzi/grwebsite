# Public Folder Contents

This document describes all static assets in the `/public` folder that are automatically copied to the build output.

## Files

### SEO & Discovery

- **robots.txt** - Search engine crawler directives
  - Allows all crawlers
  - Points to sitemap index

- **humans.txt** - Human-readable site credits
  - Team information
  - Technology stack
  - Last update date

- **site.webmanifest** - PWA manifest
  - App name and short name
  - Theme colors
  - Icon references

### Branding & Icons

- **favicon.svg** - Vector favicon with GR logo
  - Orange-to-teal gradient circle
  - White "GR" text
  - Scalable SVG format

### Social Media Images

- **og-default.png** (1200x630px) - Default Open Graph image
  - Circular GR logo with gradient border
  - Your name in orange gradient
  - Professional title and tagline
  - Clean, modern design
  - Optimized for Facebook, LinkedIn, etc.

- **og-twitter.png** (1200x600px) - Twitter-optimized image
  - Same design as default
  - Twitter-specific dimensions

## Generation

OG images are automatically generated during build:
- Run `npm run generate:og` to regenerate manually
- Run `npm run build` - images are created automatically

## Usage

All files are automatically copied to the root of the build output (`/dist`).

### In HTML

The BaseLayout automatically includes:
- Favicon link
- Manifest link
- Humans.txt link
- Default OG image fallback

### Custom OG Images

To use a custom OG image for a specific page:

```astro
<BaseLayout 
  title="Page Title"
  image="/custom-image.png"
/>
```

## Notes

- Sitemaps are generated dynamically by Astro, not stored in public
- RSS feed is generated dynamically, not stored in public
- OG images use Plus Jakarta Sans font (must be installed in node_modules)

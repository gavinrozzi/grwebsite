# Hugo to Astro Migration Guide

Complete guide for migrating your personal website from Hugo Academic theme to modern Astro framework.

## 📋 Overview

This migration preserves:
- ✅ All 40+ blog posts with original permalinks
- ✅ Portfolio projects and case studies
- ✅ Publications and research papers
- ✅ Media mentions and speaking engagements
- ✅ All static assets (images, PDFs, files)
- ✅ Netlify contact form functionality
- ✅ SEO equity through permalink preservation

## 🎨 Design Changes

### Color Palette: Tech-Forward Professional
- **Primary**: Sunset Orange `#f97316` (replaces Hugo yellow)
- **Secondary**: Teal `#14b8a6` (modern tech accent)
- **Accent**: Indigo `#4f46e5` (blue-leaning, not purple)
- **Gradient**: Orange → Teal (warm to cool, dynamic)

### Typography
- **Headings**: Plus Jakarta Sans (modern, authoritative)
- **Body**: Fira Sans (maintains continuity from Hugo site)
- **Code**: Fira Mono (consistent with current site)

### Navigation
New simplified structure:
- Home → Portfolio → Blog → Publications → Media & Speaking → Contact

## 📝 Content Migration Steps

### 1. Blog Posts Migration

**Source**: `/content/post/[slug]/index.md`
**Destination**: `/src/content/blog/[slug]/index.md`

#### Hugo Frontmatter (Before):
```yaml
---
date: "2020-04-14"
title: Your questions answered on 3D-printed PPE
diagram: false
image:
  placement: 3
  preview_only: false
math: false
---
```

#### Astro Frontmatter (After):
```yaml
---
title: "Your questions answered on 3D-printed PPE"
date: 2020-04-14
summary: "FAQs on 3D printing masks and face shields for healthcare workers"
tags: ["3d-printing", "covid-19", "healthcare"]
image:
  url: "./featured.jpg"
  alt: "3D printed face shields"
featured: false
draft: false
---
```

#### Migration Script Template:
```bash
#!/bin/bash
# Example script to help with blog migration

for dir in ../content/post/*/; do
  slug=$(basename "$dir")
  mkdir -p "src/content/blog/$slug"
  # Copy and transform frontmatter
  cp "$dir/index.md" "src/content/blog/$slug/index.md"
  # Copy featured images if they exist
  if [ -f "$dir/featured.jpg" ]; then
    cp "$dir/featured.jpg" "src/content/blog/$slug/"
  fi
done
```

### 2. Portfolio Projects Migration

**Source**: `/content/project/[slug]/index.md`
**Destination**: `/src/content/portfolio/[slug].md`

#### Hugo Format (Before):
```yaml
---
date: "2018-02-10"
external_link: ""
summary: New Jersey's first statewide freedom of information platform
tags:
- data
- transparency
title: OPRAmachine
---
```

#### Astro Format (After):
```yaml
---
title: "OPRAmachine"
date: 2018-02-10
category: "civic-tech"
summary: "New Jersey's first statewide freedom of information platform"
tags: ["transparency", "open-data", "ruby-on-rails"]
links:
  website: "https://opramachine.com"
  github: "https://github.com/gavinrozzi/opramachine"
featured: true
metrics:
  - label: "Public Records Requests"
    value: "75,000+"
  - label: "Open Data Released"
    value: "250GB"
---
```

#### Project Categories:
- `government` - NJ Eviction Guide, Municipal Lead Portal, NJ HOMES Choice
- `civic-tech` - OPRAmachine, TrentonTracker
- `open-source` - zipcodeR, njgeo, njtr1
- `research` - Data visualizations, GIS projects, academic research

### 3. Publications Migration

**Source**: `/content/publication/[slug]/index.md`
**Destination**: `/src/content/publications/[slug].md`

```yaml
---
title: "zipcodeR: Advancing the analysis of spatial data at the ZIP code level in R"
date: 2021-06-01
publisher: "Software Impacts"
authors: ["Gavin Rozzi"]
summary: "This paper presents zipcodeR, an R package that facilitates analysis of ZIP code-level data..."
url: "https://www.sciencedirect.com/science/article/pii/S2665963821000373"
pdf: "/files/zipcodeR_paper.pdf"
doi: "10.1016/j.simpa.2021.100147"
type: "journal"
---
```

### 4. Media & Speaking Migration

**Source**: `/content/event/[slug]/index.md`
**Destination**: `/src/content/media/[slug].md`

```yaml
---
title: "Simplifying N.J. public records with civic technology"
date: 2022-04-15
type: "talk"
venue: "Montclair State University"
location: "Montclair, NJ"
summary: "Webinar on using OPRAmachine to access New Jersey government records"
url: "https://www.youtube.com/watch?v=example"
embedUrl: "https://www.youtube.com/embed/example"
featured: true
---
```

#### Media Types:
- `talk` - Conference presentations, webinars
- `interview` - Podcast episodes, media interviews
- `press` - News articles, press mentions
- `podcast` - Podcast appearances
- `award` - Awards and recognition

### 5. Static Assets Migration

#### Images
```bash
# Copy all media assets
cp -r ../static/media/ public/media/

# Copy other static files
cp -r ../static/files/ public/files/
```

#### Update Image Paths in Content:
- Hugo: `/media/image.jpg` or `image.jpg`
- Astro: `/media/image.jpg` (public folder is root)

### 6. URL Redirects

Add to `netlify.toml` for any changed URLs:

```toml
[[redirects]]
  from = "/talk/*"
  to = "/media/:splat"
  status = 301

[[redirects]]
  from = "/project/*"
  to = "/portfolio/:splat"
  status = 301
```

## 🔧 Technical Migration

### Content Collections Setup

Already configured in `src/content/config.ts`. Collections available:
- `blog` - Blog posts
- `portfolio` - Projects and case studies
- `publications` - Academic and professional publications
- `media` - Speaking engagements and media mentions

### Page Templates

Create individual blog post pages:

```typescript
// src/pages/blog/[...slug].astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title} description={post.data.summary}>
  <article>
    <h1>{post.data.title}</h1>
    <time>{post.data.date.toLocaleDateString()}</time>
    <Content />
  </article>
</BaseLayout>
```

### RSS Feed Generation

Add to `src/pages/rss.xml.js`:

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: "Gavin Rozzi's Blog",
    description: "Digital transformation, civic technology, and data science",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
    })),
  });
}
```

## ✅ Pre-Launch Checklist

### Content
- [ ] All blog posts migrated and tested
- [ ] Portfolio projects added with case studies
- [ ] Publications list complete
- [ ] Media/speaking entries added
- [ ] All images copied and paths updated
- [ ] All PDF files copied to /public/files/

### Technical
- [ ] Build completes without errors (`npm run build`)
- [ ] All pages load correctly in preview
- [ ] Contact form tested (submit test message)
- [ ] Navigation works on mobile and desktop
- [ ] All internal links tested
- [ ] RSS feed validates

### SEO & Performance
- [ ] Meta descriptions on all pages
- [ ] Open Graph images configured
- [ ] Sitemap generates correctly
- [ ] Robots.txt configured
- [ ] Lighthouse scores 95+ on key pages
- [ ] Images optimized (WebP/AVIF where possible)

### Deployment
- [ ] Netlify site connected to repository
- [ ] Build settings verified (command: `npm run build`, dir: `dist`)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Redirects tested for old URLs
- [ ] Contact form submissions appear in Netlify dashboard

## 🚀 Deployment Process

1. **Test Build Locally**
   ```bash
   npm run build
   npm run preview
   ```

2. **Connect to Netlify**
   - Push code to GitHub repository
   - Connect repo in Netlify dashboard
   - Build settings auto-detected from `netlify.toml`

3. **Configure Domain**
   - Add custom domain in Netlify settings
   - Update DNS records with your registrar
   - Wait for SSL certificate provisioning

4. **Post-Launch Testing**
   - Test all major pages
   - Submit contact form
   - Check analytics integration
   - Monitor Netlify build logs

## 📊 Performance Targets

Expected Lighthouse scores:
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🆘 Troubleshooting

### Build Fails
- Check TypeScript errors: `npm run astro check`
- Verify all content collection schemas match
- Ensure no missing frontmatter fields

### Images Not Loading
- Verify images are in `public/` directory
- Check image paths start with `/`
- Confirm file extensions match (case-sensitive)

### Form Not Working
- Verify `data-netlify="true"` attribute on form
- Check Netlify forms dashboard for submissions
- Ensure honeypot field is present

### Styles Not Applied
- Clear browser cache
- Check global.css is imported in BaseLayout
- Verify CSS custom properties are defined

## 📞 Support Resources

- Astro Docs: https://docs.astro.build
- Netlify Docs: https://docs.netlify.com
- Hugo to Astro: https://docs.astro.build/en/guides/migrate-to-astro/from-hugo/

---

**Migration completed:** [Date]
**Build status:** ✅ Passing
**Deployment:** Ready for production

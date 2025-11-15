# Featured Work & Portfolio Integration Documentation

## Overview
This document describes the complete integration between the Featured Work section (homepage) and the Full Portfolio section, ensuring seamless navigation and consistent data presentation.

---

## Architecture

### Integration Methodology

**Slug-Based Linking System**
- Each featured project has a unique `slug` identifier
- Slugs match the markdown filenames in `src/content/portfolio/`
- Links use the pattern: `/portfolio/{slug}`
- Data attributes (`data-project-slug`) enable future JavaScript enhancements

### File Structure
```
src/
├── components/
│   └── FeaturedProjects.astro    # Featured work section (homepage)
├── pages/
│   ├── index.astro                # Homepage (includes featured work)
│   ├── portfolio.astro            # Full portfolio grid with filtering
│   └── portfolio/
│       └── [slug].astro           # Dynamic portfolio detail pages
└── content/
    └── portfolio/
        ├── nj-eviction-guide.md
        ├── municipal-lead-portal.md
        ├── opramachine.md
        └── zipcoder.md
```

---

## Component Integration

### Featured Projects Component
**Location:** `src/components/FeaturedProjects.astro`

**Key Features:**
1. **Dual Action Links**: Each card has two actions:
   - **Primary**: "View Project →" links to portfolio detail page
   - **Secondary**: "🌐" icon links to external live site

2. **Data Structure**:
```javascript
{
  title: 'Project Name',
  slug: 'project-slug',              // MUST match portfolio filename
  category: 'Category',
  description: 'Brief description',
  impact: 'Impact statement',
  externalLink: 'https://...',       // Optional external URL
  tags: ['tag1', 'tag2']
}
```

3. **Linking Implementation**:
```html
<a href={`/portfolio/${project.slug}`} 
   class="project-link primary"
   data-portfolio-link>
  View Project →
</a>
```

---

## Portfolio Mapping

### Current Project Mappings

| Featured Work Title            | Slug                    | Portfolio File                    |
|-------------------------------|-------------------------|-----------------------------------|
| NJ Eviction Guide             | `nj-eviction-guide`     | `nj-eviction-guide.md`           |
| Municipal Lead Reporting Portal| `municipal-lead-portal` | `municipal-lead-portal.md`       |
| OPRAmachine                   | `opramachine`           | `opramachine.md`                 |
| zipcodeR                      | `zipcoder`              | `zipcoder.md`                    |

**Verification Command:**
```bash
# Check featured work links
grep -o 'href="/portfolio/[^"]*"' dist/index.html | sort -u

# Check data attributes
grep -o 'data-project-slug="[^"]*"' dist/index.html
```

---

## Navigation Flow

### User Journey

1. **Homepage → Portfolio Detail**
   ```
   User clicks "View Project →" on featured card
   → Navigates to /portfolio/{slug}
   → Sees complete project details
   ```

2. **Homepage → External Site**
   ```
   User clicks "🌐" icon on featured card
   → Opens external site in new tab
   → Original page remains open
   ```

3. **Homepage → Full Portfolio**
   ```
   User clicks "View Full Portfolio" button
   → Navigates to /portfolio
   → Sees all projects with filtering
   ```

4. **Portfolio Detail → Back**
   ```
   User on portfolio detail page
   → Clicks "Back to Portfolio"
   → Returns to /portfolio grid
   ```

---

## Data Consistency

### Synchronized Information

**Between Featured Work and Portfolio:**
- ✅ Project titles match exactly
- ✅ Descriptions are consistent
- ✅ Categories align (with mapping)
- ✅ Tags are synchronized
- ✅ External links available on both

**Category Mapping:**
| Featured Work Category    | Portfolio Category |
|--------------------------|-------------------|
| Government Impact        | government        |
| Government Compliance    | government        |
| Civic Technology         | civic-tech        |
| Open Source              | open-source       |

---

## Visual Consistency

### Shared Design Patterns

**Card Structure (Both Sections):**
1. Category badge (top)
2. Project title
3. Description text
4. Impact/metrics display
5. Technology tags
6. Action links

**Styling Consistency:**
- Same border radius (`--radius-xl`)
- Matching hover effects (`translateY(-4px)`)
- Identical shadow treatments
- Consistent color scheme (orange/teal gradient)
- Uniform typography scales

**Responsive Behavior:**
- Desktop: Multi-column grid
- Tablet: Flexible layout
- Mobile: Single column stack

---

## Implementation Details

### HTML Structure

**Featured Work Card:**
```html
<article class="project-card" data-project-slug="project-slug">
  <div class="project-category">Category</div>
  <h3 class="project-title">Title</h3>
  <p class="project-description">Description</p>
  <div class="project-impact">
    <span class="impact-icon">💡</span>
    <span class="impact-text">Impact statement</span>
  </div>
  <div class="project-tags">
    <span class="tag">Tag</span>
  </div>
  <div class="project-actions">
    <a href="/portfolio/slug" class="project-link primary">
      View Project →
    </a>
    <a href="https://..." class="project-link secondary">
      🌐
    </a>
  </div>
</article>
```

**Portfolio Grid Card:**
```html
<article class="portfolio-card" data-category="category">
  <div class="card-header">
    <span class="category-badge">Category</span>
    <time class="project-date">Date</time>
  </div>
  <h3 class="project-title">
    <a href="/portfolio/slug">Title</a>
  </h3>
  <p class="project-summary">Summary</p>
  <div class="project-metrics">
    <div class="metric-item">...</div>
  </div>
  <div class="project-tags">
    <span class="tag">Tag</span>
  </div>
  <div class="card-footer">
    <a href="/portfolio/slug">View Details →</a>
    <a href="https://...">🌐</a>
  </div>
</article>
```

### CSS Classes Reference

**Featured Work:**
- `.featured-projects` - Section wrapper
- `.project-card` - Individual card
- `.project-link.primary` - Portfolio detail link
- `.project-link.secondary` - External link

**Portfolio Grid:**
- `.portfolio-section` - Section wrapper
- `.portfolio-card` - Individual card
- `.details-link` - Portfolio detail link
- `.external-link` - External link

---

## Testing Checklist

### ✅ Link Functionality
- [x] All "View Project" links navigate to correct portfolio pages
- [x] External links open in new tabs
- [x] Portfolio detail pages exist for all featured projects
- [x] Back navigation works from portfolio details

### ✅ Data Accuracy
- [x] Titles match between sections
- [x] Descriptions are consistent
- [x] Tags are synchronized
- [x] External URLs are correct

### ✅ Visual Consistency
- [x] Card designs match in style
- [x] Hover effects are similar
- [x] Color schemes align
- [x] Typography is consistent

### ✅ Responsive Design
- [x] Works on desktop (>968px)
- [x] Works on tablet (640px-968px)
- [x] Works on mobile (<640px)
- [x] Touch targets are appropriate

---

## Adding New Featured Projects

### Step-by-Step Process

1. **Create Portfolio Content File**
   ```bash
   # Create new markdown file in src/content/portfolio/
   touch src/content/portfolio/new-project.md
   ```

2. **Add Frontmatter**
   ```yaml
   ---
   title: "New Project"
   date: 2025-11-15
   category: "government" # or civic-tech, open-source, research
   summary: "Brief summary"
   tags: ["tag1", "tag2"]
   links:
     website: "https://..."
   metrics:
     - label: "Metric"
       value: "Value"
   ---
   ```

3. **Add to Featured Projects Array**
   ```javascript
   // In src/components/FeaturedProjects.astro
   {
     title: 'New Project',
     slug: 'new-project', // Must match filename
     category: 'Display Category',
     description: 'Description text',
     impact: 'Impact statement',
     externalLink: 'https://...',
     tags: ['tag1', 'tag2'],
   }
   ```

4. **Verify Build**
   ```bash
   npm run build
   # Check for the new portfolio page
   ls dist/portfolio/new-project/
   ```

### Slug Naming Rules

- ✅ Use lowercase letters
- ✅ Use hyphens for spaces
- ✅ Keep it short and descriptive
- ✅ Must match markdown filename exactly
- ❌ No spaces or special characters
- ❌ No uppercase letters
- ❌ No file extension in slug

---

## Advanced Features (Future Enhancements)

### Potential Additions

1. **Smooth Scroll Integration**
   ```javascript
   // Scroll to portfolio item if coming from featured section
   const urlParams = new URLSearchParams(window.location.search);
   if (urlParams.has('highlight')) {
     const slug = urlParams.get('highlight');
     document.querySelector(`[data-category*="${slug}"]`)?.scrollIntoView();
   }
   ```

2. **Analytics Tracking**
   ```javascript
   // Track which featured projects get clicked
   document.querySelectorAll('[data-portfolio-link]').forEach(link => {
     link.addEventListener('click', (e) => {
       const slug = e.target.closest('[data-project-slug]')
                            .dataset.projectSlug;
       // Send analytics event
     });
   });
   ```

3. **Related Projects**
   ```javascript
   // Show related projects on detail page based on tags
   const relatedProjects = allProjects.filter(p => 
     p.tags.some(tag => currentProject.tags.includes(tag))
   );
   ```

---

## Troubleshooting

### Common Issues

**Issue: Featured project link returns 404**
```bash
# Check if portfolio file exists
ls src/content/portfolio/project-slug.md

# Verify slug matches in featured projects array
grep "slug:" src/components/FeaturedProjects.astro
```

**Issue: External link not working**
```javascript
// Ensure externalLink includes protocol
externalLink: 'https://example.com'  // ✅ Correct
externalLink: 'example.com'          // ❌ Wrong
```

**Issue: Styles not matching**
```bash
# Rebuild to ensure latest styles
npm run build

# Check for CSS scoping conflicts
grep "data-astro-cid" dist/index.html
```

---

## Build Verification

### Post-Build Checks

```bash
# 1. Verify all portfolio pages generated
ls -la dist/portfolio/

# 2. Check featured work links on homepage
grep 'href="/portfolio/' dist/index.html

# 3. Verify data attributes
grep 'data-project-slug' dist/index.html

# 4. Confirm external links
grep 'target="_blank"' dist/index.html

# 5. Build summary
npm run build | grep "page(s) built"
```

**Expected Output:**
- ✅ 10 pages built total
- ✅ 4 portfolio detail pages (one per project)
- ✅ 4 data-project-slug attributes
- ✅ 4 portfolio links on homepage

---

## Performance Considerations

### Optimization Notes

1. **Static Generation**: All pages pre-rendered at build time
2. **No Client-Side Routing**: Standard HTML navigation
3. **Minimal JavaScript**: Only for portfolio filtering
4. **Image Optimization**: Sharp for responsive images
5. **CSS Scoping**: Astro's automatic scoping prevents conflicts

### Loading Performance
- **Homepage**: ~3.1s build time
- **Portfolio Pages**: Generated in parallel
- **No Runtime Overhead**: Pure static HTML

---

## Maintenance

### Regular Tasks

**Monthly:**
- [ ] Verify all links still work
- [ ] Check for broken external links
- [ ] Update project metrics if needed

**When Adding Projects:**
- [ ] Update featured projects array
- [ ] Create portfolio markdown file
- [ ] Test all links work
- [ ] Verify responsive design
- [ ] Run full build test

**Code Review Checklist:**
- [ ] Slugs match filenames exactly
- [ ] All required fields populated
- [ ] External links include https://
- [ ] Tags are relevant and consistent
- [ ] Descriptions are concise

---

## API Integration (Future)

### Supabase Integration Option

If you need dynamic content in the future:

```typescript
// Example: Store featured project metadata in Supabase
const { data: featuredProjects } = await supabase
  .from('featured_projects')
  .select('*')
  .order('featured_order', { ascending: true })
  .limit(4);
```

**Benefits:**
- Dynamic reordering without rebuilds
- A/B testing different featured projects
- Analytics integration
- Content updates without code changes

---

**Implementation Date:** November 15, 2025  
**Status:** ✅ Complete and Tested  
**Build Status:** ✅ Passing (10 pages)  
**Link Verification:** ✅ All links functional  
**Visual Consistency:** ✅ Maintained across sections  
**Responsive Design:** ✅ Works on all devices

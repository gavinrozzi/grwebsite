# Deployment Guide

Quick guide to deploying your new Astro website to Netlify.

## 🚀 Quick Deploy

### Option 1: Connect to Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   cd astro-site
   git init
   git add .
   git commit -m "Initial Astro website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository
   - Netlify auto-detects settings from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Configure Custom Domain** (Optional)
   - In Netlify dashboard: Site settings → Domain management
   - Click "Add custom domain"
   - Follow DNS configuration instructions

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify init
netlify deploy --prod
```

## ✅ Pre-Deployment Checklist

### Build Verification
```bash
# Test build locally
npm run build

# Preview build
npm run preview
# Visit http://localhost:4321 and test all pages
```

### Content Check
- [ ] Homepage loads correctly
- [ ] Navigation works (all links)
- [ ] Contact form submits successfully
- [ ] Footer links are correct
- [ ] Mobile menu functions properly

### SEO Check
- [ ] All pages have unique titles
- [ ] Meta descriptions are present
- [ ] Sitemap generates: `/sitemap-index.xml`
- [ ] Favicon displays correctly
- [ ] Social sharing images configured

## 🔧 Configuration

### Environment Variables
None required for basic deployment. The site is fully static.

### Custom Domain DNS
Once your domain is configured in Netlify:

1. **For apex domain** (example.com):
   ```
   A Record → 75.2.60.5
   ```

2. **For www subdomain**:
   ```
   CNAME → your-site.netlify.app
   ```

### SSL Certificate
- Automatically provisioned by Netlify
- Usually takes 1-2 minutes after domain connection
- Force HTTPS enabled by default

## 📊 Post-Deployment

### Verify Deployment
1. Visit your site URL
2. Test contact form submission
3. Check Netlify dashboard → Forms for submission
4. Verify sitemap at `/sitemap-index.xml`
5. Test all navigation links

### Submit to Search Engines
```bash
# Submit sitemap to Google
https://search.google.com/search-console

# Submit to Bing
https://www.bing.com/webmasters
```

### Monitor Performance
- Run Lighthouse audit
- Check Netlify Analytics (if enabled)
- Monitor build logs for any warnings

## 🔄 Continuous Deployment

Once connected, every push to your main branch automatically:
1. Triggers a new build
2. Runs `npm run build`
3. Deploys to production if successful
4. Sends notification on completion

### Deploy Previews
- Pull requests automatically get deploy previews
- Test changes before merging
- Preview URL: `https://deploy-preview-[PR#]--your-site.netlify.app`

## 🐛 Troubleshooting

### Build Fails
Check Netlify build logs:
1. Navigate to: Deploys → Failed deploy → Deploy log
2. Common issues:
   - Node version mismatch (specified in `netlify.toml`)
   - Missing dependencies (run `npm install`)
   - TypeScript errors (run `npm run build` locally)

### Form Not Receiving Submissions
1. Check form has `data-netlify="true"` attribute
2. Verify honeypot field `name="bot-field"` is present
3. Check Netlify dashboard → Forms → Active forms

### Domain Not Connecting
1. Verify DNS records are correct
2. Wait 24-48 hours for DNS propagation
3. Check Netlify DNS verification status

### 404 Errors
- Ensure all content files are in correct directories
- Verify frontmatter matches content collection schemas
- Check build output for generated pages

## 📞 Support

- Netlify Support: https://answers.netlify.com
- Astro Discord: https://astro.build/chat
- Documentation: https://docs.netlify.com

## 🎯 Next Steps After Deployment

1. **Content Migration**
   - Begin migrating blog posts from Hugo
   - Add portfolio project pages
   - Populate publications and media sections

2. **SEO Enhancement**
   - Submit sitemap to search engines
   - Set up Google Search Console
   - Configure analytics

3. **Performance Optimization**
   - Optimize images as you add them
   - Monitor Lighthouse scores
   - Track Core Web Vitals

---

**Deployment Target**: https://www.gavinrozzi.com
**Build Time**: ~3 seconds
**Deploy Time**: ~30 seconds
**Total Time**: < 1 minute from push to live

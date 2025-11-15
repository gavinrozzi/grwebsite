export async function GET(context) {
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: 'blog/', priority: '0.9', changefreq: 'daily' },
    { url: 'portfolio/', priority: '0.9', changefreq: 'monthly' },
    { url: 'media/', priority: '0.8', changefreq: 'monthly' },
    { url: 'publications/', priority: '0.7', changefreq: 'monthly' },
    { url: 'contact/', priority: '0.6', changefreq: 'monthly' },
  ];

  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => {
  return `  <url>
    <loc>${context.site}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

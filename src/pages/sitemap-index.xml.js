export async function GET(context) {
  const now = new Date().toISOString();

  const sitemaps = [
    'sitemap-pages.xml',
    'sitemap-blog.xml',
    'sitemap-portfolio.xml',
    'sitemap-media.xml',
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((sitemap) => {
  return `  <sitemap>
    <loc>${context.site}${sitemap}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
}).join('\n')}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

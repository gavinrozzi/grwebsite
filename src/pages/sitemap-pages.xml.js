function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(context) {
  try {
    const pages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: 'blog/', priority: '0.9', changefreq: 'daily' },
      { url: 'portfolio/', priority: '0.9', changefreq: 'monthly' },
      { url: 'media/', priority: '0.8', changefreq: 'monthly' },
      { url: 'contact/', priority: '0.6', changefreq: 'monthly' },
    ];

    const now = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => {
  const url = escapeXml(`${context.site}${page.url}`);
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating pages sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}

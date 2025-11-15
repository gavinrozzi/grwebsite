import { getCollection } from 'astro:content';

export async function GET(context) {
  const portfolioItems = await getCollection('portfolio');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${portfolioItems.map((item) => {
  const url = `${context.site}portfolio/${item.slug}/`;
  const lastmod = item.data.date;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

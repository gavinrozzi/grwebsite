import { getCollection } from 'astro:content';

export async function GET(context) {
  const mediaItems = await getCollection('media');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mediaItems.map((item) => {
  const url = `${context.site}media/${item.slug}/`;
  const lastmod = item.data.date;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

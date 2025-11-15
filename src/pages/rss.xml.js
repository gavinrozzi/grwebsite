import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  });

  const sortedPosts = posts.sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime();
  });

  return rss({
    title: "Gavin Rozzi's Blog",
    description: "Insights on digital transformation, civic technology, data science, and public policy. Building data-driven platforms that turn policy into impact.",
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>en-us</language>`,
  });
}

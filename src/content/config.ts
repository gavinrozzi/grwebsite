import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    summary: z.string(),
    description: z.string().optional(),
    author: z.string().default('Gavin Rozzi'),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['government', 'civic-tech', 'open-source', 'research']),
    summary: z.string(),
    description: z.string().optional(),
    image: z.object({
      url: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
    tags: z.array(z.string()).default([]),
    links: z.object({
      website: z.string().optional(),
      github: z.string().optional(),
      documentation: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    metrics: z.object({
      label: z.string(),
      value: z.string(),
    }).array().optional(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    publisher: z.string(),
    authors: z.array(z.string()).default(['Gavin Rozzi']),
    summary: z.string().optional(),
    url: z.string().optional(),
    pdf: z.string().optional(),
    doi: z.string().optional(),
    citation: z.string().optional(),
    type: z.enum(['journal', 'conference', 'report', 'media']).default('journal'),
  }),
});

const media = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['talk', 'interview', 'press', 'podcast', 'award']),
    venue: z.string(),
    location: z.string().optional(),
    summary: z.string().optional(),
    url: z.string().optional(),
    embedUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const photos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    alt: z.string(),
    caption: z.string(),
    event: z.string().optional(),
    location: z.string().optional(),
    category: z.enum(['speaking', 'award', 'community', 'panel', 'workshop', 'other']).default('other'),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, portfolio, publications, media, photos };

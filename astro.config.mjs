// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gavinrozzi.com',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});

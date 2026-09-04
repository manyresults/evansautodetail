// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The public production URL. Used for canonical URLs, Open Graph tags,
// and sitemap.xml generation. Update here if the domain ever changes.
const SITE_URL = 'https://earlsdetailing.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      // Keep the sitemap clean: exclude the 404 page.
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from './lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SEO_CONFIG.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}

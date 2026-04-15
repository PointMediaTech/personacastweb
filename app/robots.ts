// app/robots.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from './lib/seo-config';

export const dynamic = 'force-static';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Googlebot',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'cohere-ai',
  'DuckDuckBot',
  'YouBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SEO_CONFIG.baseUrl}/sitemap.xml`,
  };
}

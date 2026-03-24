// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from './lib/seo-config';

const { baseUrl } = SEO_CONFIG;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Core Pages ──
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/product`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // ── Product Sub-Pages (5-Step Pipeline) ──
    { url: `${baseUrl}/product/seed-injection`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/product/graph-engine`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/product/simulation-theater`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/product/predictive-decoder`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/product/data-assets`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // ── Solutions ──
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/solutions/brand-reputation`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/solutions/crisis-pr`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/solutions/policy-simulation`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/solutions/political-strategy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // ── Resources ──
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/resources/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/resources/whitepapers`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/resources/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },

    // ── Legal ──
    { url: `${baseUrl}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

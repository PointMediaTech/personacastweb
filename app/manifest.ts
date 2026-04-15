// app/manifest.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from './lib/seo-config';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SEO_CONFIG.siteName} — AI 戰略推演平台`,
    short_name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.brandDescription['zh-TW'],
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    lang: 'zh-Hant',
    dir: 'ltr',
    scope: '/',
    categories: ['business', 'productivity', 'technology'],
    icons: [
      {
        src: '/point_ico.ico',
        sizes: '32x32 48x48',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/PersonaCast_Logo-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/PersonaCast_Logo-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

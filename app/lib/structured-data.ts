// app/lib/structured-data.ts
import type { WithContext, WebSite, Organization, SoftwareApplication, BreadcrumbList } from 'schema-dts';
import { SEO_CONFIG } from './seo-config';

export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    inLanguage: SEO_CONFIG.defaultLocale,
  };
}

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    logo: `${SEO_CONFIG.baseUrl}/PersonaCast_Logo-512.png`,
    sameAs: [
      SEO_CONFIG.socialLinks.twitter,
      SEO_CONFIG.socialLinks.linkedin,
      SEO_CONFIG.socialLinks.github,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Taipei',
      addressCountry: 'TW',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://calendly.com/personacast/demo',
    },
  };
}

export function generateSoftwareAppSchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.brandDescription['zh-TW'],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '免費演示預約',
      url: 'https://calendly.com/personacast/demo',
    },
    featureList: SEO_CONFIG.features.map((f) => `${f.name}: ${f.description}`),
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Convenience: generate all schemas for the homepage */
export function generateHomePageSchemas(): object[] {
  return [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    generateSoftwareAppSchema(),
    generateBreadcrumbSchema([
      { name: '首頁', url: SEO_CONFIG.baseUrl },
    ]),
  ];
}

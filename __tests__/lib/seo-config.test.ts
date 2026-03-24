import { SEO_CONFIG } from '@/app/lib/seo-config';

describe('SEO_CONFIG', () => {
  it('has required top-level fields', () => {
    expect(SEO_CONFIG).toHaveProperty('baseUrl');
    expect(SEO_CONFIG).toHaveProperty('siteName');
    expect(SEO_CONFIG).toHaveProperty('defaultLocale');
  });

  it('baseUrl is a valid URL', () => {
    expect(() => new URL(SEO_CONFIG.baseUrl)).not.toThrow();
  });

  it('brandDescription has zh-TW and en keys', () => {
    expect(SEO_CONFIG.brandDescription).toHaveProperty('zh-TW');
    expect(SEO_CONFIG.brandDescription).toHaveProperty('en');
    expect(typeof SEO_CONFIG.brandDescription['zh-TW']).toBe('string');
    expect(typeof SEO_CONFIG.brandDescription.en).toBe('string');
  });

  it('defaultKeywords is a non-empty array', () => {
    expect(Array.isArray(SEO_CONFIG.defaultKeywords)).toBe(true);
    expect(SEO_CONFIG.defaultKeywords.length).toBeGreaterThan(0);
  });

  it('socialLinks has twitter, linkedin, and github', () => {
    expect(SEO_CONFIG.socialLinks).toHaveProperty('twitter');
    expect(SEO_CONFIG.socialLinks).toHaveProperty('linkedin');
    expect(SEO_CONFIG.socialLinks).toHaveProperty('github');
  });

  it('features is a non-empty array with name and description', () => {
    expect(Array.isArray(SEO_CONFIG.features)).toBe(true);
    expect(SEO_CONFIG.features.length).toBeGreaterThan(0);

    for (const feature of SEO_CONFIG.features) {
      expect(feature).toHaveProperty('name');
      expect(feature).toHaveProperty('description');
      expect(typeof feature.name).toBe('string');
      expect(typeof feature.description).toBe('string');
    }
  });
});

import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateSoftwareAppSchema,
  generateBreadcrumbSchema,
  generateHomePageSchemas,
} from '@/app/lib/structured-data';

describe('generateWebSiteSchema', () => {
  it('returns an object with @context, @type WebSite, name, and url', () => {
    const schema = generateWebSiteSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema).toHaveProperty('name');
    expect(schema).toHaveProperty('url');
  });
});

describe('generateOrganizationSchema', () => {
  it('returns @type Organization with a sameAs array', () => {
    const schema = generateOrganizationSchema();
    expect(schema['@type']).toBe('Organization');
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect((schema.sameAs as string[]).length).toBeGreaterThan(0);
  });
});

describe('generateSoftwareAppSchema', () => {
  it('returns @type SoftwareApplication with featureList', () => {
    const schema = generateSoftwareAppSchema();
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema).toHaveProperty('featureList');
    expect(Array.isArray(schema.featureList)).toBe(true);
  });
});

describe('generateBreadcrumbSchema', () => {
  it('returns @type BreadcrumbList with correct positions', () => {
    const items = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'Products', url: 'https://example.com/products' },
    ];
    const schema = generateBreadcrumbSchema(items);

    expect(schema['@type']).toBe('BreadcrumbList');
    expect(Array.isArray(schema.itemListElement)).toBe(true);

    const elements = schema.itemListElement as Array<{
      '@type': string;
      position: number;
      name: string;
      item: string;
    }>;

    expect(elements).toHaveLength(2);
    expect(elements[0].position).toBe(1);
    expect(elements[0].name).toBe('Home');
    expect(elements[1].position).toBe(2);
    expect(elements[1].name).toBe('Products');
  });
});

describe('generateHomePageSchemas', () => {
  it('returns an array of 4 schemas', () => {
    const schemas = generateHomePageSchemas();
    expect(Array.isArray(schemas)).toBe(true);
    expect(schemas).toHaveLength(4);
  });
});

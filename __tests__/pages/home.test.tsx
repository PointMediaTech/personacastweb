import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const Component = () => <div data-testid="dynamic-section" />;
    Component.displayName = 'DynamicComponent';
    return Component;
  },
}));
vi.mock('@/app/components/hero', () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));
vi.mock('@/app/lib/structured-data', () => ({
  generateHomePageSchemas: () => [],
}));

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('renders dynamic below-fold sections', () => {
    render(<HomePage />);
    const dynamicSections = screen.getAllByTestId('dynamic-section');
    expect(dynamicSections.length).toBe(5);
  });
});

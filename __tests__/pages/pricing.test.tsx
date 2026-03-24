import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/pricing',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));
vi.mock('@/app/pricing/PricingInteractive', () => ({
  PricingInteractive: () => <div data-testid="pricing-interactive" />,
}));
vi.mock('@/app/components/shared/FeatureCompareTable', () => ({
  FeatureCompareTable: () => <div data-testid="feature-compare-table" />,
}));
vi.mock('@/app/components/shared/TrustBar', () => ({
  TrustBar: () => <div data-testid="trust-bar" />,
}));
vi.mock('@/app/components/shared/FAQAccordion', () => ({
  FAQAccordion: () => <div data-testid="faq-accordion" />,
}));

import PricingPage from '@/app/pricing/page';

describe('PricingPage', () => {
  it('renders the pricing page headline', () => {
    render(<PricingPage />);
    expect(screen.getByText(/PersonaCast 定價方案/)).toBeInTheDocument();
  });

  it('renders the PricingInteractive component area', () => {
    render(<PricingPage />);
    expect(screen.getByTestId('pricing-interactive')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { PricingCard } from '@/app/components/shared/PricingCard';

const baseProps = {
  name: '專業版',
  audience: '適合中型團隊',
  priceDisplay: 'NT$2,999',
  priceSuffix: '/月',
  features: ['功能A', '功能B'],
  valueProposition: '最佳性價比' as React.ReactNode,
  cta: { label: '立即訂閱', href: '/subscribe' },
};

describe('PricingCard', () => {
  it('renders name, audience, price, and features', () => {
    render(<PricingCard {...baseProps} />);
    expect(screen.getByText('專業版')).toBeInTheDocument();
    expect(screen.getByText('適合中型團隊')).toBeInTheDocument();
    expect(screen.getByText('NT$2,999')).toBeInTheDocument();
    expect(screen.getByText('功能A')).toBeInTheDocument();
    expect(screen.getByText('功能B')).toBeInTheDocument();
  });

  it('shows badge when provided', () => {
    render(<PricingCard {...baseProps} badge="最受歡迎" />);
    expect(screen.getByText('最受歡迎')).toBeInTheDocument();
  });

  it('shows highlighted styling when highlighted', () => {
    const { container } = render(<PricingCard {...baseProps} highlighted />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.border).toContain('rgba(118, 158, 219, 0.5)');
  });

  it('CTA link has correct href', () => {
    render(<PricingCard {...baseProps} />);
    const link = screen.getByText('立即訂閱').closest('a')!;
    expect(link).toHaveAttribute('href', '/subscribe');
  });
});

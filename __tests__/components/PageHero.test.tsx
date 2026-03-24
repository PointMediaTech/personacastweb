import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { PageHero } from '@/app/components/shared/PageHero';

describe('PageHero', () => {
  it('renders h1 and h2 text', () => {
    render(<PageHero h1="標題文字" h2="副標題文字" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('標題文字');
    expect(screen.getByText('副標題文字')).toBeInTheDocument();
  });

  it('renders CTA buttons when provided', () => {
    render(
      <PageHero
        h1="T" h2="S"
        ctaPrimary={{ label: '主要按鈕', href: '/a' }}
        ctaSecondary={{ label: '次要按鈕', href: '/b' }}
      />,
    );
    expect(screen.getByText('主要按鈕')).toBeInTheDocument();
    expect(screen.getByText('次要按鈕')).toBeInTheDocument();
  });

  it('does not render CTA when not provided', () => {
    render(<PageHero h1="T" h2="S" />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('split layout renders rightContent', () => {
    render(
      <PageHero h1="T" h2="S" layout="split" rightContent={<div data-testid="right">RC</div>} />,
    );
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('center layout does not render rightContent slot', () => {
    render(
      <PageHero h1="T" h2="S" layout="center" rightContent={<div data-testid="right">RC</div>} />,
    );
    expect(screen.queryByTestId('right')).toBeNull();
  });
});

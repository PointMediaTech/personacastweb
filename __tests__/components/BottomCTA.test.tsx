import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { BottomCTA } from '@/app/components/shared/BottomCTA';

const primary = { label: '立即開始', href: '/start' };

describe('BottomCTA', () => {
  it('renders h2 text', () => {
    render(<BottomCTA h2="行動標題" ctaPrimary={primary} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('行動標題');
  });

  it('renders body text when provided', () => {
    render(<BottomCTA h2="T" body="說明文字" ctaPrimary={primary} />);
    expect(screen.getByText('說明文字')).toBeInTheDocument();
  });

  it('does not render body when not provided', () => {
    const { container } = render(<BottomCTA h2="T" ctaPrimary={primary} />);
    expect(container.querySelector('p.mt-5')).toBeNull();
  });

  it('renders primary CTA button', () => {
    render(<BottomCTA h2="T" ctaPrimary={primary} />);
    expect(screen.getByText('立即開始')).toBeInTheDocument();
  });

  it('renders secondary CTA when provided', () => {
    render(
      <BottomCTA h2="T" ctaPrimary={primary} ctaSecondary={{ label: '了解更多', href: '/more' }} />,
    );
    expect(screen.getByText('了解更多')).toBeInTheDocument();
  });
});

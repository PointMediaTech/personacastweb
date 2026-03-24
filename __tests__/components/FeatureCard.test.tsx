import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { FeatureCard } from '@/app/components/shared/FeatureCard';

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(<FeatureCard title="功能標題" description="功能說明" />);
    expect(screen.getByText('功能標題')).toBeInTheDocument();
    expect(screen.getByText('功能說明')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <FeatureCard title="T" description="D" icon={<span data-testid="icon">IC</span>} />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom accentColor', () => {
    const { container } = render(
      <FeatureCard title="T" description="D" accentColor="#FF0000" />,
    );
    const accentLine = container.querySelector('.h-\\[2px\\]') as HTMLElement;
    expect(accentLine.style.background).toContain('rgb(255, 0, 0)');
  });
});

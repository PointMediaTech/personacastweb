import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/solutions',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));

import SolutionsPage from '@/app/solutions/page';

describe('SolutionsPage', () => {
  it('renders the solutions heading', () => {
    render(<SolutionsPage />);
    expect(screen.getByText(/每一場輿論戰，我們都已預演過/)).toBeInTheDocument();
  });

  it('renders 4 solution cards', () => {
    render(<SolutionsPage />);
    expect(screen.getByText('公關危機預判')).toBeInTheDocument();
    expect(screen.getByText('政治議題推演')).toBeInTheDocument();
    expect(screen.getByText('品牌聲譽管理')).toBeInTheDocument();
    expect(screen.getByText('政策輿論模擬')).toBeInTheDocument();
  });
});

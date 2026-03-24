import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/resources',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));

import ResourcesPage from '@/app/resources/page';

describe('ResourcesPage', () => {
  it('renders without crashing', () => {
    render(<ResourcesPage />);
    expect(screen.getByText(/掌握輿論的知識武器庫/)).toBeInTheDocument();
  });

  it('renders resource type cards', () => {
    render(<ResourcesPage />);
    expect(screen.getByText('客戶成功案例')).toBeInTheDocument();
    expect(screen.getByText('白皮書下載')).toBeInTheDocument();
  });
});

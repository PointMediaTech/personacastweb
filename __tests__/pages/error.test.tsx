import { render, screen, fireEvent } from '@testing-library/react';
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
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));

import ErrorPage from '@/app/error';

describe('ErrorPage', () => {
  const mockError = new Error('Test error');
  const mockReset = vi.fn();

  it('renders the error heading', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('發生錯誤')).toBeInTheDocument();
  });

  it('has a retry button', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('重新嘗試')).toBeInTheDocument();
  });

  it('calls reset when retry button is clicked', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    fireEvent.click(screen.getByText('重新嘗試'));
    expect(mockReset).toHaveBeenCalledOnce();
  });
});

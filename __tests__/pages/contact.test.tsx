import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/contact',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));

import ContactPage from '@/app/contact/page';

describe('ContactPage', () => {
  it('renders contact heading', () => {
    render(<ContactPage />);
    expect(screen.getByText(/讓我們為您預演一場輿論戰/)).toBeInTheDocument();
  });

  it('renders the contact form with name and company labels', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText('姓名')).toBeInTheDocument();
    expect(screen.getByLabelText('公司名稱')).toBeInTheDocument();
  });
});

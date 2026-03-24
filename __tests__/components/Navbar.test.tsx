import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { Navbar } from '@/app/components/shared/Navbar';

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('Persona')).toBeInTheDocument();
    expect(screen.getByText('Cast')).toBeInTheDocument();
  });

  it('renders desktop nav items', () => {
    render(<Navbar />);
    const labels = ['產品', '解決方案', '定價', '資源', '關於我們'];
    for (const label of labels) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders login link and demo CTA', () => {
    render(<Navbar />);
    expect(screen.getAllByText('登入').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('預約 Demo').length).toBeGreaterThanOrEqual(1);
  });

  it('has mobile hamburger button with aria-label', () => {
    render(<Navbar />);
    const btn = screen.getByLabelText('開啟選單');
    expect(btn).toBeInTheDocument();
  });

  it('opens mobile sidebar when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const hamburger = screen.getByLabelText('開啟選單');
    await user.click(hamburger);
    expect(screen.getAllByLabelText('關閉選單').length).toBeGreaterThanOrEqual(1);
  });
});

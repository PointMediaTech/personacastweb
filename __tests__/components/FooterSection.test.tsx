import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { FooterSection } from '@/app/components/footer/FooterSection';

describe('FooterSection', () => {
  it('renders PersonaCast logo', () => {
    render(<FooterSection />);
    expect(screen.getByText('Persona')).toBeInTheDocument();
    expect(screen.getByText('Cast')).toBeInTheDocument();
  });

  it('renders footer column links', () => {
    render(<FooterSection />);
    expect(screen.getAllByText('平台概覽').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('關於我們').length).toBeGreaterThanOrEqual(1);
  });

  it('renders copyright text', () => {
    render(<FooterSection />);
    expect(screen.getByText(/PersonaCast Inc/)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<FooterSection />);
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<FooterSection />);
    expect(screen.getByText('隱私權政策')).toBeInTheDocument();
    expect(screen.getByText('服務條款')).toBeInTheDocument();
  });
});

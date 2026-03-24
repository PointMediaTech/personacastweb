import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/about',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));

import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders the page heading', () => {
    render(<AboutPage />);
    expect(screen.getByText(/讓輿論不再是賭博/)).toBeInTheDocument();
  });

  it('renders core values section', () => {
    render(<AboutPage />);
    expect(screen.getByText('核心驅動力')).toBeInTheDocument();
    expect(screen.getByText('預見 > 回應')).toBeInTheDocument();
    expect(screen.getByText('多元 > 單一')).toBeInTheDocument();
    expect(screen.getByText('數據 > 直覺')).toBeInTheDocument();
  });

  it('renders team section', () => {
    render(<AboutPage />);
    expect(screen.getByText('引領變革的跨界專家')).toBeInTheDocument();
    expect(screen.getByText('創辦人 & CEO')).toBeInTheDocument();
    expect(screen.getByText('技術長 CTO')).toBeInTheDocument();
  });
});

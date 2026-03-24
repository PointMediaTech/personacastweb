import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/legal',
}));
vi.mock('next/dynamic', () => ({
  default: () => {
    const C = () => <div data-testid="dynamic-section" />;
    C.displayName = 'DynamicComponent';
    return C;
  },
}));

import PrivacyPolicyPage from '@/app/legal/privacy/page';
import TermsOfServicePage from '@/app/legal/terms/page';

describe('PrivacyPolicyPage', () => {
  it('renders privacy policy heading', () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText('隱私權政策')).toBeInTheDocument();
  });
});

describe('TermsOfServicePage', () => {
  it('renders terms of service heading', () => {
    render(<TermsOfServicePage />);
    expect(screen.getByText('服務條款')).toBeInTheDocument();
  });
});

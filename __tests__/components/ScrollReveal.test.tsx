import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
}));

import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

describe('ScrollReveal', () => {
  it('renders children content', () => {
    render(<ScrollReveal><span>Child text</span></ScrollReveal>);
    expect(screen.getByText('Child text')).toBeInTheDocument();
  });

  it('renders visible after intersection triggers', () => {
    const { container } = render(<ScrollReveal><span>Visible</span></ScrollReveal>);
    const wrapper = container.firstElementChild as HTMLElement;
    // Mock triggers immediately, so opacity should be 1 or style absent (reduced motion)
    const opacity = wrapper.style.opacity;
    expect(opacity === '' || opacity === '1').toBe(true);
  });
});

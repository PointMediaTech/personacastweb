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

import { FAQAccordion } from '@/app/components/shared/FAQAccordion';

const items = [
  { question: '問題一', answer: '答案一' },
  { question: '問題二', answer: '答案二' },
];

describe('FAQAccordion', () => {
  it('renders all question texts', () => {
    render(<FAQAccordion items={items} />);
    expect(screen.getByText('問題一')).toBeInTheDocument();
    expect(screen.getByText('問題二')).toBeInTheDocument();
  });

  it('initially all answers are collapsed', () => {
    render(<FAQAccordion items={items} />);
    const buttons = screen.getAllByRole('button');
    for (const btn of buttons) {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('clicking a question expands it', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={items} />);
    const btn = screen.getByText('問題一').closest('button')!;
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking the same question again collapses it', async () => {
    const user = userEvent.setup();
    render(<FAQAccordion items={items} />);
    const btn = screen.getByText('問題一').closest('button')!;
    await user.click(btn);
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });
});

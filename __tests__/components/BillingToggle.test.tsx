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

import { BillingToggle } from '@/app/components/shared/BillingToggle';

describe('BillingToggle', () => {
  it('renders monthly and annual text', () => {
    render(<BillingToggle isAnnual={false} onChange={vi.fn()} />);
    expect(screen.getByText('月繳')).toBeInTheDocument();
    expect(screen.getByText('年繳')).toBeInTheDocument();
  });

  it('renders save badge', () => {
    render(<BillingToggle isAnnual={false} onChange={vi.fn()} />);
    expect(screen.getByText('省 20%')).toBeInTheDocument();
  });

  it('clicking annual calls onChange with true', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BillingToggle isAnnual={false} onChange={onChange} />);
    await user.click(screen.getByText('年繳'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('clicking monthly calls onChange with false', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<BillingToggle isAnnual={true} onChange={onChange} />);
    await user.click(screen.getByText('月繳'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('toggle button has correct aria-label', () => {
    render(<BillingToggle isAnnual={false} onChange={vi.fn()} />);
    expect(screen.getByLabelText('切換月繳/年繳')).toBeInTheDocument();
  });
});

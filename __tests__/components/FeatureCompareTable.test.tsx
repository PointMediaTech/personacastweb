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

import { FeatureCompareTable } from '@/app/components/shared/FeatureCompareTable';

describe('FeatureCompareTable', () => {
  it('initially table is collapsed', () => {
    render(<FeatureCompareTable />);
    expect(screen.getByText('查看完整功能對比')).toBeInTheDocument();
  });

  it('clicking button expands the table and changes text', async () => {
    const user = userEvent.setup();
    render(<FeatureCompareTable />);
    await user.click(screen.getByText('查看完整功能對比'));
    expect(screen.getByText('收起功能對比表')).toBeInTheDocument();
  });

  it('table shows 3 tier column headers', async () => {
    const user = userEvent.setup();
    render(<FeatureCompareTable />);
    await user.click(screen.getByText('查看完整功能對比'));
    expect(screen.getByText('洞察版')).toBeInTheDocument();
    expect(screen.getByText(/預判版/)).toBeInTheDocument();
    expect(screen.getByText('指揮版')).toBeInTheDocument();
  });
});

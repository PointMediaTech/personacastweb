'use client';

interface BillingToggleProps {
  readonly isAnnual: boolean;
  readonly onChange: (isAnnual: boolean) => void;
}

export function BillingToggle({ isAnnual, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <button
        onClick={() => onChange(false)}
        className="text-base font-medium transition-colors duration-200"
        style={{ color: isAnnual ? '#607080' : '#fff' }}
      >
        月繳
      </button>

      <button
        onClick={() => onChange(!isAnnual)}
        className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none"
        style={{
          background: isAnnual
            ? 'linear-gradient(135deg, #769EDB, #5A86C9)'
            : 'rgba(118,158,219,0.15)',
          border: '1px solid rgba(118,158,219,0.25)',
        }}
        aria-label="切換月繳/年繳"
      >
        <span
          className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300"
          style={{
            left: isAnnual ? 'calc(100% - 1.5rem)' : '0.25rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        />
      </button>

      <button
        onClick={() => onChange(true)}
        className="text-base font-medium transition-colors duration-200 flex items-center gap-2"
        style={{ color: isAnnual ? '#fff' : '#607080' }}
      >
        年繳
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full transition-all duration-300"
          style={{
            background: isAnnual
              ? 'rgba(118,158,219,0.2)'
              : 'rgba(118,158,219,0.08)',
            color: isAnnual ? '#A8C4F0' : '#607080',
            border: `1px solid ${isAnnual ? 'rgba(118,158,219,0.35)' : 'rgba(118,158,219,0.1)'}`,
          }}
        >
          省 20%
        </span>
      </button>
    </div>
  );
}

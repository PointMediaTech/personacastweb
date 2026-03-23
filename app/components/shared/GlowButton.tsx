import Link from 'next/link';

interface GlowButtonProps {
  readonly href: string;
  readonly label: string;
  readonly variant?: 'primary' | 'secondary';
  readonly minWidth?: string;
  readonly className?: string;
}

/**
 * Reusable CTA button.
 * - primary: glowing cyan/blue gradient border with dark fill
 * - secondary: subtle ghost style with backdrop-blur
 */
export function GlowButton({
  href,
  label,
  variant = 'primary',
  minWidth = '180px',
  className = '',
}: GlowButtonProps) {
  if (variant === 'secondary') {
    return (
      <Link
        href={href}
        style={{ minWidth }}
        className={`group inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base font-semibold tracking-widest text-[#94A3B8] transition-all duration-300 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 ${className}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      style={{ minWidth }}
      className={`group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-500 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      {/* Glowing border layer */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00F2FF] via-[#769EDB] to-[#00F2FF] opacity-60 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-500"
      />
      {/* Dark fill */}
      <span
        aria-hidden="true"
        className="absolute inset-[1.5px] rounded-[15px] bg-[#0A0E1A] transition-all duration-500 group-hover:bg-[#0A0E1A]/90"
      />
      {/* Metallic sheen */}
      <span
        aria-hidden="true"
        className="absolute inset-[1.5px] rounded-[15px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
      />
      <span className="relative flex items-center gap-3 tracking-widest">
        {label}
        <svg
          className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </Link>
  );
}

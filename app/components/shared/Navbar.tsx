'use client';

import { useCallback } from 'react';

const NAV_LINKS = [
  { label: '核心推演', id: 'paradigm' },
  { label: '三大支柱', id: 'pillars' },
  { label: '應用場景', id: 'scenarios' },
  { label: '技術深度', id: 'authority' },
  { label: '實戰案例', id: '' },
  { label: '資源中心', id: '' },
] as const;

export function Navbar() {
  const scrollTo = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav
      className="nav-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
      }}
    >
      {/* Logo — text wordmark */}
      <a href="/" aria-label="PersonaCast" className="flex items-center leading-none">
        <span className="text-[26px] font-semibold tracking-[-0.02em] text-[#E2E8F0]" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Persona</span>
        <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#00E0C2]" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>Cast</span>
      </a>

      {/* Navigation links — hidden on mobile */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.id ? `#${link.id}` : '#'}
              onClick={link.id ? (e) => scrollTo(e, link.id) : undefined}
              className="nav-link text-mist-blue-gray text-base tracking-[0.08em] transition-all duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Action buttons — hidden on mobile */}
      <div className="hidden md:flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => scrollTo(e, 'cta')}
          className="cta-ghost rounded-full text-base font-medium text-white tracking-[0.08em]"
          title="預約 AI 智能體模擬演示"
        >
          預約專屬演示
        </button>
      </div>
    </nav>
  );
}

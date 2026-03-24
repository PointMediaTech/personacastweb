'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

import { NAV_ITEMS } from './navbar/navData';
import { DesktopDropdown } from './navbar/DesktopDropdown';
import { MobileSidebar } from './navbar/MobileSidebar';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openDropdown = useCallback((key: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveDropdown(key);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const toggleMobileAccordion = useCallback((key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  }, []);

  return (
    <>
      {/* ── Top bar Wrapper ── */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none transition-all duration-300 ${scrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}>
        <nav
          className={`pointer-events-auto flex items-center justify-between w-full transition-all duration-300 ${scrolled ? 'max-w-6xl rounded-2xl px-6 h-16' : 'max-w-full rounded-none px-6 md:px-10 h-[72px]'}`}
          style={{
            backgroundColor: scrolled ? 'rgba(10,14,26,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: scrolled ? 'none' : '1px solid rgba(118,158,219,0.15)',
            border: scrolled ? '1px solid rgba(255,255,255,0.15)' : undefined,
            boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          {/* Logo */}
          <Link href="/" aria-label="PersonaCast" className="flex items-center leading-none shrink-0 group">
            <span className="text-[26px] font-semibold tracking-[-0.02em] text-white transition-colors" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              Persona
            </span>
            <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#00E0C2] group-hover:drop-shadow-[0_0_12px_rgba(0,224,194,0.8)] transition-all duration-300" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
              Cast
            </span>
          </Link>

          {/* ── Desktop nav items (centered in navbar) ── */}
          <ul className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => {
              const hasChildren = !!item.children;
              const isOpen = activeDropdown === item.label;

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={hasChildren ? () => openDropdown(item.label) : undefined}
                  onMouseLeave={hasChildren ? scheduleClose : undefined}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className="group flex items-center gap-2 px-4 py-2 text-[15px] font-bold transition-all duration-200 rounded-lg hover:bg-white/10"
                      style={{ color: isOpen ? '#FFFFFF' : '#CBD5E1' }}
                      aria-expanded={isOpen}
                      onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-300 opacity-80 group-hover:opacity-100"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? '/'}
                      className="block px-4 py-2 text-[15px] font-bold transition-all duration-200 rounded-lg hover:bg-white/10 hover:text-white"
                      style={{ color: '#CBD5E1' }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* ── Dropdown panel ── */}
                  {hasChildren && (
                    <DesktopDropdown
                      item={item}
                      isOpen={isOpen}
                      onOpen={() => openDropdown(item.label)}
                      onScheduleClose={scheduleClose}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Desktop right actions ── */}
          <div className="hidden lg:flex items-center gap-5 ml-auto">
            <Link href="/login" className="text-[15px] font-bold transition-colors duration-200 hover:text-white" style={{ color: '#CBD5E1' }}>
              登入
            </Link>
            <Link
              href="/contact"
              className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md bg-[#00E0C2] px-5 font-bold text-[#050B14] text-[13px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(0,224,194,0.4)] active:scale-[0.97]"
            >
              <span className="flex items-center gap-1.5 z-10">預約 Demo</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* ── Mobile sidebar (with overlay) ── */}
      <MobileSidebar
        isOpen={mobileOpen}
        accordion={mobileAccordion}
        onClose={closeMobile}
        onToggleAccordion={toggleMobileAccordion}
      />

      {/* ── Keyframes (injected once) ── */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}

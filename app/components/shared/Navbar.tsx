'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from './navbar/navData';
import { DesktopDropdown } from './navbar/DesktopDropdown';
import { MobileSidebar } from './navbar/MobileSidebar';

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          height: 56,
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
          backgroundColor: scrolled
            ? 'rgba(11,21,38,0.92)'
            : 'rgba(11,21,38,0.60)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(255,255,255,0.04)',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="PersonaCast" className="flex items-center gap-2 shrink-0">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#0A3D7A"/>
            <path d="M8 22V10l8 6-8 6z" fill="#00A3E0"/>
            <path d="M16 16l8-6v12l-8-6z" fill="#00E0C2"/>
          </svg>
          <span
            className="font-heading font-bold tracking-tight"
            style={{ fontSize: 14.5, color: '#FFFFFF', letterSpacing: '-0.02em' }}
          >
            Persona<span style={{ color: '#00A3E0' }}>Cast</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-medium transition-colors hover:bg-white/8"
                    style={{ color: isOpen ? '#FFFFFF' : '#8898B8' }}
                    aria-expanded={isOpen}
                    onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.6 }}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href ?? '/'}
                    className="nav-link block px-3 py-1.5 text-[13px] font-medium transition-colors hover:text-white"
                    style={{ color: '#8898B8' }}
                  >
                    {item.label}
                  </Link>
                )}
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

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-[13px] font-medium transition-colors hover:text-white"
            style={{ color: '#8898B8' }}
          >
            登入
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-1.5 text-[12.5px] font-bold rounded-sm transition-all duration-200 hover:shadow-[0_0_16px_rgba(0,224,194,0.35)] hover:scale-[1.02]"
            style={{
              background: '#00E0C2',
              color: '#050B14',
              letterSpacing: '0.01em',
            }}
          >
            預約演示
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded transition-colors hover:bg-white/10"
          style={{ color: '#8898B8' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <MobileSidebar
        isOpen={mobileOpen}
        accordion={mobileAccordion}
        onClose={closeMobile}
        onToggleAccordion={toggleMobileAccordion}
      />
    </>
  );
}

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, ChevronDown, 
  LayoutDashboard, Sparkles, Network, Layers, Radar, Archive,
  ShieldAlert, Landmark, TrendingUp, Scale,
  ArrowRight
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface SubItem {
  readonly label: string;
  readonly desc?: string;
  readonly href: string;
  readonly disabled?: boolean;
  readonly icon?: React.ElementType;
}

interface NavItem {
  readonly label: string;
  readonly href?: string;
  readonly children?: readonly SubItem[];
  readonly mega?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: '產品',
    mega: true,
    children: [
      { label: '平台概覽', href: '/product', icon: LayoutDashboard },
      { label: '種子注入引擎', desc: '注入議題與情境變數，啟動推演', href: '/product/seed-injection', icon: Sparkles },
      { label: '圖譜建構系統', desc: 'AI 人格關係網路視覺化', href: '/product/graph-engine', icon: Network },
      { label: '全境模擬：預演公關劇本', desc: '觀察多元人格在議題中的即時交鋒', href: '/product/simulation-theater', icon: Layers },
      { label: '預測解碼器', desc: '數據驅動的輿情走向預測與風險評分', href: '/product/predictive-decoder', icon: Radar },
      { label: '輿情資產堡壘', desc: '推演結果沉澱為可檢索策略知識庫', href: '/product/data-assets', icon: Archive },
    ],
  },
  {
    label: '解決方案',
    mega: true,
    children: [
      { label: '公關危機預判', desc: '在輿論風暴引爆前攔截危機火線', href: '/solutions/crisis-pr', icon: ShieldAlert },
      { label: '政治議題推演', desc: '預判民意走向，精準規劃溝通策略', href: '/solutions/political-strategy', icon: Landmark },
      { label: '品牌聲譽管理', desc: '量化品牌在輿論場中的韌性指數', href: '/solutions/brand-reputation', icon: TrendingUp },
      { label: '政策輿論模擬', desc: '預測政策發布後的社會連鎖反應', href: '/solutions/policy-simulation', icon: Scale },
    ],
  },
  { label: '定價', href: '/pricing' },
  {
    label: '資源',
    children: [
      { label: '部落格 / 洞察', href: '/resources/blog', disabled: true },
      { label: '客戶案例', href: '/resources/case-studies' },
      { label: '白皮書下載', href: '/resources/whitepapers' },
    ],
  },
  { label: '關於我們', href: '/about' },
] as const;

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const DROPDOWN_GLASS = {
  backgroundColor: 'rgba(10, 14, 26, 0.95)', // Darker background for more text contrast
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.1)', // Brighter border
  boxShadow: '0 24px 40px -8px rgba(0, 0, 0, 0.8), 0 0 40px rgba(118, 158, 219, 0.12) inset',
} as const;

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
                    <div
                      className="absolute top-full pt-4"
                      style={{
                        left: '50%',
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen
                          ? 'translateX(-50%) translateY(0) scale(1)'
                          : 'translateX(-50%) translateY(-8px) scale(0.96)',
                        pointerEvents: isOpen ? 'auto' : 'none',
                        transition: 'opacity 250ms cubic-bezier(0.16, 1, 0.3, 1), transform 250ms cubic-bezier(0.16, 1, 0.3, 1)',
                        transformOrigin: 'top center',
                      }}
                      onMouseEnter={() => openDropdown(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <div
                        className="rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                          ...DROPDOWN_GLASS,
                          minWidth: item.mega ? '800px' : '260px',
                        }}
                      >
                        {item.mega ? (
                          <div className="flex w-full p-3 gap-3">
                            {/* Bento Grid Left: Showcase */}
                            <div className="w-[35%] bg-gradient-to-br from-[#769EDB]/15 to-transparent rounded-xl p-8 flex flex-col justify-between border border-white/10">
                              <div>
                                <h3 className="text-white font-black text-xl mb-3 tracking-wide">
                                  {item.label === '產品' ? '探索 PersonaCast' : '專屬解決方案'}
                                </h3>
                                <p className="text-slate-300 text-[15px] leading-relaxed">
                                  {item.label === '產品' 
                                    ? '體驗強大的 AI 人格推演引擎，為您精準模擬並掌握每一次的輿論戰局。'
                                    : '針對不同產業領域與應用場景，打造專屬推演架構，讓您提前掌握局勢。'}
                                </p>
                              </div>
                              <div className="mt-8">
                                <Link 
                                  href={item.label === '產品' ? '/product' : '/solutions'} 
                                  className="group/link inline-flex items-center gap-2 text-[#00E0C2] text-base font-bold hover:text-white transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item.label === '產品' ? '了解平台核心' : '瀏覽所有解決方案'}
                                  <ArrowRight size={18} className="group-hover/link:translate-x-1.5 transition-transform" />
                                </Link>
                              </div>
                            </div>
                            
                            {/* Bento Grid Right: Items list */}
                            <div className="w-[65%] grid grid-cols-2 gap-2 p-2 relative">
                              {item.children!.map((child, idx) => {
                                const Icon = child.icon;
                                const isProductMenu = item.label === '產品';
                                const isOverview = isProductMenu && child.label === '平台概覽';
                                const stepNumber = isProductMenu && !isOverview ? idx : null;

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`group flex flex-col gap-2 rounded-xl p-4 transition-all duration-200 hover:bg-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-transparent hover:border-white/5 ${
                                      isOverview ? 'col-span-2 mb-2 bg-gradient-to-r from-[#769EDB]/10 to-transparent border-white/5' : ''
                                    }`}
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <div className="flex items-center gap-3">
                                      {Icon && (
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#769EDB]/15 text-[#769EDB] group-hover:bg-[#769EDB] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(118,158,219,0.6)] transition-all duration-300">
                                          <Icon size={20} strokeWidth={2.5} />
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2">
                                        {stepNumber !== null && (
                                          <span className="text-[11px] font-black bg-white/10 text-white/70 px-1.5 py-0.5 rounded-md uppercase tracking-wide group-hover:bg-[#00E0C2]/20 group-hover:text-[#00E0C2] transition-colors">
                                            Step {stepNumber}
                                          </span>
                                        )}
                                        <span className="text-[15px] font-bold text-slate-100 group-hover:text-white transition-colors">
                                          {child.label}
                                        </span>
                                      </div>
                                    </div>
                                    {child.desc && (
                                      <span className="text-[13px] text-slate-400 leading-relaxed font-semibold pl-[3.25rem] group-hover:text-slate-300 transition-colors">
                                        {child.desc}
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 flex flex-col gap-1.5">
                            {item.children!.map((child, idx) => (
                              <Link
                                key={child.href}
                                href={child.disabled ? '#' : child.href}
                                aria-disabled={child.disabled}
                                className={`block rounded-xl px-5 py-3 text-[15px] font-bold transition-all duration-200 ${
                                  child.disabled
                                    ? 'text-[#64748B] cursor-not-allowed'
                                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                                }`}
                                onClick={(e) => {
                                  if (child.disabled) e.preventDefault();
                                  else setActiveDropdown(null);
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
              className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg bg-[#769EDB] px-6 font-bold text-white text-[15px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(118,158,219,0.5)] active:scale-[0.97]"
            >
              <span className="flex items-center gap-1.5 z-10">預約 Demo</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
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

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden backdrop-blur-md"
          style={{ backgroundColor: 'rgba(5, 8, 15, 0.8)' }}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile sidebar ── */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[340px] flex flex-col lg:hidden overflow-y-auto bg-[#0a0e1a]/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl"
        style={{
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="flex items-center justify-end h-[72px] px-6">
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            onClick={closeMobile}
            aria-label="關閉選單"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-5 pb-6 mt-2">
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => {
              const hasChildren = !!item.children;
              const isAccordionOpen = mobileAccordion === item.label;

              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full px-5 py-4 text-lg font-bold rounded-xl transition-colors hover:bg-white/10 border border-transparent hover:border-white/5"
                        style={{ color: isAccordionOpen ? '#FFFFFF' : '#CBD5E1' }}
                        onClick={() => toggleMobileAccordion(item.label)}
                        aria-expanded={isAccordionOpen}
                      >
                        {item.label}
                        <ChevronDown
                          size={20}
                          className="transition-transform duration-300"
                          style={{ transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>

                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isAccordionOpen ? '800px' : '0',
                          opacity: isAccordionOpen ? 1 : 0,
                        }}
                      >
                        <ul className="pl-4 pb-3 pt-2 space-y-2 border-l-2 border-white/10 ml-6 mt-2">
                          {item.children!.map((child) => {
                            const Icon = child.icon;
                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.disabled ? '#' : child.href}
                                  aria-disabled={child.disabled}
                                  className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                    child.disabled
                                      ? 'text-[#64748B] cursor-not-allowed'
                                      : 'hover:bg-white/10'
                                  }`}
                                  onClick={(e) => {
                                    if (child.disabled) e.preventDefault();
                                    else closeMobile();
                                  }}
                                >
                                  {Icon && (
                                    <span className="mt-1 shrink-0 text-[#769EDB]">
                                      <Icon size={18} />
                                    </span>
                                  )}
                                  <div>
                                    <span className={`block text-base font-bold ${child.disabled ? '' : 'text-slate-200 hover:text-white'}`}>{child.label}</span>
                                    {child.desc && (
                                      <span className="block text-sm text-slate-400 font-semibold leading-relaxed mt-1.5">{child.desc}</span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href ?? '/'}
                      className="block px-5 py-4 text-lg font-bold rounded-xl transition-colors text-[#CBD5E1] hover:text-[#FFFFFF] hover:bg-white/10"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-6 pb-8 pt-6 border-t border-white/20 space-y-4 bg-[#0a0e1a]/80 backdrop-blur-sm">
          <Link
            href="/login"
            className="block w-full text-center py-4 text-base font-bold rounded-xl text-slate-200 hover:text-white transition-colors hover:bg-white/10"
            onClick={closeMobile}
          >
            登入
          </Link>
          <Link
            href="/contact"
            className="block w-full text-center py-4 text-base font-black text-white rounded-xl transition-all duration-200 bg-[#769EDB] hover:shadow-[0_0_24px_rgba(118,158,219,0.5)] hover:scale-[1.02]"
            onClick={closeMobile}
          >
            預約 Demo
          </Link>
        </div>
      </aside>

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

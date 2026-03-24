'use client';

import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from './navData';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface MobileSidebarProps {
  readonly isOpen: boolean;
  readonly accordion: string | null;
  readonly onClose: () => void;
  readonly onToggleAccordion: (key: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MobileSidebar({ isOpen, accordion, onClose, onToggleAccordion }: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden backdrop-blur-md"
          style={{ backgroundColor: 'rgba(5, 8, 15, 0.8)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[340px] flex flex-col lg:hidden overflow-y-auto bg-[#0a0e1a]/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close button */}
        <div className="flex items-center justify-end h-[72px] px-6">
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            onClick={onClose}
            aria-label="關閉選單"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-5 pb-6 mt-2">
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => {
              const hasChildren = !!item.children;
              const isAccordionOpen = accordion === item.label;

              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full px-5 py-4 text-lg font-bold rounded-xl transition-colors hover:bg-white/10 border border-transparent hover:border-white/5"
                        style={{ color: isAccordionOpen ? '#FFFFFF' : '#CBD5E1' }}
                        onClick={() => onToggleAccordion(item.label)}
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
                                    else onClose();
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
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="px-6 pb-8 pt-6 border-t border-white/20 space-y-4 bg-[#0a0e1a]/80 backdrop-blur-sm">
          <Link
            href="/login"
            className="block w-full text-center py-4 text-base font-bold rounded-xl text-slate-200 hover:text-white transition-colors hover:bg-white/10"
            onClick={onClose}
          >
            登入
          </Link>
          <Link
            href="/contact"
            className="block w-full text-center py-4 text-base font-black text-[#050B14] rounded-xl transition-all duration-200 bg-[#00E0C2] hover:shadow-[0_0_24px_rgba(0,224,194,0.4)] hover:scale-[1.02]"
            onClick={onClose}
          >
            預約 Demo
          </Link>
        </div>
      </aside>
    </>
  );
}

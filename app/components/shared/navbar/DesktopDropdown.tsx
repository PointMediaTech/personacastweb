'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NavItem } from './navData';
import { DROPDOWN_GLASS } from './navData';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface DesktopDropdownProps {
  readonly item: NavItem;
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onScheduleClose: () => void;
  readonly onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DesktopDropdown({ item, isOpen, onOpen, onScheduleClose, onClose }: DesktopDropdownProps) {
  return (
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
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          ...DROPDOWN_GLASS,
          minWidth: item.mega ? '860px' : '260px',
        }}
      >
        {item.mega ? (
          <MegaDropdownContent item={item} onClose={onClose} />
        ) : (
          <SimpleDropdownContent item={item} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mega dropdown (products / solutions)                               */
/* ------------------------------------------------------------------ */

function MegaDropdownContent({ item, onClose }: { readonly item: NavItem; readonly onClose: () => void }) {
  return (
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
            className="group/link inline-flex items-center gap-2 text-brand-teal text-base font-bold hover:text-white transition-colors"
            onClick={onClose}
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
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#769EDB]/15 text-[#769EDB] group-hover:bg-[#769EDB] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(118,158,219,0.6)] transition-all duration-300">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {stepNumber !== null && (
                    <span className="text-[11px] font-black bg-white/10 text-white/70 px-1.5 py-0.5 rounded-md uppercase tracking-wide whitespace-nowrap shrink-0 w-fit group-hover:bg-brand-teal/20 group-hover:text-brand-teal transition-colors">
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
  );
}

/* ------------------------------------------------------------------ */
/*  Simple dropdown (resources)                                        */
/* ------------------------------------------------------------------ */

function SimpleDropdownContent({ item, onClose }: { readonly item: NavItem; readonly onClose: () => void }) {
  return (
    <div className="p-3 flex flex-col gap-1.5">
      {item.children!.map((child) => (
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
            else onClose();
          }}
        >
          {child.label}
        </Link>
      ))}
    </div>
  );
}

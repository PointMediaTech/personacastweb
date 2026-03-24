'use client';

import { useState } from 'react';
import Link from 'next/link';
import { footerColumns } from './footerData';
import { SEO_CONFIG } from '../../lib/seo-config';
import { ArrowRight } from 'lucide-react';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-300 text-slate-400 ${open ? 'rotate-180 text-brand-teal' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function AccordionColumn({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden border-b border-white/[0.04]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left group"
      >
        <span className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${open ? 'text-brand-teal' : 'text-slate-300 group-hover:text-white'}`}>
          {title}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2 pb-4">{children}</div>
      </div>
    </div>
  );
}

function LinkList({ links }: { links: typeof footerColumns[number]['links'] }) {
  return (
    <ul className="space-y-2 lg:space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          {link.disabled ? (
            <span
              className="text-sm text-slate-600 cursor-not-allowed flex items-center gap-2 font-medium"
              aria-disabled="true"
            >
              {link.label}
              <span className="text-xs uppercase font-bold tracking-widest px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02] text-slate-500">
                SOON
              </span>
            </span>
          ) : (
            <Link
              href={link.href}
              className="text-sm text-slate-400 hover:text-brand-teal transition-colors duration-300 inline-flex items-center group font-medium"
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-teal/40 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

const socialLinks = [
  { icon: <TwitterIcon />, href: SEO_CONFIG.socialLinks.twitter, label: 'Twitter' },
  { icon: <LinkedInIcon />, href: SEO_CONFIG.socialLinks.linkedin, label: 'LinkedIn' },
];

export function FooterSection() {
  return (
    <footer className="relative bg-[#060A14] overflow-hidden mt-20 border-t border-white/[0.04]">
      {/* Decorative top glow sweeping border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-teal/20 to-transparent"></div>
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#769EDB]/5 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-teal/[0.02] blur-[100px] pointer-events-none rounded-full"></div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 2xl:px-16 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8 xl:gap-16">
          
          {/* Brand & CTA column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-8">
            <Link href="/" className="inline-block flex-shrink-0 mb-6 group" aria-label="PersonaCast">
              <span 
                className="text-3xl font-semibold text-slate-200 tracking-tight transition-colors group-hover:text-white" 
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                Persona
              </span>
              <span 
                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-[#769EDB]" 
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                Cast
              </span>
            </Link>
            
            <p className="text-slate-400 leading-relaxed text-sm mb-6">
              領先 72 小時的 AI 戰略預演。<br />
              <span className="text-slate-300 font-medium">在輿論定型前，拿回劇本掌控權。</span>
            </p>
            
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300"
            >
              <div className="absolute inset-0 w-full h-full rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-teal/40 group-hover:bg-brand-teal/10 transition-all duration-300 shadow-[0_0_0_rgba(0,224,194,0)] group-hover:shadow-[0_0_20px_rgba(0,224,194,0.15)] backdrop-blur-sm"></div>
              <span className="relative flex items-center gap-2">
                預約演示
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-teal group-hover:translate-x-1 transition-all duration-300" />
              </span>
            </Link>
          </div>

          {/* Desktop Links: 4-column grid */}
          <div className="hidden lg:grid lg:col-span-4 lg:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4 opacity-90">
                  {col.title}
                </h3>
                <LinkList links={col.links} />
              </div>
            ))}
          </div>

          {/* Mobile Links: accordion */}
          <div className="lg:hidden w-full mt-2">
            {footerColumns.map((col) => (
              <AccordionColumn key={col.title} title={col.title}>
                <LinkList links={col.links} />
              </AccordionColumn>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.04] bg-[#060A14]/60 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 2xl:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 order-2 md:order-1 font-medium">
            &copy; {new Date().getFullYear()} PersonaCast Inc. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 md:order-2">
            <div className="flex items-center gap-6">
              <Link
                href="/legal/privacy"
                className="text-xs font-medium text-slate-500 hover:text-[#769EDB] transition-colors duration-300"
              >
                隱私權政策
              </Link>
              <span className="text-slate-800">|</span>
              <Link
                href="/legal/terms"
                className="text-xs font-medium text-slate-500 hover:text-[#769EDB] transition-colors duration-300"
              >
                服務條款
              </Link>
            </div>

            <div className="hidden sm:block w-px h-4 bg-slate-800"></div>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.05] text-slate-400 hover:bg-brand-teal/10 hover:text-brand-teal hover:border-brand-teal/30 transition-all duration-300 group"
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

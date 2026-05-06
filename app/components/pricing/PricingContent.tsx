'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

const DEMO_HREF = 'https://calendly.com/personacast/demo';

function useReveal(margin = '-80px') {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const reveal = (delay = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });
  return { ref, reveal };
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export function PricingHero() {
  return (
    <section
      aria-label="定價方案"
      style={{
        background: '#0B1526',
        backgroundImage:
          'radial-gradient(ellipse 55% 45% at 75% 35%, rgba(0,95,163,.16) 0%, transparent 60%)',
        padding: 'clamp(100px,14vh,160px) clamp(2rem,5vw,6rem) clamp(80px,10vh,120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        className="font-heading"
        style={{
          position: 'absolute',
          right: '-0.03em',
          bottom: '-0.12em',
          fontSize: 'clamp(140px,18vw,280px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,.022)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        PRICING
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span
          className="font-mono block uppercase"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.68)', marginBottom: '1.5rem' }}
        >
          定價方案
        </span>
        <h1
          className="font-heading hero-anim-0"
          style={{
            fontSize: 'clamp(2.4rem,5vw,5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            color: '#fff',
            maxWidth: 680,
            marginBottom: '1.25rem',
          }}
        >
          選擇您的<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.9)' }}>戰略引擎</em>
        </h1>
        <p
          className="font-body hero-anim-1"
          style={{
            fontSize: 'clamp(14.5px,1.7vw,17px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,.76)',
            lineHeight: 1.85,
            maxWidth: 520,
          }}
        >
          從免費驗證到企業級無限算力。每一個方案都以「72 小時戰略先機」為核心，
          讓您在關鍵時刻做出帶著完整情報的決策。
        </p>
      </div>
    </section>
  );
}

/* ── Pricing Cards ────────────────────────────────────────────────── */

const PLANS_MONTHLY = [
  {
    id: 'insight',
    name: '洞察版 Insight',
    badge: null,
    price: '免費開始',
    priceSuffix: '',
    originalPrice: null,
    audience: '適合評估 AI 導入的團隊，零成本驗證「輿情預判」的真實威力。',
    valueProposition: '親眼見證輿論走向如何被精準預見的第一步。',
    features: [
      '每月 50 次高精度推演',
      '最多 5 個核心 AI 人格',
      '30 天推演歷史保留',
      '基礎 CSV 數據匯出',
      '社群支援',
    ],
    commitment: '免綁卡，30 秒完成註冊',
    cta: { label: '建立免費帳戶 →', href: '/signup' },
    highlighted: false,
  },
  {
    id: 'foresight',
    name: '預判版 Foresight',
    badge: '最受歡迎',
    price: 'NT$ 29,900',
    priceSuffix: '/ 月',
    originalPrice: null,
    audience: '適合常態高壓的品牌策略室，把輿情推演升級為每日標準工作流。',
    valueProposition: '從被動「偶爾模擬」進階到主動「持續掌局」。',
    features: [
      '每月 300 次深層推演',
      '最多 30 個高擬真 AI 人格',
      '完整 1 年推演歷史保留',
      'CSV + API 雙軌數據匯出',
      '優先技術支援 (SLA 保障)',
      'SSO / SAML 單一登入',
    ],
    commitment: '按月計費，隨時可取消',
    cta: { label: '免費試用 14 天', href: '/signup' },
    highlighted: true,
  },
  {
    id: 'command',
    name: '指揮版 Command',
    badge: null,
    price: '企業客製報價',
    priceSuffix: '',
    originalPrice: null,
    audience: '適合跨國企業與集團核心，要求資料絕對保密與無限算力。',
    valueProposition: '集團專屬的戰略神經中樞，從 CEO 到前線公關資訊零落差。',
    features: [
      '無限推演次數，無峰值限制',
      '無上限客製化 AI 人格數量',
      '永久推演歷史保留',
      '全格式匯出 + 私有雲部署',
      '專屬戰略顧問與客戶成功經理',
      '客製化整合與企業級 SLA',
    ],
    commitment: '專人評估與私有雲架構設計',
    cta: { label: '聯繫專屬戰略顧問', href: '/contact' },
    highlighted: false,
  },
] as const;

function getPricingPlans(isAnnual: boolean): PlanWithOriginalPrice[] {
  return PLANS_MONTHLY.map((plan) => {
    if (plan.id === 'foresight' && isAnnual) {
      return { ...plan, price: 'NT$ 23,920', originalPrice: 'NT$ 29,900' };
    }
    return { ...plan };
  });
}

export function PricingCardsSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = getPricingPlans(isAnnual);
  const { ref, reveal } = useReveal('-60px');

  return (
    <section
      ref={ref}
      id="pricing-cards"
      aria-label="方案選擇"
      style={{
        background: '#0B1526',
        padding: 'clamp(70px,9vh,110px) clamp(2rem,5vw,6rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Billing toggle */}
        <div style={{ ...reveal(0), display: 'flex', justifyContent: 'center', marginBottom: '3rem', gap: '1.25rem', alignItems: 'center' }}>
          <button
            onClick={() => setIsAnnual(false)}
            className="font-body"
            style={{ fontSize: 14, fontWeight: isAnnual ? 300 : 600, color: isAnnual ? 'rgba(255,255,255,.65)' : '#fff', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            月繳
          </button>
          <button
            onClick={() => setIsAnnual((v) => !v)}
            aria-label="切換月繳/年繳"
            style={{
              position: 'relative',
              width: 48,
              height: 26,
              borderRadius: 13,
              background: isAnnual ? 'rgba(0,218,186,.85)' : 'rgba(255,255,255,.08)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.25s',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: isAnnual ? 22 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: isAnnual ? '#0B1526' : '#fff',
                transition: 'left 0.25s',
                boxShadow: '0 1px 4px rgba(0,0,0,.2)',
              }}
            />
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className="font-body"
            style={{ fontSize: 14, fontWeight: isAnnual ? 600 : 300, color: isAnnual ? '#fff' : 'rgba(255,255,255,.65)', cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            年繳
            <span
              className="font-mono"
              style={{
                fontSize: 10.5,
                letterSpacing: '0.1em',
                padding: '2px 6px',
                background: isAnnual ? 'rgba(0,218,186,.15)' : 'rgba(255,255,255,.06)',
                color: isAnnual ? 'rgba(0,218,186,.85)' : 'rgba(255,255,255,.65)',
                borderRadius: 2,
                textTransform: 'uppercase',
              }}
            >
              省 20%
            </span>
          </button>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'rgba(255,255,255,.06)',
          }}
        >
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              style={reveal(0.1 + i * 0.08)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PlanWithOriginalPrice {
  id: string;
  name: string;
  badge: string | null;
  price: string;
  priceSuffix: string;
  originalPrice: string | null;
  audience: string;
  valueProposition: string;
  features: readonly string[];
  commitment: string;
  cta: { label: string; href: string };
  highlighted: boolean;
}

function PricingCard({
  plan,
  style,
}: {
  plan: PlanWithOriginalPrice;
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...style,
        background: plan.highlighted ? 'rgba(0,218,186,.06)' : 'rgba(255,255,255,.04)',
        padding: '2.25rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderTop: plan.highlighted ? '3px solid rgba(0,218,186,.8)' : '3px solid transparent',
        border: plan.highlighted ? '1px solid rgba(0,218,186,.2)' : undefined,
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <span
          className="font-mono uppercase"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.5rem',
            fontSize: 10,
            letterSpacing: '0.15em',
            padding: '3px 7px',
            background: 'rgba(0,218,186,.12)',
            color: 'rgba(0,170,148,.9)',
            borderRadius: 2,
          }}
        >
          {plan.badge}
        </span>
      )}

      {/* Plan name */}
      <span
        className="font-mono block uppercase"
        style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.65)', marginBottom: '0.75rem' }}
      >
        {plan.name}
      </span>

      {/* Audience */}
      <p
        className="font-body"
        style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,.76)', lineHeight: 1.75, marginBottom: '1.5rem', minHeight: 52 }}
      >
        {plan.audience}
      </p>

      {/* Price */}
      <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        {plan.originalPrice && (
          <div style={{ marginBottom: '0.3rem' }}>
            <span className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,.65)', textDecoration: 'line-through' }}>
              {plan.originalPrice}
            </span>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: '0.1em', color: '#007A72', marginLeft: 8, padding: '1px 5px', background: 'rgba(0,122,114,.1)', borderRadius: 2 }}
            >
              年繳省 20%
            </span>
          </div>
        )}
        <div className="font-heading" style={{ fontSize: plan.price.includes('NT$') ? '2rem' : '1.45rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {plan.price}
          {plan.priceSuffix && (
            <span className="font-body" style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,.65)', marginLeft: 4 }}>
              {plan.priceSuffix}
            </span>
          )}
        </div>
        {plan.commitment && (
          <p className="font-body" style={{ fontSize: 11.5, color: 'rgba(255,255,255,.65)', marginTop: '0.4rem', fontWeight: 300 }}>
            {plan.commitment}
          </p>
        )}
      </div>

      {/* CTA */}
      <Link
        href={plan.cta.href}
        className="inline-flex items-center justify-center font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
        style={{
          padding: '12px 20px',
          background: plan.highlighted ? 'rgba(0,218,186,.85)' : 'transparent',
          color: plan.highlighted ? '#0B1526' : 'rgba(0,218,186,.85)',
          fontSize: 13,
          letterSpacing: '0.01em',
          border: plan.highlighted ? 'none' : '1px solid rgba(0,218,186,.35)',
          marginBottom: '1.75rem',
          display: 'block',
          textAlign: 'center',
        }}
      >
        {plan.cta.label}
      </Link>

      {/* Features */}
      <p className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,.65)', marginBottom: '0.75rem' }}>
        包含以下功能
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 font-body" style={{ fontSize: 13, color: 'rgba(255,255,255,.76)', lineHeight: 1.65, fontWeight: 300 }}>
            <span style={{ color: 'rgba(0,218,186,.82)', fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Trust Stats ──────────────────────────────────────────────────── */
const TRUST_STATS = [
  { num: '200', sup: '+', label: '企業與政府客戶' },
  { num: '94', sup: '%', label: '推演趨勢準確率' },
  { num: '10', sup: '×', label: '比事後應對快的反應速度' },
  { num: '3', sup: 'M+', label: '累計推演次數' },
];

export function PricingTrustSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="pricing-trust"
      aria-label="信任指標"
      style={{
        background: '#EEF3FB',
        padding: 'clamp(60px,8vh,90px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: '#D0DCF0',
          }}
        >
          {TRUST_STATS.map((stat, i) => (
            <div
              key={stat.num}
              style={{
                ...reveal(i * 0.07),
                background: '#fff',
                padding: '1.75rem clamp(1rem,2vw,2rem)',
                textAlign: 'center',
              }}
            >
              <div
                className="font-heading"
                style={{ fontSize: '2.4rem', fontWeight: 800, color: '#020617', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {stat.num}
                <sup style={{ fontSize: '1rem', fontWeight: 700, verticalAlign: 'super', marginLeft: 2, color: '#00838A' }}>
                  {stat.sup}
                </sup>
              </div>
              <div className="font-body" style={{ fontSize: 12.5, color: '#4A5A72', marginTop: '0.5rem', fontWeight: 300, lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ ...reveal(0.28), marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['SOC 2 Type II 認證', 'AES-256 加密', 'GDPR 合規', '私有部署可選', '99.9% SLA'].map((badge) => (
            <span
              key={badge}
              className="font-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.15em',
                padding: '4px 10px',
                border: '1px solid rgba(0,60,120,.15)',
                color: '#4A5A72',
                borderRadius: 2,
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: '我們的資料安全嗎？推演內容會不會被用來訓練 AI？',
    a: '絕對不會。每個客戶的推演數據完全獨立儲存，零交叉存取。您注入的議題、推演結果和策略建議，絕不會被用於訓練任何 AI 模型——這是寫在合約裡的法律義務。所有數據採用 AES-256 加密，企業版客戶可選擇私有雲部署，數據完全不離開您的基礎設施。',
  },
  {
    q: '推演結果的準確度如何驗證？',
    a: '三層驗證機制：① 交叉推演收斂性——同一議題多輪獨立推演，結果收斂時信心指數上升。② 歷史回測——持續以真實輿論事件驗證推演，整體趨勢準確率達 94%。③ 信心指數透明化——每項預測附帶推演依據，讓您自己判斷而非盲目相信數字。',
  },
  {
    q: 'PersonaCast 的 AI 人格是怎麼建構的？',
    a: '每個人格由多維度參數定義——包括價值觀體系、知識背景、情緒傾向、資訊接收管道、社會網絡位置等。基於大規模社會行為數據訓練，能展現真實人群在面對特定議題時的反應分布。這不是「預測某個人會說什麼」，而是「精確模擬這類人群最可能的反應趨勢」——這正是策略決策所需要的。',
  },
];

export function PricingFAQSection() {
  const { ref, reveal } = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="pricing-faq"
      aria-label="常見問題"
      style={{
        background: '#0B1526',
        padding: 'clamp(70px,9vh,110px) clamp(2rem,5vw,6rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <span
          className="font-mono block uppercase"
          style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.9)', marginBottom: '0.75rem' }}
        >
          常見問題
        </span>
        <h2
          className="font-heading"
          style={{
            ...reveal(0.08),
            fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#fff',
            marginBottom: '2.5rem',
          }}
        >
          您可能想知道的<em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>一切</em>
        </h2>

        <div style={reveal(0.15)}>
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: '1px solid rgba(255,255,255,.08)',
                borderBottom: i === FAQ_ITEMS.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="font-body font-semibold"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.25rem 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 15,
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                {item.q}
                <span
                  style={{
                    fontSize: 18,
                    color: 'rgba(0,218,186,.85)',
                    flexShrink: 0,
                    transform: openIdx === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.2s',
                    lineHeight: 1,
                    marginTop: 2,
                  }}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <p
                  className="font-body"
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,.76)',
                    lineHeight: 1.85,
                    paddingBottom: '1.25rem',
                    paddingRight: '2rem',
                  }}
                >
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing CTA ──────────────────────────────────────────────────── */
export function PricingCTASection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="pricing-cta"
      aria-label="行動召喚"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <span
          className="font-mono block uppercase"
          style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.65)', marginBottom: '1.5rem' }}
        >
          開始之前
        </span>
        <h2
          className="font-heading"
          style={{
            ...reveal(0.1),
            fontSize: 'clamp(2rem,3.5vw,3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.25rem',
          }}
        >
          30 分鐘，我們幫您找到<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.92)' }}>最值錢的那個選擇</em>
        </h2>
        <p
          className="font-body"
          style={{
            ...reveal(0.2),
            fontSize: 14.5,
            fontWeight: 300,
            color: 'rgba(255,255,255,.76)',
            lineHeight: 1.85,
            marginBottom: '2rem',
          }}
        >
          免費諮詢不是銷售電話。我們會先聽您的場景，再告訴您哪個方案真的值得您的預算。
          沒有壓力，只有誠實的建議。
        </p>
        <div className="flex items-center justify-center gap-3" style={reveal(0.28)}>
          <a
            href={DEMO_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
            style={{ padding: '13px 28px', background: '#fff', color: '#0B1526', fontSize: 13.5, letterSpacing: '0.01em' }}
          >
            預約免費諮詢 →
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
            style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,.28)', color: 'rgba(255,255,255,.68)', fontSize: 13.5 }}
          >
            聯繫銷售團隊
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '聯絡我們 & 預約 Demo',
  description:
    '預約 PersonaCast 一對一產品演示，或聯繫我們的團隊討論您的輿情預判需求。我們通常在 24 小時內回覆。',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: '聯絡我們 & 預約 Demo | PersonaCast',
    description:
      '預約 PersonaCast 一對一產品演示，或聯繫我們的團隊討論您的輿情預判需求。',
    url: '/contact',
  },
};

const roleOptions = [
  '公關/行銷',
  '企業高管',
  '政治顧問',
  '政策研究',
  '其他',
] as const;

const scenarioOptions = [
  '公關危機預判',
  '品牌聲譽管理',
  '政治議題推演',
  '政策輿論模擬',
  '其他',
] as const;

const contactInfo = [
  {
    icon: <Mail size={20} />,
    label: '電子郵件',
    value: 'contact@personacast.ai',
  },
  {
    icon: <MessageCircle size={20} />,
    label: '社群媒體',
    value: 'LinkedIn / X',
  },
  {
    icon: <MapPin size={20} />,
    label: '辦公室',
    value: '台北市（詳細地址即將公布）',
  },
] as const;

function ContactForm() {
  const inputClass =
    'w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#94A3B8]/60 outline-none';
  const inputStyle = {
    backgroundColor: 'rgba(10,14,26,0.6)',
    border: '1px solid rgba(118,158,219,0.15)',
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'rgba(17,24,39,0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(118,158,219,0.1)',
      }}
    >
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, #769EDB, transparent)',
        }}
      />
      <div className="p-6 lg:p-8">
        <div className="space-y-4">
          {/* Row: Name + Company */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                姓名 <span className="text-[#B57D7D]">*</span>
              </label>
              <input
                type="text"
                placeholder="您的姓名"
                className={inputClass}
                style={inputStyle}
                readOnly
                aria-label="姓名"
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                公司名稱 <span className="text-[#B57D7D]">*</span>
              </label>
              <input
                type="text"
                placeholder="公司名稱"
                className={inputClass}
                style={inputStyle}
                readOnly
                aria-label="公司名稱"
              />
            </div>
          </div>

          {/* Row: Title + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                職稱
              </label>
              <input
                type="text"
                placeholder="您的職稱"
                className={inputClass}
                style={inputStyle}
                readOnly
                aria-label="職稱"
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                公司信箱 <span className="text-[#B57D7D]">*</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className={inputClass}
                style={inputStyle}
                readOnly
                aria-label="公司信箱"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs text-[#94A3B8] mb-1.5">
              電話（選填）
            </label>
            <input
              type="tel"
              placeholder="聯絡電話"
              className={inputClass}
              style={inputStyle}
              readOnly
              aria-label="電話"
            />
          </div>

          {/* Row: Role + Scenario Selects */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                您的角色
              </label>
              <select
                className={inputClass}
                style={inputStyle}
                disabled
                aria-label="您的角色"
                defaultValue=""
              >
                <option value="" disabled>
                  請選擇
                </option>
                {roleOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                最感興趣的場景
              </label>
              <select
                className={inputClass}
                style={inputStyle}
                disabled
                aria-label="最感興趣的場景"
                defaultValue=""
              >
                <option value="" disabled>
                  請選擇
                </option>
                {scenarioOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-xs text-[#94A3B8] mb-1.5">
              備註（選填）
            </label>
            <textarea
              rows={4}
              placeholder="請描述您的需求或想了解的內容..."
              className={`${inputClass} resize-none`}
              style={inputStyle}
              readOnly
              aria-label="備註"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full py-3.5 rounded-lg font-semibold text-white text-sm cursor-default transition-all duration-300"
            style={{
              backgroundColor: '#769EDB',
              boxShadow: '0 0 20px rgba(118,158,219,0.25)',
            }}
          >
            送出預約申請 →
          </button>

          <p className="text-xs text-[#94A3B8]/70 text-center">
            我們通常在 1 個工作天內回覆。您的資料將受到嚴格的隱私保護。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        layout="split"
        h1="讓我們為您預演一場輿論戰。"
        h2="預約一對一 Demo，我們的團隊將根據您的真實場景，現場演示 PersonaCast 的推演能力。不是罐頭簡報——是用您的議題，跑您的推演。"
        rightContent={<ContactForm />}
      />

      {/* Contact Info Cards */}
      <ContentSection>
        <div className="grid sm:grid-cols-3 gap-6">
          {contactInfo.map((info, i) => (
            <ScrollReveal key={info.label} delay={i * 0.1}>
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  backgroundColor: 'rgba(17,24,39,0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(118,158,219,0.08)',
                }}
              >
                <div
                  className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: 'rgba(118,158,219,0.12)',
                    color: '#769EDB',
                  }}
                >
                  {info.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {info.label}
                </h3>
                <p className="text-xs text-[#94A3B8]">{info.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>
    </>
  );
}

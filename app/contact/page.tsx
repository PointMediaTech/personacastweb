import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';
import { ContactForm } from './ContactForm';

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

export default function ContactPage() {
  return (
    <>
      <PageHero
        layout="split"
        h1="讓我們為您預演一場輿論戰。"
        h2="預約一對一 Demo，我們的團隊將根據您的真實場景，現場演示 PersonaCast 的推演能力。不是罐頭簡報——是用您的議題，跑您的推演。"
        rightContent={<ContactForm />}
      />

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

'use client';

import { useState } from 'react';

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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

interface FormState {
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  role: string;
  scenario: string;
  notes: string;
}

const initialState: FormState = {
  name: '',
  company: '',
  title: '',
  email: '',
  phone: '',
  role: '',
  scenario: '',
  notes: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      setStatus('error');
      setErrorMsg('表單服務尚未設定，請稍後再試或直接來信 contact@personacast.ai');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[PersonaCast Demo 預約] ${form.company || form.name}`,
          from_name: 'PersonaCast 官網表單',
          name: form.name,
          email: form.email,
          company: form.company,
          title: form.title,
          phone: form.phone,
          role: form.role,
          scenario: form.scenario,
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(initialState);
      } else {
        setStatus('error');
        setErrorMsg(data.message || '送出失敗，請稍後再試');
      }
    } catch {
      setStatus('error');
      setErrorMsg('網路連線失敗，請稍後再試');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#94A3B8]/60 outline-none focus:border-[color:var(--color-aurora-cyan)] transition-colors disabled:opacity-60';
  const inputStyle = {
    backgroundColor: 'rgba(10,14,26,0.6)',
    border: '1px solid rgba(118,158,219,0.15)',
  } as const;
  const submitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div
        className="rounded-xl overflow-hidden p-8 lg:p-10 text-center"
        style={{
          backgroundColor: 'rgba(17,24,39,0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,242,255,0.25)',
        }}
      >
        <div
          className="h-[2px] w-full mb-8"
          style={{
            background:
              'linear-gradient(90deg, transparent, #00F2FF, transparent)',
          }}
        />
        <h3 className="text-xl font-bold text-white mb-3">已收到您的預約申請</h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          感謝您的來信。我們的團隊將在 1 個工作天內與您聯繫，
          <br />
          安排一對一 Demo 時間。
        </p>
      </div>
    );
  }

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
      <form onSubmit={handleSubmit} className="p-6 lg:p-8">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                姓名 <span className="text-[#B57D7D]">*</span>
              </label>
              <input
                type="text"
                required
                disabled={submitting}
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="您的姓名"
                className={inputClass}
                style={inputStyle}
                aria-label="姓名"
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                公司名稱 <span className="text-[#B57D7D]">*</span>
              </label>
              <input
                type="text"
                required
                disabled={submitting}
                value={form.company}
                onChange={(e) => update('company', e.target.value)}
                placeholder="公司名稱"
                className={inputClass}
                style={inputStyle}
                aria-label="公司名稱"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                職稱
              </label>
              <input
                type="text"
                disabled={submitting}
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="您的職稱"
                className={inputClass}
                style={inputStyle}
                aria-label="職稱"
              />
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                公司信箱 <span className="text-[#B57D7D]">*</span>
              </label>
              <input
                type="email"
                required
                disabled={submitting}
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="name@company.com"
                className={inputClass}
                style={inputStyle}
                aria-label="公司信箱"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1.5">
              電話（選填）
            </label>
            <input
              type="tel"
              disabled={submitting}
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="聯絡電話"
              className={inputClass}
              style={inputStyle}
              aria-label="電話"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1.5">
                您的角色
              </label>
              <select
                className={inputClass}
                style={inputStyle}
                aria-label="您的角色"
                disabled={submitting}
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
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
                aria-label="最感興趣的場景"
                disabled={submitting}
                value={form.scenario}
                onChange={(e) => update('scenario', e.target.value)}
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

          <div>
            <label className="block text-xs text-[#94A3B8] mb-1.5">
              備註（選填）
            </label>
            <textarea
              rows={4}
              disabled={submitting}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="請描述您的需求或想了解的內容..."
              className={`${inputClass} resize-none`}
              style={inputStyle}
              aria-label="備註"
            />
          </div>

          {status === 'error' && (
            <p
              className="text-xs text-center px-3 py-2 rounded-lg"
              style={{
                color: '#FF8A8A',
                backgroundColor: 'rgba(255,77,77,0.08)',
                border: '1px solid rgba(255,77,77,0.25)',
              }}
            >
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#769EDB',
              boxShadow: '0 0 20px rgba(118,158,219,0.25)',
            }}
          >
            {submitting ? '送出中...' : '送出預約申請 →'}
          </button>

          <p className="text-xs text-[#94A3B8]/70 text-center">
            我們通常在 1 個工作天內回覆。您的資料將受到嚴格的隱私保護。
          </p>
        </div>
      </form>
    </div>
  );
}

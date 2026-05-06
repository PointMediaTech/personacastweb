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

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(255,255,255,.07)',
  border: '1px solid rgba(255,255,255,.15)',
  borderRadius: 2,
  fontSize: 13.5,
  color: 'rgba(255,255,255,.88)',
  outline: 'none',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 500,
  color: 'rgba(255,255,255,.68)',
  marginBottom: '0.4rem',
  letterSpacing: '0.01em',
};

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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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

  const submitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div
        style={{
          background: 'rgba(0,218,186,.06)',
          border: '1px solid rgba(0,218,186,.25)',
          borderRadius: 2,
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        <div
          className="font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(0,218,186,.8)', marginBottom: '1rem' }}
        >
          已收到您的申請
        </div>
        <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          感謝您的預約
        </h3>
        <p className="font-body" style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,.76)', lineHeight: 1.85 }}>
          我們的團隊將在 1 個工作天內與您聯繫，<br />
          安排一對一演示時間。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={labelStyle}>姓名 <span style={{ color: '#C0392B' }}>*</span></label>
          <input
            type="text"
            required
            disabled={submitting}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="您的姓名"
            style={fieldStyle}
            aria-label="姓名"
          />
        </div>
        <div>
          <label style={labelStyle}>公司名稱 <span style={{ color: '#C0392B' }}>*</span></label>
          <input
            type="text"
            required
            disabled={submitting}
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="公司名稱"
            style={fieldStyle}
            aria-label="公司名稱"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={labelStyle}>職稱</label>
          <input
            type="text"
            disabled={submitting}
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="您的職稱"
            style={fieldStyle}
            aria-label="職稱"
          />
        </div>
        <div>
          <label style={labelStyle}>公司信箱 <span style={{ color: '#C0392B' }}>*</span></label>
          <input
            type="email"
            required
            disabled={submitting}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="name@company.com"
            style={fieldStyle}
            aria-label="公司信箱"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>電話（選填）</label>
        <input
          type="tel"
          disabled={submitting}
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="聯絡電話"
          style={fieldStyle}
          aria-label="電話"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label style={labelStyle}>您的角色</label>
          <select
            disabled={submitting}
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            style={{ ...fieldStyle, cursor: 'pointer' }}
            aria-label="您的角色"
          >
            <option value="" disabled>請選擇</option>
            {roleOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>最感興趣的場景</label>
          <select
            disabled={submitting}
            value={form.scenario}
            onChange={(e) => update('scenario', e.target.value)}
            style={{ ...fieldStyle, cursor: 'pointer' }}
            aria-label="最感興趣的場景"
          >
            <option value="" disabled>請選擇</option>
            {scenarioOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>備註（選填）</label>
        <textarea
          rows={4}
          disabled={submitting}
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="請描述您的需求或想了解的內容..."
          style={{ ...fieldStyle, resize: 'none' }}
          aria-label="備註"
        />
      </div>

      {status === 'error' && (
        <p
          className="font-body"
          style={{ fontSize: 12.5, color: '#C0392B', background: 'rgba(192,57,43,.06)', border: '1px solid rgba(192,57,43,.2)', borderRadius: 2, padding: '8px 12px' }}
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          padding: '13px 28px',
          background: 'rgba(0,218,186,.85)',
          color: '#0B1526',
          fontSize: 13.5,
          letterSpacing: '0.01em',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {submitting ? '送出中...' : '送出預約申請 →'}
      </button>

      <p className="font-body" style={{ fontSize: 11.5, color: 'rgba(255,255,255,.58)', textAlign: 'center', fontWeight: 300 }}>
        我們通常在 1 個工作天內回覆。您的資料將受到嚴格的隱私保護。
      </p>
    </form>
  );
}

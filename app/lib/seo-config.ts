// app/lib/seo-config.ts

export const SEO_CONFIG = {
  baseUrl: 'https://www.personacast.ai',
  siteName: 'PersonaCast',
  defaultLocale: 'zh-TW' as const,

  brandDescription: {
    'zh-TW': '領先 72 小時的 AI 戰略預演。從人格建模到場景推演，PersonaCast 在關鍵決策發出前模擬公眾輿論走向，讓每一步都有數據支撐。',
    en: 'AI-powered strategic foresight platform. From persona modeling to scenario simulation, PersonaCast forecasts public sentiment before critical decisions are made.',
  },

  socialLinks: {
    twitter: 'https://twitter.com/personacast',
    linkedin: 'https://linkedin.com/company/personacast',
    github: 'https://github.com/personacast',
  },

  defaultKeywords: [
    // 中文
    'AI戰略推演', 'AI輿情分析', '人格建模', '場景推演', '戰略預演平台',
    '公眾輿論模擬', 'AI決策支援', '危機管理AI',
    // English
    'AI strategy simulation', 'AI sentiment analysis', 'persona modeling',
    'scenario simulation', 'strategic foresight platform',
    'public opinion forecasting', 'AI decision support', 'crisis management AI',
  ],

  features: [
    {
      name: 'PersonaLab',
      description: '人格建模引擎 — 建構精準的利害關係人數位分身，預測其行為與反應模式。',
    },
    {
      name: 'Strategy Graph',
      description: '戰略情報圖譜 — 視覺化呈現複雜的利害關係網絡與影響力路徑。',
    },
    {
      name: 'Casting Arena',
      description: '場景推演沙盤 — 在安全的模擬環境中測試不同決策方案的輿論影響。',
    },
  ],
} as const;

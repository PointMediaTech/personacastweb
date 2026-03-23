import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/shared/Navbar";
import { MinimalFooter } from "./components/footer/MinimalFooter";
import { FooterSection } from "./components/footer/FooterSection";
import { SEO_CONFIG } from './lib/seo-config';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-gf-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-gf-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gf-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: 'PersonaCast — AI 戰略推演平台',
    template: '%s | PersonaCast',
  },
  description: SEO_CONFIG.brandDescription['zh-TW'],
  keywords: [...SEO_CONFIG.defaultKeywords],
  authors: [{ name: SEO_CONFIG.siteName }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PersonaCast — AI 戰略推演平台',
    description: '領先 72 小時的 AI 戰略預演。掌握變數，定義結局。',
    type: 'website',
    locale: 'zh_TW',
    siteName: SEO_CONFIG.siteName,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PersonaCast — AI 戰略推演平台',
    description: '領先 72 小時的 AI 戰略預演。掌握變數，定義結局。',
    creator: '@personacast',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/point_ico.ico',
    apple: '/PersonaCast_Logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-Hant"
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-gf-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
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
  title: "PersonaCast — AI 戰略推演平台",
  description: "領先 72 小時的 AI 戰略預演。從人格建模到場景推演，PersonaCast 在關鍵決策發出前模擬公眾輿論走向，讓每一步都有數據支撐。",
  icons: {
    icon: "/point_ico.ico",
  },
  openGraph: {
    title: "PersonaCast — AI 戰略推演平台",
    description: "領先 72 小時的 AI 戰略預演。掌握變數，定義結局。",
    type: "website",
    locale: 'zh_TW',
  },
  twitter: {
    card: "summary_large_image",
    title: "PersonaCast — AI 戰略推演平台",
    description: "領先 72 小時的 AI 戰略預演。掌握變數，定義結局。",
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
      <body>{children}</body>
    </html>
  );
}

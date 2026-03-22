import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PersonaCast — AI 戰略推演平台",
  description: "PersonaCast — AI 戰略推演平台",
  icons: {
    icon: "/point_ico.ico",
  },
  openGraph: {
    title: "PersonaCast — AI 戰略推演平台",
    description: "PersonaCast — AI 戰略推演平台",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PersonaCast — AI 戰略推演平台",
    description: "PersonaCast — AI 戰略推演平台",
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
    >
      <body>{children}</body>
    </html>
  );
}

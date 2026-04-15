// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'PersonaCast — AI 戰略推演平台';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function OGImage() {
  const fontPath = join(process.cwd(), 'app/fonts/NotoSansTC-Bold.ttf');
  const fontBuffer = await readFile(fontPath);
  // Convert Node.js Buffer to ArrayBuffer for Satori compatibility
  const fontData = fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
          fontFamily: '"Noto Sans TC"',
        }}
      >
        {/* Brand name */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: '#ffffff' }}>
            Persona
          </span>
          <span style={{ fontSize: 56, fontWeight: 700, color: '#00E0C2' }}>
            Cast
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#9ca3af',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          AI 戰略推演平台
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 22,
            color: '#6b7280',
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          領先 72 小時的戰略預演。掌握變數，定義結局。
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 120,
            height: 3,
            background: '#00E0C2',
            marginTop: 40,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Noto Sans TC',
          data: fontData,
          style: 'normal' as const,
          weight: 700 as const,
        },
      ],
    },
  );
}

#!/usr/bin/env node
// scripts/optimize-images.mjs
// 批次轉換 public/ 下的 PNG 圖片為 WebP，並為 Logo 產生多尺寸版本。
// 使用方式：node scripts/optimize-images.mjs

import { readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const WEBP_QUALITY = 82;

const cardImages = [
  'images/01_card.png',
  'images/02_card.png',
  'images/03_card.png',
];

const logoSizes = [
  { size: 512, format: 'png' },
  { size: 192, format: 'png' },
  { size: 180, format: 'png' },
  { size: 512, format: 'webp' },
];

const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function convertCardToWebp(relPath) {
  const absSrc = join(PUBLIC, relPath);
  const absDst = absSrc.replace(/\.png$/i, '.webp');

  if (!existsSync(absSrc)) {
    console.warn(`  ⚠ skip (missing): ${relPath}`);
    return;
  }

  const srcStat = await stat(absSrc);
  const srcBuf = await readFile(absSrc);
  const outBuf = await sharp(srcBuf)
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer();

  await writeFile(absDst, outBuf);
  const saved = ((1 - outBuf.length / srcStat.size) * 100).toFixed(1);
  console.log(
    `  ✓ ${relPath} → ${basename(absDst)}: ${fmt(srcStat.size)} → ${fmt(outBuf.length)} (-${saved}%)`,
  );
}

async function generateLogo({ size, format }) {
  const absSrc = join(PUBLIC, 'PersonaCast_Logo.png');
  const absDst = join(PUBLIC, `PersonaCast_Logo-${size}.${format}`);

  if (!existsSync(absSrc)) {
    console.warn(`  ⚠ skip logo (missing source): PersonaCast_Logo.png`);
    return;
  }

  const srcBuf = await readFile(absSrc);
  const pipeline = sharp(srcBuf).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  const outBuf =
    format === 'webp'
      ? await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer()
      : await pipeline
          .png({ compressionLevel: 9, quality: 90, palette: false })
          .toBuffer();

  await writeFile(absDst, outBuf);
  console.log(`  ✓ logo ${size}x${size} ${format}: ${fmt(outBuf.length)}`);
}

async function main() {
  console.log('🖼  Optimizing pillar card PNGs → WebP');
  for (const rel of cardImages) {
    await convertCardToWebp(rel);
  }

  console.log('\n🏷  Generating multi-size logos');
  if (!existsSync(join(PUBLIC, 'PersonaCast_Logo.png'))) {
    console.error('   ✗ PersonaCast_Logo.png not found; skipping logo pass.');
    return;
  }
  for (const spec of logoSizes) {
    await generateLogo(spec);
  }

  console.log('\n✅ Done.');
}

main().catch((err) => {
  console.error('✗ optimize-images failed:', err);
  process.exit(1);
});

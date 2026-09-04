/**
 * Generates public/og-image.png (1200x630) — the default social share image.
 * Run with: node scripts/generate-og.mjs
 * Swap this for a real branded graphic (e.g. a photo of the shop) when available.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../public/og-image.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0f1a"/>
      <stop offset="1" stop-color="#111a2e"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#0ea5e9" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- sparkle -->
  <path d="M1050 120 l14 36 36 14 -36 14 -14 36 -14 -36 -36 -14 36 -14 Z" fill="#f5b301"/>

  <text x="90" y="250" font-family="Poppins, Arial, sans-serif" font-size="78" font-weight="800" fill="#ffffff">Earl's <tspan fill="#0ea5e9">Proper</tspan> Detailing</text>
  <text x="92" y="320" font-family="Inter, Arial, sans-serif" font-size="34" fill="#cbd5e1">Auto detailing &#183; Ceramic coating &#183; Paint protection</text>
  <text x="92" y="378" font-family="Inter, Arial, sans-serif" font-size="30" fill="#94a3b8">Langhorne, PA &#183; Four-time Best of Bucks winner</text>

  <rect x="90" y="470" width="360" height="70" rx="35" fill="#0ea5e9"/>
  <text x="270" y="515" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff">(215) 791-3015</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);

/**
 * Regenerates public/og-image.png (1200x630) — the social share image —
 * from committed brand assets, so it's reproducible from the repo.
 * Run with: node scripts/generate-og.mjs
 *
 * Also regenerates the favicons from the brand mark.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const logoPath = resolve(root, "src/assets/logo-evans-dark.png");
const photoPath = resolve(root, "src/assets/gallery/evans-detail-black-kia.jpg");
const pub = (f) => resolve(root, "public", f);

const RED = "#fe0000";
const INK = { r: 15, g: 15, b: 15, alpha: 1 };
const PHONE = "267-333-1071";

// ── Favicons: brand car mark (cropped from the wordmark) on an ink square ──
const logoMeta = await sharp(logoPath).metadata();
const markBuf = await sharp(logoPath)
  .extract({
    left: Math.round(logoMeta.width * 0.045),
    top: Math.round(logoMeta.height * 0.06),
    width: Math.round(logoMeta.width * 0.915),
    height: Math.round(logoMeta.height * 0.62),
  })
  .trim({ threshold: 10 })
  .toBuffer();

async function favicon(size) {
  const inner = Math.round(size * 0.86);
  const mark = await sharp(markBuf).resize({ width: inner, fit: "inside" }).toBuffer();
  const mm = await sharp(mark).metadata();
  const radius = Math.round(size * 0.18);
  const roundMask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  );
  const base = await sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: mark, left: Math.round((size - mm.width) / 2), top: Math.round((size - mm.height) / 2) }])
    .png()
    .toBuffer();
  return sharp(base).composite([{ input: roundMask, blend: "dest-in" }]).png().toBuffer();
}
await sharp(await favicon(512)).toFile(pub("favicon-512.png"));
await sharp(await favicon(192)).toFile(pub("favicon-192.png"));
await sharp(await favicon(180)).toFile(pub("apple-touch-icon.png"));
await sharp(await favicon(32)).toFile(pub("favicon-32.png"));

// ── OG image 1200x630 ──────────────────────────────────────────────────────
const OW = 1200, OH = 630;
const photo = await sharp(photoPath)
  .resize({ width: OW, height: OH, fit: "cover", position: "centre" })
  .modulate({ brightness: 0.62, saturation: 0.9 })
  .toBuffer();

const overlay = Buffer.from(`
<svg width="${OW}" height="${OH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0f0f0f" stop-opacity="0.55"/>
      <stop offset="0.55" stop-color="#0f0f0f" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0f0f0f" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${OW}" height="${OH}" fill="url(#g)"/>
  <rect x="0" y="0" width="${OW}" height="8" fill="${RED}"/>
  <rect x="0" y="${OH - 8}" width="${OW}" height="8" fill="${RED}"/>
</svg>`);

const logoForOg = await sharp(logoPath).resize({ width: 620, fit: "inside" }).toBuffer();
const lm = await sharp(logoForOg).metadata();

const textSvg = Buffer.from(`
<svg width="${OW}" height="${OH}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .tag{font-family:'DejaVu Sans','Arial',sans-serif;font-weight:700;fill:#ffffff;letter-spacing:3px}
    .sub{font-family:'DejaVu Sans','Arial',sans-serif;font-weight:700;fill:${RED};letter-spacing:2px}
  </style>
  <text x="600" y="470" text-anchor="middle" class="tag" font-size="34">MOBILE AUTO DETAILING · LOWER BUCKS COUNTY, PA</text>
  <text x="600" y="540" text-anchor="middle" class="sub" font-size="46">TEXT TO BOOK · ${PHONE}</text>
</svg>`);

await sharp(photo)
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logoForOg, left: Math.round((OW - lm.width) / 2), top: 120 },
    { input: textSvg, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(pub("og-image.png"));

console.log("Wrote favicons + public/og-image.png");

# Earl's Proper Detailing — website

A fast, static marketing site for **Earl's Proper Detailing** (Langhorne, PA),
built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
and deployed to SiteGround via GitHub Actions (SFTP).

This project replaces the previous WordPress site.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

Requires Node 20+.

---

## Where to edit content

**Almost everything a non-developer would change lives in one file:**

### `src/consts.ts`
Business name, phone, email, address, hours, service areas, the full **services**
list (with descriptions and prices), **testimonials**, **specials**, navigation,
and SEO defaults. Edit this file and the pages, footer, and JSON-LD schema all
update automatically.

> ⚠️ **Content status.** The current copy is a first-draft reconstruction
> assembled from public listings — the live `earlsdetailing.com` site was not
> reachable from the build environment. Items marked `VERIFY` in `consts.ts`
> (especially **hours of operation** and the **map coordinates**) should be
> confirmed before go-live. See "Pulling the real content" below.

### Pages (`src/pages/`)
- `index.astro` — Home
- `services.astro` — Services
- `specials.astro` — Specials
- `about.astro` — About
- `contact.astro` — Contact (details, hours, map, contact form)
- `404.astro` — Not-found page

### Components (`src/components/`)
`SEO.astro`, `Header.astro`, `Footer.astro`, `Hero.astro`, `ServicesGrid.astro`,
`ServiceCard.astro`, `ServiceIcon.astro`, `Testimonials.astro`, `CTA.astro`,
`Logo.astro`.

---

## Images, logo & branding

The design currently uses a **gradient hero + inline SVG icons** (no external
photos needed), so the site is fast and looks complete without stock imagery.

Swap points when real assets are available:

| What | Where |
| --- | --- |
| **Logo** | `src/components/Logo.astro` (placeholder emblem) and `public/favicon.svg` |
| **Social share image** | `public/og-image.png` (regenerate via `node scripts/generate-og.mjs`, or replace with a real 1200×630 graphic) |
| **Brand colors** | `src/styles/global.css` → the `@theme` block (`--color-ink`, `--color-accent`, `--color-gold`) |
| **Real photos** | Add to `src/assets/`, then use Astro's `<Image />` from `astro:assets` for automatic compression, sizing, and lazy loading |

---

## SEO

- **`src/components/SEO.astro`** — imported by every page via `BaseLayout`. Handles
  unique `<title>` + meta description, Open Graph + Twitter tags, canonical URL,
  and **JSON-LD `LocalBusiness` (`AutoWash`) schema** (name, address, phone, geo,
  hours, area served).
- **Sitemap** — `@astrojs/sitemap` auto-generates `sitemap-index.xml` on every
  build.
- **`public/robots.txt`** — allows crawling and points to the sitemap.

---

## Contact form

The contact form (`src/pages/contact.astro`) needs a form-handling endpoint
because this is a static site. Set `FORM_ENDPOINT` near the top of that file to a
free service such as [Formspree](https://formspree.io) or
[Web3Forms](https://web3forms.com). Until then, the phone and email links work as
a fallback.

---

## Deployment (GitHub Actions → SiteGround)

`.github/workflows/deploy.yml` runs on every push to **`main`**:
checkout → install → `npm run build` → upload `dist/` to SiteGround over **SFTP**.

### Required repository secrets

Add these under **GitHub → Settings → Secrets and variables → Actions → New
repository secret**:

| Secret name | Value |
| --- | --- |
| `SFTP_HOST` | Your SiteGround SFTP hostname or server IP (from Site Tools → Devs → FTP/SFTP, e.g. `giga123.siteground.biz`) |
| `SFTP_USERNAME` | The SFTP account username |
| `SFTP_PASSWORD` | That SFTP account's password |
| `SFTP_REMOTE_PATH` | Absolute path to the web root to publish into (e.g. `/home/customer/www/earlsdetailing.com/public_html`) |
| `SFTP_PORT` | *(optional)* Only add this if port `22` doesn't work — some SiteGround accounts use `18765` |

Nothing sensitive is committed — the workflow reads only from these secrets.

### First deploy & the WordPress transition

Because the current web root still contains WordPress files, note:

1. WordPress's `index.php` can take priority over `index.html`. The included
   `public/.htaccess` sets `DirectoryIndex index.html` to prefer the new static
   homepage, but the cleanest result is to **remove the old WordPress files**
   from the web root (back them up first) or deploy into a clean directory.
2. To have the deploy mirror `dist/` exactly (deleting stale files on the
   server), set `delete_remote_files: true` in the workflow — do this only after
   you've confirmed `SFTP_REMOTE_PATH` points at the right folder, as it is
   destructive.

---

## Project structure

```
├─ .github/workflows/deploy.yml   # CI/CD: build + SFTP deploy to SiteGround
├─ public/                        # copied as-is to the site root
│  ├─ robots.txt
│  ├─ favicon.svg
│  ├─ og-image.png
│  └─ .htaccess
├─ scripts/generate-og.mjs        # regenerates the social share image
├─ src/
│  ├─ consts.ts                   # ← all business content lives here
│  ├─ styles/global.css           # Tailwind theme + base styles
│  ├─ layouts/BaseLayout.astro
│  ├─ components/
│  └─ pages/
├─ astro.config.mjs
└─ package.json
```

# Evans' Detailing — website

A fast, **single-page** static marketing site for **Evans' Detailing** — mobile
auto detailing in Morrisville, PA (serving Lower Bucks County) — built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) and
deployed to SiteGround via GitHub Actions (SFTP).

This project replaces the previous WordPress site.

> 👉 **Just want to update content?** See **[EDITING.md](./EDITING.md)** — a
> plain-English cheat-sheet for common edits (change phone, add a review, add
> a service, swap a photo) using GitHub's browser-based pencil-icon editor. No
> local install needed.

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

## Single-page structure

Everything lives on one page (`src/pages/index.astro`). Each "page" is an
anchored `<section>`, and the nav smooth-scrolls to it:

| Section | Anchor | Component |
| --- | --- | --- |
| Hero | `#hero` | `src/components/Hero.astro` |
| Services | `#services` | `src/components/Services.astro` |
| About | `#about` | `src/components/About.astro` |
| Gallery | `#gallery` | `src/components/Gallery.astro` |
| Reviews | `#reviews` | `src/components/Reviews.astro` |
| Contact | `#contact` | `src/components/Contact.astro` |

Shared chrome: `Header.astro` (sticky nav + mobile menu), `Footer.astro`,
`Logo.astro`, `SEO.astro`, `ServiceIcon.astro`.

---

## Where to edit content

**Almost everything a non-developer would change lives in one file:**

### `src/consts.ts`
Business name, phone, service area, hours, the full **services** list, the
**vehicle types**, the **gallery** list (captions/alt text), **reviews**, and
SEO defaults. Edit this file and the sections, footer, and JSON-LD schema all
update automatically.

- **Phone / text-to-book** — `SITE.phoneDisplay` and `SITE.smsHref`. The whole
  site runs on *text to book*.
- **Service area** — `SERVICE_AREAS` (drives the Contact copy + schema
  `areaServed`).

> ⚠️ **Reviews need real text.** The old site's Reviews section was only
> screenshot images with no text, and Facebook/Google/Yelp couldn't be reached
> from the build environment to pull genuine quotes — so the `REVIEWS` array in
> `consts.ts` is intentionally **empty**, and the Reviews section shows a
> satisfaction-guarantee / "leave us a review" panel instead of any invented
> testimonials. To add real ones, paste quotes into `REVIEWS` in this shape:
> ```ts
> { quote: "Brian did an incredible job on my truck…", author: "First name", source: "Google" }
> ```
> They'll render automatically as cards.

---

## Images, logo & branding

Real work photos were pulled from the old site's media library, renamed, and
run through Astro's `<Image />` component (`astro:assets`) for automatic
WebP conversion, resizing, and lazy loading.

| What | Where |
| --- | --- |
| **Work photos** | `src/assets/gallery/` — referenced by filename in `GALLERY` (`consts.ts`) |
| **Hero / About photos** | imported directly in `Hero.astro` / `About.astro` |
| **Logo** | `src/assets/logo-evans-dark.png` (red/white car + white text, for the dark theme); `logo-evans-red.png` is the all-red light-background variant |
| **Favicons** | `public/favicon-32.png`, `favicon-192.png`, `favicon-512.png`, `apple-touch-icon.png` |
| **Social share image** | `public/og-image.png` (1200×630) |
| **Brand colors** | `src/styles/global.css` → the `@theme` block (`--color-red`, `--color-ink`, `--color-red-muted`, …) |

Regenerate the favicons + OG image from the brand assets any time with:

```bash
node scripts/generate-og.mjs
```

**Photo notes / flags for the owner:**
- All work photos top out at **960×720** (they were the originals in the old
  WordPress library, sourced from Facebook). They look great in the gallery and
  cards; the hero is a touch soft only on very large 4K displays. **Higher-res
  originals would improve the hero** — drop them in `src/assets/` if available.
- The two Unsplash/Pixabay stock shots on the old site (the `erik-mclean` wash
  photo, `matthew-dockery`, `wash-a-car`) were **skipped** — this site uses only
  real client work.
- One old-site photo (`172755597…`) is a candid of Brian at an outdoor event
  (not a car) — left out. Send a proper headshot if you'd like a photo of Brian
  in the About section.
- The old site's `evans_featured.png` share graphic had a **typo in the phone
  number** (…-7071); the new OG image uses the correct **(267) 333-1071**.

---

## SEO

- **`src/components/SEO.astro`** — unique `<title>` + meta description, Open
  Graph + Twitter cards, canonical URL, and **JSON-LD `LocalBusiness`
  (`AutoWash`)** for a mobile / service-area business: founder (Brian Evans),
  founding date (1996), `areaServed` (Lower Bucks County towns), a `GeoCircle`
  service radius, and an offer catalog of services. No street address is
  published (mobile business).
- **Sitemap** — `@astrojs/sitemap` auto-generates `sitemap-index.xml` on build.
- **`public/robots.txt`** — allows crawling and points to the sitemap.

---

## Deployment (GitHub Actions → SiteGround)

`.github/workflows/deploy.yml` runs on every push to **`main`**:
checkout → install → `npm run build` → upload `dist/` to SiteGround over **SFTP**.

### Required repository secrets

This is a **separate site/folder** from the other builds, so it needs its own
secrets in **this** repository (GitHub → Settings → Secrets and variables →
Actions → New repository secret). Create exactly these names:

| Secret name | Value |
| --- | --- |
| `SFTP_HOST` | SiteGround SFTP hostname or server IP (Site Tools → Devs → FTP/SFTP, e.g. `giga123.siteground.biz`) |
| `SFTP_USERNAME` | The SFTP account username |
| `SFTP_PASSWORD` | That SFTP account's password |
| `SFTP_REMOTE_PATH` | Absolute path to **Evans' own web root**, e.g. `/home/customer/www/evansautodetail.com/public_html` |
| `SFTP_PORT` | *(optional)* Only if port `22` doesn't work — some SiteGround accounts use `18765` |

> If Evans' site lives on the **same SiteGround account** as your other sites,
> `SFTP_HOST` / `SFTP_USERNAME` / `SFTP_PASSWORD` may be identical to the other
> repo's — only **`SFTP_REMOTE_PATH`** must point at the Evans folder. If it's a
> **separate** SiteGround account, all four differ. The path secret is what
> keeps this deploy pointed at the right site.

### First deploy & the WordPress transition

Because the current web root still contains WordPress files:

1. `public/.htaccess` sets `DirectoryIndex index.html` so the new static
   homepage is preferred over WordPress's `index.php`. The cleanest result is to
   **remove the old WordPress files** from the web root (back them up first) or
   deploy into a clean directory.
2. To have the deploy mirror `dist/` exactly (deleting stale files on the
   server), set `delete_remote_files: true` in the workflow — do this only after
   confirming `SFTP_REMOTE_PATH` is correct, as it is destructive.

---

## Project structure

```
├─ .github/workflows/deploy.yml   # CI/CD: build + SFTP deploy to SiteGround
├─ public/                        # copied as-is to the site root
│  ├─ robots.txt · .htaccess
│  ├─ favicon-32/192/512.png · apple-touch-icon.png
│  └─ og-image.png
├─ scripts/generate-og.mjs        # regenerates favicons + social share image
├─ src/
│  ├─ consts.ts                   # ← all business content lives here
│  ├─ styles/global.css           # brand theme (@theme) + base styles
│  ├─ layouts/BaseLayout.astro
│  ├─ assets/                     # logos + gallery/ work photos (optimized at build)
│  ├─ components/
│  └─ pages/ (index.astro, 404.astro)
├─ astro.config.mjs
└─ package.json
```

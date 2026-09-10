# How to edit this site

A friendly cheat-sheet for updating **evansautodetail.com** without touching
your local machine. Every change you commit auto-builds and deploys to
SiteGround in ~2 minutes via GitHub Actions.

> **The one thing to remember:** almost everything a normal edit needs lives in
> a single file — **`src/consts.ts`**. Phone number, reviews, services,
> service-area towns, hours, tagline. Edit that, commit, done.

---

## The three ways to edit

### 1. Pencil icon (easiest — 80% of edits)

For small text tweaks: change a phone number, fix a typo, add a review.

1. Go to https://github.com/manyresults/evansautodetail
2. Click into the file you want to edit (usually `src/consts.ts`)
3. Click the **✏️ pencil icon** in the top-right of the file
4. Make your change
5. Scroll to the bottom → **"Commit changes"** → **"Commit directly to
   `claude/evans-auto-detail-astro-wmgcgg`"** (or whatever the current live
   branch is) → green button
6. Wait ~2 min → check https://evansautodetail.com

### 2. Press `.` on any repo page (full VS Code in your browser)

For multi-file edits or when you want the file tree + syntax highlighting.

1. Go to https://github.com/manyresults/evansautodetail
2. **Press the period key `.`** on your keyboard
3. VS Code opens in the browser — edit anything you like
4. Source Control panel (left sidebar, third icon) → type a message →
   **Commit & Push**

No local install, no terminal, no preview server. Best for touching a component
+ `consts.ts` in the same commit.

### 3. Ask Claude Code (for anything visual, structural, or "I don't know how")

For: adding a new section, layout tweaks, swapping photos, "the hero looks
weird on iPad", "add a new service with an icon", "change the brand red to
something warmer."

Just start a new session at **claude.ai/code** against this repo, describe what
you want, and it'll ship it.

---

## Cheat-sheet: common edits

Every "what to change" below is a value in `src/consts.ts`.

### Change the phone number

```ts
// src/consts.ts, in the SITE = { ... } block:
phoneDisplay: "(267) 333-1071",
smsHref: "sms:+12673331071",
telHref: "tel:+12673331071",
```

Change all three — the whole site (header button, hero CTA, contact section,
footer, JSON-LD schema) updates automatically.

### Add a new customer review

```ts
// src/consts.ts, in the REVIEWS = [ ... ] array — add a new object:
{
  quote: "He detailed my truck and it looks better than the day I bought it.",
  author: "First name Last name",
  source: "Facebook",   // or "Google", "Yelp", etc.
},
```

The Reviews section renders it automatically as a card with the "Recommends on
Facebook" badge.

### Add a new service

```ts
// src/consts.ts, in the SERVICES = [ ... ] array:
{
  title: "Headlight Restoration",
  icon: "sparkle",   // any of: wash, polish, shield, interior, undercarriage, sparkle
  summary: "Cloudy, yellowed headlights restored to crystal clear — safer nights, sharper looks.",
},
```

To use a **new icon** that isn't in the list above, you also need to add an SVG
path in `src/components/ServiceIcon.astro` — that's a small code file. Easier:
ask Claude Code to add it, or pick one of the existing icons.

### Add / remove a service-area town

```ts
// src/consts.ts, the SERVICE_AREAS = [ ... ] array:
"Morrisville",
"Yardley",
"Newtown",
// add or remove any town here
```

Updates the Contact section's "we serve" list **and** the JSON-LD
`areaServed` (helps with local SEO).

### Change hours

```ts
// src/consts.ts:
hours: "By Appointment",
hoursNote: "Mobile service — we come to you, wherever your busy life takes you.",
```

### Change the tagline / hero copy

```ts
// src/consts.ts:
tagline: "Full-Service Mobile Auto Detailing",
description: "Evans' Detailing is a mobile car wash & auto detailing service...",
```

For the big hero headline itself (**"SHOWROOM SHINE, DELIVERED TO YOUR
DRIVEWAY"**), that's in `src/components/Hero.astro` — pencil-edit it directly.

### Swap a photo

Photos live in `src/assets/gallery/`. The easiest workflow is:

1. On github.com, navigate to `src/assets/gallery/`
2. Click **"Add file" → "Upload files"** and drop the new photo in
3. Give it a sensible name like `evans-detail-porsche.jpg`
4. Add it to the gallery by editing `src/consts.ts`, `GALLERY` array:

```ts
{
  file: "evans-detail-porsche.jpg",
  alt: "A silver Porsche detailed to a mirror shine",
  caption: "Porsche 911 — full detail",
},
```

**Photo tips:** 1200px wide is a great sweet spot. Astro auto-converts to WebP
and generates responsive sizes at build time — you don't need to shrink
anything yourself.

To **replace the hero photo**, edit the import at the top of
`src/components/Hero.astro`:

```astro
import heroImg from "../assets/gallery/evans-detail-black-kia.jpg";
// change to whatever filename you want
```

### Add / update the Facebook link

```ts
// src/consts.ts:
social: {
  facebook: "https://www.facebook.com/Evans-Detailing-102546878623982",
},
```

### Change brand colors

```css
/* src/styles/global.css, top block: */
--color-red: #fe0000;        /* primary red — change this */
--color-red-muted: #ce2e2e;
--color-ink: #0f0f0f;        /* near-black background */
```

Every red/black on the site follows these. Change one hex, whole site updates.

---

## What happens after I commit?

1. GitHub sees the push
2. GitHub Actions runs `.github/workflows/deploy.yml`:
   - Installs dependencies
   - Runs `npm run build` (produces `dist/`)
   - SFTPs `dist/` to SiteGround
3. Total time: **~90 seconds to 2 minutes**

**Watch it happen:** Actions tab → click the running workflow to see live logs.

**If the workflow fails:** open the failed run, red X marks the failing step,
click it for the log. Most common cause is a typo in `consts.ts` (missing
comma, unclosed quote). Fix it and commit again.

---

## Things to be careful with

- **Commas in `consts.ts`** — every item in an array or object needs a trailing
  comma. Adding a review? Make sure the previous review still has its comma at
  the end of the closing `}`.
- **Quotes** — if your quote text contains a `"` character, escape it: `\"` or
  swap the outer quotes to single: `'…he said "wow"…'`.
- **The branch name** — commit to whichever branch this site currently deploys
  from. Check `.github/workflows/deploy.yml` line ~7: `branches: [...]`. That's
  the live branch.
- **Don't edit `dist/`** — that folder is generated on every build. Edits there
  vanish next deploy.
- **Don't commit** `node_modules/` or `.env` files — they're gitignored for a
  reason. If GitHub's browser editor won't let you upload one, that's why.

---

## Quick reference

| Want to change… | File | What section |
| --- | --- | --- |
| Phone number | `src/consts.ts` | `SITE.phoneDisplay` / `smsHref` / `telHref` |
| Reviews | `src/consts.ts` | `REVIEWS` array |
| Services | `src/consts.ts` | `SERVICES` array |
| Service-area towns | `src/consts.ts` | `SERVICE_AREAS` array |
| Vehicle types | `src/consts.ts` | `VEHICLE_TYPES` array |
| Hours | `src/consts.ts` | `SITE.hours` / `hoursNote` |
| About / stats | `src/consts.ts` | `STATS` array |
| Gallery photos | `src/assets/gallery/` + `GALLERY` in `consts.ts` | — |
| Hero headline text | `src/components/Hero.astro` | the `<h1>` |
| Hero photo | `src/components/Hero.astro` | `import heroImg from...` |
| About paragraphs | `src/components/About.astro` | the `<p>` tags |
| Brand colors | `src/styles/global.css` | `@theme` block |
| Site title / SEO description | `src/consts.ts` | `SITE.description` |
| Contact section copy | `src/components/Contact.astro` | — |
| Footer copy | `src/components/Footer.astro` | — |

---

## When to bring in Claude Code vs. edit yourself

**Edit yourself (pencil icon):**
- Text swaps, phone number, adding reviews, adding/removing service areas,
  updating the tagline, replacing a gallery photo

**Ask Claude Code:**
- Any new section, layout, or feature
- "The hero looks off on my phone"
- "Add a booking form / online scheduler"
- New service that needs an icon
- Color palette overhaul
- Anything you're not 100% sure how to do

Both paths end up in the same repo, deploying the same way. Use whichever is
faster for the change at hand.

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT & BUSINESS DATA — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Everything a non-developer is likely to change lives here: business name,
 *  contact details, services, the vehicle types, reviews, nav, and SEO
 *  defaults. Edit this one file and the whole single-page site + JSON-LD
 *  schema + sitemap update.
 *
 *  Content was reconstructed from the live WordPress site (evansautodetail.com)
 *  and cleaned up (typos fixed, copy expanded). Real work photos were pulled
 *  from the site's media library and optimized. See `REVIEWS` below for the one
 *  item still needing owner input.
 */

export const SITE = {
  name: "Evans' Detailing",
  legalName: "Evans' Auto Detail",
  shortName: "Evans' Detailing",
  url: "https://evansautodetail.com",

  // Short, punchy positioning line.
  tagline: "Full-Service Mobile Auto Detailing",
  // One-line description used as the default meta description / OG description.
  description:
    "Evans' Detailing is a mobile car wash & auto detailing service based in Morrisville, PA, serving Lower Bucks County. Ceramic coatings, full interior & exterior detailing, wax and polish — we come to you. Text (267) 333-1071 to book.",

  owner: "Brian Evans",

  // Contact — this business runs on text-to-book.
  phoneDisplay: "(267) 333-1071",
  smsHref: "sms:+12673331071",
  telHref: "tel:+12673331071",

  // Service-area business (mobile) — no public street address is shown.
  city: "Morrisville",
  state: "PA",
  region: "Lower Bucks County",
  // Approximate service-area center (Morrisville, PA) for JSON-LD geo.
  geo: { lat: 40.2087, lng: -74.7816 },

  // Trust signals.
  since: 1996,
  yearsExperience: "25+",
  guarantee:
    "You don't pay unless you're completely satisfied — that's our 100% satisfaction guarantee.",

  // Hours.
  hours: "By Appointment",
  hoursNote: "Mobile service — we come to you, wherever your busy life takes you.",

  // Social profiles.
  social: {
    facebook: "https://www.facebook.com/Evans-Detailing-102546878623982",
  },

  // Default social share image (lives in /public).
  ogImage: "/og-image.png",
} as const;

/**
 * Towns/areas served (used in the Contact section copy + JSON-LD areaServed).
 * Lower Bucks County, PA and immediately surrounding communities.
 */
export const SERVICE_AREAS = [
  "Morrisville",
  "Yardley",
  "Newtown",
  "Levittown",
  "Fairless Hills",
  "Langhorne",
  "Fallsington",
  "Tullytown",
  "Bristol",
  "Falls Township",
  "Lower Bucks County",
] as const;

/**
 * Primary navigation — single-page anchors (order matters). The header logo
 * links back to the top (#top).
 */
export const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Services. `icon` maps to an inline SVG in `src/components/ServiceIcon.astro`.
 */
export interface Service {
  title: string;
  icon: string;
  summary: string;
}

export const SERVICES: Service[] = [
  {
    title: "Exterior Wash",
    icon: "wash",
    summary:
      "A meticulous hand wash that lifts road grime, salt, and brake dust — then a streak-free finish that makes the paint pop.",
  },
  {
    title: "Wax & Polish",
    icon: "polish",
    summary:
      "Machine polish and premium wax to cut haze and light swirls, seal the paint, and leave a deep, wet-looking shine.",
  },
  {
    title: "Ceramic Coating",
    icon: "shield",
    summary:
      "A long-lasting protective layer that locks in gloss and shields your paint from UV, salt, and the elements for years.",
  },
  {
    title: "Interior Deep Cleaning",
    icon: "interior",
    summary:
      "Carpets, upholstery, mats, vents, and every surface cleaned and dressed — we sweat the small details most people miss.",
  },
  {
    title: "Undercarriage Cleaning",
    icon: "undercarriage",
    summary:
      "Flush out the salt, mud, and corrosive buildup underneath your vehicle — the damage you can't see but feel down the road.",
  },
  {
    title: "Custom Detail",
    icon: "sparkle",
    summary:
      "Not sure what you need? Tell us the vehicle and the goal and we'll build a custom package around it. Corporate rates available.",
  },
];

/** Vehicle types serviced. `icon` maps to `src/components/ServiceIcon.astro`. */
export const VEHICLE_TYPES: { label: string; icon: string }[] = [
  { label: "Cars, Trucks & SUVs", icon: "car" },
  { label: "Boats", icon: "boat" },
  { label: "Commercial Vehicles", icon: "truck" },
  { label: "Motorcycles", icon: "motorcycle" },
];

/**
 * About-section stat blocks.
 */
export const STATS: { value: string; label: string }[] = [
  { value: "1996", label: "Detailing since" },
  { value: "25+", label: "Years of experience" },
  { value: "100%", label: "Satisfaction guarantee" },
  { value: "Mobile", label: "We come to you" },
];

/**
 * Gallery — real work photos (in src/assets/gallery). Order controls layout.
 * `feature: true` gives the photo a larger tile in the grid.
 */
export interface GalleryItem {
  file: string; // filename in src/assets/gallery/
  alt: string;
  caption: string;
  feature?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { file: "evans-detail-black-kia.jpg", alt: "Freshly detailed black Kia Sportage with a deep mirror gloss", caption: "Black Kia Sportage — mirror finish", feature: true },
  { file: "evans-detail-camaro.jpg", alt: "Orange Chevrolet Camaro SS with racing stripes after detailing", caption: "Camaro SS — exterior detail" },
  { file: "evans-detail-nissan-murano.jpg", alt: "Red Nissan Murano SUV washed and waxed", caption: "Nissan Murano — wash & wax" },
  { file: "evans-detail-mazda-cx9.jpg", alt: "Dark blue Mazda CX-9 detailed to a high shine", caption: "Mazda CX-9 — full exterior" },
  { file: "evans-detail-ford-taurus.jpg", alt: "Red Ford Taurus SHO sedan detailed", caption: "Ford Taurus SHO — paint pop", feature: true },
  { file: "evans-detail-silverado-truck.jpg", alt: "Blue Chevrolet Silverado pickup truck detailed", caption: "Chevy Silverado — truck detail" },
  { file: "evans-detail-jeep-renegade.jpg", alt: "White Jeep Renegade cleaned and detailed", caption: "Jeep Renegade — exterior wash" },
  { file: "evans-detail-motorcycle.jpg", alt: "Blue Harley-Davidson touring motorcycle detailed", caption: "Harley-Davidson — motorcycle detail" },
  { file: "evans-detail-boat.jpg", alt: "White cabin cruiser boat cleaned at the marina", caption: "Cabin cruiser — boat detail" },
  { file: "evans-detail-commercial-truck.jpg", alt: "White Peterbilt commercial roll-off truck washed", caption: "Peterbilt — commercial fleet" },
];

/**
 * Reviews / testimonials.
 *
 *  ⚠️  ACTION NEEDED — REAL REVIEW TEXT.
 *  The old site's "Reviews" section was only screenshot images with no text,
 *  and Facebook/Google/Yelp couldn't be reached from the build environment to
 *  pull genuine quotes. So this array is intentionally EMPTY: the Reviews
 *  section renders a strong "satisfaction guarantee + leave us a review" panel
 *  instead of any invented testimonials (we will not fabricate reviews).
 *
 *  To add real ones, paste genuine quotes below in this shape and they'll
 *  render automatically as cards:
 *
 *    { quote: "Brian did an incredible job on my truck...", author: "First name", source: "Google" },
 *
 *  Pull them from the Facebook page reviews or Google Business profile.
 */
export interface Review {
  quote: string;
  author: string;
  source?: string;
}

export const REVIEWS: Review[] = [
  // Add real customer quotes here — see note above.
];

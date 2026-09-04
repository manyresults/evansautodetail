/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT & BUSINESS DATA — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Everything a non-developer is likely to change lives here: business name,
 *  contact details, services, testimonials, nav, and SEO defaults. Edit this
 *  one file and the whole site + JSON-LD schema + sitemap update.
 *
 *  ⚠️  CONTENT STATUS: This is a first-draft reconstruction assembled from
 *  public listings (the business website was not directly reachable from the
 *  build environment). Items marked `VERIFY` should be confirmed against the
 *  live site / owner before go-live. A follow-up session with network access
 *  to earlsdetailing.com can replace this with the exact copy + real photos.
 */

export const SITE = {
  name: "Earl's Proper Detailing",
  shortName: "Earl's Detailing",
  legalName: "Earl's Proper Detailing",
  url: "https://earlsdetailing.com",
  tagline: "Bucks County's trusted auto detailing shop for over 20 years.",
  // One-line description used as the default meta description / OG description.
  description:
    "Earl's Proper Detailing in Langhorne, PA offers expert auto detailing, ceramic coating, paint correction, and paint protection film. 20+ years of experience and four-time Best of Bucks winner.",

  // Contact
  phoneDisplay: "(215) 791-3015", // confirmed by owner
  phoneHref: "tel:+12157913015",
  email: "earlsdetailing@comcast.net",

  // Address
  address: {
    street: "95 Bristol Oxford Valley Rd",
    city: "Langhorne",
    state: "PA",
    zip: "19047",
    country: "US",
  },
  // Approximate coordinates for JSON-LD (VERIFY / refine for exact pin).
  geo: { lat: 40.1712, lng: -74.8846 },

  // Google Maps link (uses the address string — safe default).
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Earl%27s+Proper+Detailing+95+Bristol+Oxford+Valley+Rd+Langhorne+PA+19047",

  // Hours of operation.
  // ⚠️ VERIFY — these are placeholder typical hours; confirm before go-live.
  hoursConfirmed: false,
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "5:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "2:00 PM" },
    { day: "Sunday", open: null, close: null }, // closed
  ] as Array<{ day: string; open: string | null; close: string | null }>,

  // Areas served (used in copy + JSON-LD areaServed).
  serviceAreas: [
    "Langhorne",
    "Levittown",
    "Fairless Hills",
    "Newtown",
    "Yardley",
    "Bucks County, PA",
  ],

  // Trust signals
  yearsExperience: "20+",
  awards: "Four-time Best of Bucks winner",

  // Social profiles (add/adjust URLs as confirmed).
  social: {
    facebook: "https://www.facebook.com/earlsdetail/",
    // instagram: "",
  },

  // Default social share image (lives in /public). Swap for a branded 1200x630.
  ogImage: "/og-image.png",
} as const;

/** Primary navigation (order matters). */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Specials", href: "/specials/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
] as const;

/**
 * Services. `icon` maps to an inline SVG in `src/components/ServiceIcon.astro`.
 * `featured: true` surfaces the service on the home page grid.
 */
export interface Service {
  title: string;
  slug: string;
  icon: string;
  summary: string; // short — used on cards
  description: string; // longer — used on the Services page
  price?: string; // optional price note
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    title: "Full Auto Detailing",
    slug: "auto-detailing",
    icon: "sparkle",
    summary: "Interior & exterior detailing that makes your vehicle look like new.",
    description:
      "A complete interior and exterior detail — hand wash, clay, wax, tire renovator and shine, vinyl dressings, streak-free window finishes, and a deep interior clean of carpets, upholstery, and every surface. We treat every vehicle as if it were our own.",
    featured: true,
  },
  {
    title: "Ceramic Coating",
    slug: "ceramic-coating",
    icon: "shield",
    summary: "A durable barrier against the elements that keeps its shine for years.",
    description:
      "Professional-grade ceramic coating creates a long-lasting protective barrier against UV rays, road salt, bird droppings, and harsh weather. It locks in a deep, glossy finish and makes future washes far easier — protection measured in years, not months.",
    price: "Packages from $800",
    featured: true,
  },
  {
    title: "Paint Correction & Polishing",
    slug: "paint-correction",
    icon: "polish",
    summary: "Remove swirls, scratches, and oxidation to restore a mirror finish.",
    description:
      "Multi-stage machine polishing that removes swirl marks, light scratches, water spots, and oxidation, bringing back the deep, reflective gloss your paint had when it left the lot.",
    featured: true,
  },
  {
    title: "Paint Protection Film",
    slug: "paint-protection-film",
    icon: "film",
    summary: "Clear film that shields high-impact panels from chips and abrasion.",
    description:
      "Paint protection film (PPF) adds a virtually invisible, self-healing layer over your vehicle's most vulnerable panels — bumpers, hood, and fenders — guarding against rock chips, road debris, and scratches.",
    featured: true,
  },
  {
    title: "Paintless Dent Repair",
    slug: "paintless-dent-repair",
    icon: "dent",
    summary: "Fix dings and dents without repainting — fast and affordable.",
    description:
      "Paintless dent repair gently massages dents and door dings back to shape from behind the panel, preserving your factory paint. It's faster and more cost-effective than traditional bodywork.",
    featured: true,
  },
  {
    title: "Windshield Repair & Replacement",
    slug: "windshield",
    icon: "windshield",
    summary: "Chip repair and full windshield replacement to keep you safe.",
    description:
      "From small chip and crack repairs to complete windshield replacement, we keep your glass clear and your vehicle safe on the road.",
    featured: true,
  },
  {
    title: "Truck Bed Liner",
    slug: "truck-bed-liner",
    icon: "truck",
    summary: "Tough, protective spray-in liners for your truck bed.",
    description:
      "Durable spray-in bed liners protect your truck bed from scratches, rust, and corrosion, standing up to heavy loads and daily use.",
  },
  {
    title: "Mobile Detailing",
    slug: "mobile-detailing",
    icon: "van",
    summary: "Professional detailing that comes to you — home or office.",
    description:
      "Can't make it to the shop? Our mobile detailing service brings professional-grade care to your driveway or workplace. (Call to confirm availability in your area.)",
  },
];

/**
 * Testimonials pulled from public reviews (Yelp/Google). Attribution is kept
 * generic where a full name wasn't available — add real names as confirmed.
 */
export interface Testimonial {
  quote: string;
  author: string;
  source?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dario did a fantastic job — inside and out. The interior looks amazing and the exterior is so clean it looks like the day I rolled it off the lot. The engine looks sweet too. Easy going and kind. I'll definitely return and recommend to others.",
    author: "Satisfied Customer",
    source: "Yelp Review",
  },
  {
    quote:
      "A great auto detail and body shop for all of your vehicles. Had my Camry ceramic coated, scratches removed, and the body polished — the results speak for themselves.",
    author: "Verified Customer",
    source: "Yelp Review",
  },
  {
    quote:
      "Earl is honest and fair. He repaired scratches on my car at a very reasonable price and did excellent work. Highly recommend.",
    author: "Local Customer",
    source: "Google Review",
  },
];

/** Current specials / promotions (edit freely). */
export const SPECIALS = [
  {
    title: "10% Off Your Service",
    detail: "Mention our website when you book and take 10% off your detailing service.",
    highlight: "Mention this site",
  },
  {
    title: "Ceramic Coating Packages",
    detail:
      "Long-lasting ceramic protection with packages starting at $800. Ask about the right package for your vehicle.",
    highlight: "From $800",
  },
];

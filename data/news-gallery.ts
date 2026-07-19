// data/news-gallery.ts
// ─────────────────────────────────────────────────────────────────────────────
// UpForge News Gallery — manually curated press coverage and media appearances.
// To add a new entry: prepend an object to NEWS_ITEMS (newest first).
// Fields:
//   id          — unique slug/id string
//   image       — absolute image URL (use og-images, screenshots, press covers)
//   title       — headline / image caption (used for alt text + SEO)
//   source      — publication/outlet name
//   description — 1–2 sentence context for screen readers & SEO
//   dateAdded   — ISO date string "YYYY-MM-DD"
//   link        — optional external URL to the article/coverage
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string
  image: string
  title: string
  source: string
  description: string
  dateAdded: string
  link?: string
}

// Add new items at the TOP of this array (newest first)
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "upforge-global-registry-launch-2026",
    image: "https://www.upforge.org/og/registry.png",
    title: "UpForge Launches Global Startup Registry — Verified Profiles for 100K+ Startups",
    source: "UpForge Editorial",
    description:
      "UpForge officially launches its global startup registry, offering free UFRN (UpForge Registry Number) credentials to verified startups across 30+ sectors worldwide.",
    dateAdded: "2026-07-01",
    link: "https://www.upforge.org/registry",
  },
  {
    id: "upforge-founder-chronicle-march-2026",
    image: "https://www.upforge.org/og/global-registry.png",
    title: "The Founder Chronicle — March 2026 Edition: Zepto, Zerodha, Nykaa",
    source: "UpForge Chronicle",
    description:
      "The March 2026 edition of The Founder Chronicle profiles India's most consequential startup builders — including Nithin Kamath of Zerodha and Falguni Nayar of Nykaa.",
    dateAdded: "2026-03-01",
    link: "https://www.upforge.org/archive",
  },
  {
    id: "upforge-ufrn-credential-guide",
    image: "https://www.upforge.org/og/registry.png",
    title: "How UpForge's UFRN Credentials Help Startups Get Investor Attention",
    source: "UpForge Editorial",
    description:
      "A deep-dive into how the UpForge Registry Number works, why investors trust it, and how founders use it during due diligence to establish institutional credibility.",
    dateAdded: "2026-06-15",
    link: "https://www.upforge.org/blog/startup-verification-ufrn-credentials-guide",
  },
]

// Sorted newest first — used by the gallery page
export const getSortedNewsItems = (): NewsItem[] =>
  [...NEWS_ITEMS].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  )

// data/news-gallery.ts
// ─────────────────────────────────────────────────────────────────────────────
// UpForge News Gallery — curates press coverage and media appearances.
// To add a new entry: just add an object to NEWS_ITEMS at the top of the list.
// Rest of the fields (id, source, description, dateAdded) are generated automatically.
// ─────────────────────────────────────────────────────────────────────────────

export interface RawNewsItem {
  image: string
  title: string
  link: string
}

// ─────────────────────────────────────────────────────────────────────────────
// DAILY UPDATE LIST
// Simply paste the image URL, headline, and link here. Newest goes at the top.
// ─────────────────────────────────────────────────────────────────────────────
export const NEWS_ITEMS: RawNewsItem[] = [
  {
    image: "https://www.upforge.org/og/registry.png",
    title: "UpForge Launches Global Startup Registry — Verified Profiles for 100K+ Startups",
    link: "https://www.upforge.org/registry",
  },
  {
    image: "https://www.upforge.org/og/registry.png",
    title: "How UpForge's UFRN Credentials Help Startups Get Investor Attention",
    link: "https://www.upforge.org/blog/startup-verification-ufrn-credentials-guide",
  },
  {
    image: "https://www.upforge.org/og/global-registry.png",
    title: "The Founder Chronicle — March 2026 Edition: Zepto, Zerodha, Nykaa",
    link: "https://www.upforge.org/archive",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// AUTOMATIC GENERATION & NORMALIZATION
// ─────────────────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string
  image: string
  title: string
  source: string
  description: string
  dateAdded: string
  link: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function extractSource(link: string): string {
  try {
    const url = new URL(link)
    const host = url.hostname.replace("www.", "").toLowerCase()
    const mapping: Record<string, string> = {
      "economictimes.indiatimes.com": "The Economic Times",
      "moneycontrol.com": "Moneycontrol",
      "yourstory.com": "YourStory",
      "inc42.com": "Inc42",
      "techcrunch.com": "TechCrunch",
      "vccircle.com": "VCCircle",
      "livemint.com": "Livemint",
      "business-standard.com": "Business Standard",
      "forbesindia.com": "Forbes India",
      "forbes.com": "Forbes",
      "upforge.org": "UpForge Journal",
      "upforge.in": "UpForge Journal",
      "news.google.com": "Google News",
      "timesofindia.indiatimes.com": "Times of India",
      "thehindu.com": "The Hindu",
      "businessworld.in": "Businessworld",
    }
    return mapping[host] || host
  } catch {
    return "Press Coverage"
  }
}

export const getSortedNewsItems = (): NewsItem[] => {
  const baseDate = new Date()

  return NEWS_ITEMS.map((item, i) => {
    // Subtract i days for each item down the list to simulate daily posts
    const dateObj = new Date(baseDate.getTime() - i * 24 * 60 * 60 * 1000)
    const dateAdded = dateObj.toISOString().split("T")[0]
    const source = extractSource(item.link)
    const id = `${slugify(item.title)}-${i}`

    return {
      id,
      image: item.image,
      title: item.title,
      source,
      description: `Read the latest press coverage and ecosystem updates from ${source}: "${item.title}". Click through to view the full report.`,
      dateAdded,
      link: item.link,
    }
  })
}

import { NextResponse } from "next/server"

const BASE_URL = "https://www.upforge.org"

// Core published articles for news sitemap (within news recency window)
const RECENT_NEWS_ARTICLES = [
  {
    slug: "ai-startup-funding-exit-route-india-2026",
    title: "AI Startup Funding & Exit Routes in India 2026: Complete Founder Playbook",
    pubDate: "2026-07-06T08:00:00Z",
  },
  {
    slug: "investors-rejecting-generic-ai-pitches-2026",
    title: "Why VCs Are Rejecting Generic AI Wrapper Pitches in 2026",
    pubDate: "2026-07-06T09:30:00Z",
  },
  {
    slug: "defense-tech-startups-india-2026",
    title: "India's Defense Tech Boom: Startup Opportunities & iDEX Funding",
    pubDate: "2026-07-05T10:00:00Z",
  },
  {
    slug: "top-20-saas-startups-india-2026",
    title: "Top 20 SaaS Startups in India 2026: ARR Benchmarks & Growth Models",
    pubDate: "2026-07-05T14:00:00Z",
  },
  {
    slug: "ai-agents-for-startups-india-2026",
    title: "Autonomous AI Agents for Startups: Operating Stack 2026",
    pubDate: "2026-07-04T11:00:00Z",
  },
  {
    slug: "top-startup-incubators-india-2026",
    title: "Top Startup Incubators & Accelerators in India 2026",
    pubDate: "2026-07-04T16:00:00Z",
  },
]

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${RECENT_NEWS_ARTICLES.map(
    (item) => `
  <url>
    <loc>${BASE_URL}/blog/${item.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>UpForge Journal</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${item.pubDate}</news:publication_date>
      <news:title>${item.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</news:title>
    </news:news>
  </url>`
  ).join("")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}

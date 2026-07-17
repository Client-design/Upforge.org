import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const BASE = "https://www.upforge.org"

  const commonAllows = [
    "/",
    "/startup/",
    "/startups/",
    "/blog/",
    "/ufrn/",
    "/registry/",
    "/about",
    "/submit",
    "/contact",
    "/privacy",
    "/terms",
    "/faq",
    "/founders",
    "/verify",
    "/verification",
    "/methodology",
    "/editorial-standards",
    "/sitemap.xml",
  ]

  const commonDisallows = [
    "/admin/",
    "/api/",
    "/_next/",
    "/private/",
    "/*?preview=",
    "/*?draft=",
    "/*?token=",
  ]

  return {
    rules: [
      // Rule 1: Allow major top-tier search engine crawlers (SEO)
      {
        userAgent: [
          "Googlebot",
          "Googlebot-News",
          "Googlebot-Image",
          "Googlebot-Video",
          "AdsBot-Google",
          "AdsBot-Google-Mobile",
          "Bingbot",
          "msnbot",
          "DuckDuckBot",
        ],
        allow: commonAllows,
        disallow: commonDisallows,
      },
      
      // Rule 2: Allow top-tier Answer Engines / AI Search (AEO)
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: commonAllows,
        disallow: commonDisallows,
        crawlDelay: 2, // Slow down AI crawlers slightly to save hosting limits
      },
      
      // Rule 3: Block AI training, SEO scrapers, and regional search bots completely
      {
        userAgent: [
          // AI Training Bots (Opt-out)
          "CCBot",
          "Bytespider",
          "Amazonbot",
          "cohere-ai",
          "Anthropic-AI",
          "Google-Extended",
          "FacebookBot",
          "Diffbot",
          
          // SEO Auditing and Scrapers (Non-traffic-generating)
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
          "Rogerbot",
          "MJ12bot",
          "MegaIndex",
          "Criteobot",
          "PetalBot",
          "Spyfu",
          "Serpstat",
          "CognitiveSEO",
          "Linkdex",
          "Seokicks",
          "Grapeshot",
          "coccoc",
          "Mail.Ru_Bot",
          "Screaming Frog",
          
          // Non-essential / Regional Search Engines (Saving resource limit)
          "Baiduspider",
          "YandexBot",
          "YandexMobileBot",
          "Sogou",
          "Yahoo! Slurp",
          "Yahoo",
          "Yeti",
        ],
        disallow: ["/"],
      },
      
      // Rule 4: Catch-all for other crawlers
      {
        userAgent: "*",
        allow: commonAllows,
        disallow: commonDisallows,
        crawlDelay: 5, // Strict delay for unknown crawl agents
      },
    ],
    sitemap: [
      `${BASE}/sitemap.xml`,
    ],
    host: BASE,
  }
}

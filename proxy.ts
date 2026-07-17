import { NextResponse, type NextRequest } from "next/server"

// ── APPROVED BOTS (Allowed to crawl/fetch, subject to rate limiting) ─────────
const ALLOWED_BOTS = [
  // Search Engines (SEO) - Only the absolute best-tier allowed
  "googlebot",
  "googlebot-image",
  "googlebot-video",
  "googlebot-news",
  "adsbot-google",
  "bingbot",
  "msnbot",
  "duckduckbot",
  
  // Answer Engines / AI Search (AEO) - Best level allowed
  "gptbot",
  "oai-searchbot",
  "chatgpt-user",
  "perplexitybot",
  "claudebot",
  "claude-web",
  "applebot",
  "applebot-extended",
  
  // Social Previews / Share Card Crawlers (Link previews for humans)
  "facebookexternalhit",
  "meta-externalagent",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "slack-imgproxy",
  "discordbot",
  "whatsapp",
  "telegrambot",
  "pinterest",
  
  // System / Developer Audit & Monitoring Tools
  "vercel",
  "lighthouse",
]

// ── BLOCKED BOT KEYWORDS (Blocked immediately) ──────────────────────────────
const BLOCKED_KEYWORDS = [
  // SEO Scrapers / Competitor Spying Tools (High frequency, zero search value)
  "ahrefsbot",
  "semrushbot",
  "dotbot",
  "rogerbot",
  "mj12bot",
  "megaindex",
  "criteobot",
  "petalbot",
  "spyfu",
  "serpstat",
  "cognitiveseo",
  "linkdex",
  "seokicks",
  "grapeshot",
  "coccoc",
  "mail.ru_bot",
  "screaming frog",
  "searchmetrics",
  "sitecheck",
  "backlink",
  "keycss",
  
  // AI Training scrapers that do NOT drive search/AEO traffic
  "ccbot",
  "bytespider",
  "amazonbot",
  "diffbot",
  "cohere-ai",
  "anthropic-ai",
  "google-extended",
  "facebookbot",
  
  // Non-essential / regional search bots to save hosting limits
  "baiduspider",
  "yandexbot",
  "yandexmobilebot",
  "sogou",
  "yahoo",
  "yeti", // Naver Yeti
  
  // Scraping script clients / developer tools / libraries
  "curl",
  "wget",
  "urllib",
  "node-fetch",
  "axios",
  "scrapy",
  "headlesschrome",
  "selenium",
  "puppeteer",
  "playwright",
  "postman",
  "go-http-client",
  "java",
  "perl",
  "blexbot",
  "barkrowler",
  "zoominfobot",
  "exabot",
  "python",
  "libwww-perl",
  "lwp-trivial",
  "mechanize",
  "nmap",
  "httpclient",
  "http-client",
]

// ── GENERIC CRAWLER TERMS (Blocked if not in approved list) ─────────────────
const GENERIC_CRAWLER_KEYWORDS = [
  "bot",
  "spider",
  "crawler",
  "crawling",
  "scraper",
  "scraping",
]

// ── IN-MEMORY RATE LIMITER FOR ALLOWED BOTS / CLIENTS ────────────────────────
interface RateLimitBucket {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitBucket>()

// Cleanup old entries from the map to prevent memory leaks
function cleanupRateLimitMap() {
  if (rateLimitMap.size > 10000) {
    const now = Date.now()
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }
  if (rateLimitMap.size > 15000) {
    rateLimitMap.clear()
  }
}

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  cleanupRateLimitMap()
  const now = Date.now()
  const bucket = rateLimitMap.get(ip)
  
  if (!bucket || now > bucket.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs
    })
    return false
  }
  
  if (bucket.count >= limit) {
    return true
  }
  
  bucket.count++
  return false
}

// ── MAIN PROXY / MIDDLEWARE LOGIC ───────────────────────────────────────────
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get("user-agent") || ""
  const uaLower = userAgent.toLowerCase().trim()

  // 1. Get Client IP for rate limiting
  const ip = (request as any).ip || request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "unknown-ip"

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1: BOT DETECTION & BLOCKING
  // ─────────────────────────────────────────────────────────────────────────

  // Block missing or extremely short user agents (often simple scripts/scrapers)
  if (!uaLower || uaLower.length < 12) {
    return new NextResponse(
      JSON.stringify({ error: "Access denied. Valid browser or client agent required." }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  // Check if it is an approved bot
  const isApproved = ALLOWED_BOTS.some((bot) => uaLower.includes(bot))

  if (!isApproved) {
    // Block if it matches explicit blacklisted bots/scrapers
    const isBlocked = BLOCKED_KEYWORDS.some((kw) => uaLower.includes(kw))
    if (isBlocked) {
      return new NextResponse(
        JSON.stringify({ error: "Access denied. Automated traffic from this agent is not allowed." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // Block any generic crawler keywords (if not explicitly allowed)
    const isGenericBot = GENERIC_CRAWLER_KEYWORDS.some((kw) => uaLower.includes(kw))
    if (isGenericBot) {
      return new NextResponse(
        JSON.stringify({ error: "Access denied. Automated web crawling is restricted." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2: RATE LIMITING (Allowed Bots & General Traffic)
  // ─────────────────────────────────────────────────────────────────────────

  if (isApproved) {
    // Limit allowed bots/crawlers (e.g. Max 15 requests per 10 seconds)
    if (isRateLimited(ip, 15, 10000)) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded. Please throttle request frequency." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  } else {
    // Generous rate limit for normal human users (e.g. Max 100 requests per 10 seconds)
    if (isRateLimited(ip, 100, 10000)) {
      return new NextResponse(
        JSON.stringify({ error: "Rate limit exceeded. Too many requests." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3: PROXY / CONTEXT / REDIRECTS (Only on non-API routes)
  // ─────────────────────────────────────────────────────────────────────────

  // Skip header and auth logic for API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Clone request headers to inject context headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-upforge-domain', 'org')
  requestHeaders.set('x-upforge-pathname', pathname)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set the context headers on the response as well for downstream proxying
  response.headers.set('x-upforge-domain', 'org')
  response.headers.set('x-upforge-pathname', pathname)

  // Admin route protection (cookie check, redirects unauthenticated users)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/')) {
      return response
    }

    const adminAuth = request.cookies.get('admin_auth')?.value
    if (!adminAuth || adminAuth !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

// Next.js default export compatibility
export default proxy

// Next.js 16 proxy configuration matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml, ads.txt, llms.txt, llms-full.txt
     * - standard static file formats (png, jpg, jpeg, gif, webp, svg, css, js, woff2, json, xml)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|llms.txt|llms-full.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff2?|json|xml)).*)",
  ],
}

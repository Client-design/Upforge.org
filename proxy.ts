import { NextResponse, type NextRequest } from "next/server"

// APPROVED BOTS (Allowed to crawl/fetch, subject to rate limiting)
const ALLOWED_BOTS = [
  "googlebot", "googlebot-image", "googlebot-video", "googlebot-news", "adsbot-google",
  "bingbot", "msnbot", "duckduckbot", "gptbot", "oai-searchbot", "chatgpt-user",
  "perplexitybot", "claudebot", "claude-web", "applebot", "applebot-extended",
  "facebookexternalhit", "meta-externalagent", "twitterbot", "linkedinbot",
  "slackbot", "slack-imgproxy", "discordbot", "whatsapp", "telegrambot", "pinterest",
  "vercel", "lighthouse"
]

// BLOCKED BOT KEYWORDS (Blocked immediately)
const BLOCKED_KEYWORDS = [
  "ahrefsbot", "semrushbot", "dotbot", "rogerbot", "mj12bot", "megaindex", "criteobot",
  "petalbot", "spyfu", "serpstat", "cognitiveseo", "linkdex", "seokicks", "grapeshot",
  "coccoc", "mail.ru_bot", "screaming frog", "searchmetrics", "sitecheck", "backlink",
  "keycss", "ccbot", "bytespider", "amazonbot", "diffbot", "cohere-ai", "anthropic-ai",
  "google-extended", "facebookbot", "baiduspider", "yandexbot", "yandexmobilebot",
  "sogou", "yahoo", "yeti", "curl", "wget", "urllib", "node-fetch", "axios", "scrapy",
  "headlesschrome", "selenium", "puppeteer", "playwright", "postman", "go-http-client",
  "java", "perl", "blexbot", "barkrowler", "zoominfobot", "exabot", "python",
  "libwww-perl", "lwp-trivial", "mechanize", "nmap", "httpclient", "http-client"
]

const GENERIC_CRAWLER_KEYWORDS = ["bot", "spider", "crawler", "crawling", "scraper", "scraping"]

interface RateLimitBucket {
  count: number
  resetTime: number
}
const rateLimitMap = new Map<string, RateLimitBucket>()

function cleanupRateLimitMap() {
  if (rateLimitMap.size > 10000) {
    const now = Date.now()
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) rateLimitMap.delete(key)
    }
  }
}

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  cleanupRateLimitMap()
  const now = Date.now()
  const bucket = rateLimitMap.get(ip)
  if (!bucket || now > bucket.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }
  if (bucket.count >= limit) return true
  bucket.count++
  return false
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get("user-agent") || ""
  const uaLower = userAgent.toLowerCase().trim()
  
  // Hostname verify karo loop se bachne ke liye
  const host = request.headers.get("host") || ""

  // 1. Agar request non-www 'upforge.org' par aati hai, toh standard protocol se handle hone do, 
  // ya middleware se hi strict handle karo bina next.config se takraye.
  if (host === "upforge.org") {
    return NextResponse.redirect(`https://www.upforge.org${pathname}${request.nextUrl.search}`, 301)
  }

  const ip = request.ip || request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown-ip"

  // BOT DETECTION
  if (!uaLower || uaLower.length < 12) {
    return new NextResponse(JSON.stringify({ error: "Access denied." }), { status: 403, headers: { "Content-Type": "application/json" } })
  }

  const isApproved = ALLOWED_BOTS.some((bot) => uaLower.includes(bot))
  if (!isApproved) {
    if (BLOCKED_KEYWORDS.some((kw) => uaLower.includes(kw)) || GENERIC_CRAWLER_KEYWORDS.some((kw) => uaLower.includes(kw))) {
      return new NextResponse(JSON.stringify({ error: "Access denied." }), { status: 403, headers: { "Content-Type": "application/json" } })
    }
  }

  // RATE LIMITING
  if (isApproved) {
    if (isRateLimited(ip, 30, 10000)) { // Throttling slack badhai
      return new NextResponse(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { "Content-Type": "application/json" } })
    }
  } else {
    if (isRateLimited(ip, 150, 10000)) {
      return new NextResponse(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { "Content-Type": "application/json" } })
    }
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // ADMIN PROTECT LOOP BREAKER
  if (pathname.startsWith('/admin')) {
    // Agar login page hai ya api route, toh infinite loop mat banao
    if (pathname === '/admin/login' || pathname.startsWith('/api/admin/')) {
      return NextResponse.next()
    }
    const adminAuth = request.cookies.get('admin_auth')?.value
    if (!adminAuth || adminAuth !== 'authenticated') {
      // Loop se bachne ke liye redirect URL absolute aur precise hona chahiye
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-upforge-domain', 'org')
  requestHeaders.set('x-upforge-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export default proxy

export const config = {
  // Static assets aur standard dynamic endpoints ko strictly ignore karo sitemap parsing ke waqt
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.*\\.xml|ads.txt|llms.txt|llms-full.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|woff2?|json)).*)",
  ],
}

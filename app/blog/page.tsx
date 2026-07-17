import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Startup Intelligence Journal — In-Depth Reports & Founder Insights | UpForge",
  description: "Data-driven articles on Global startup trends, VC funding guides, unicorn profiles, founder strategies, fintech rankings, and legal guides for Indian founders.",
  keywords: [
    "Indian startup blog",
    "startup funding India 2026",
    "Indian unicorns list",
    "startup founder stories",
    "AI startups India",
    "fintech startups India",
    "VC firms India",
    "startup legal guide India",
    "bootstrapped startups India",
    "women founders India",
  ],
  alternates: { canonical: "https://www.upforge.org/blog" },
  openGraph: {
    title: "Startup Intelligence Journal | UpForge",
    description: "Global startup analysis, funding guides, VC rankings, and founder insights — updated regularly.",
    url: "https://www.upforge.org/blog",
    siteName: "UpForge",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const BLOG_POSTS = [
  {
    title: "AI Startup Funding & Exit Routes in India 2026: The Consolidation Wave",
    slug: "ai-startup-funding-exit-route-india-2026",
    category: "INVESTMENT ANALYSIS",
    excerpt: "Indian AI startups raised $676M in H1 2026, but the landscape is shifting from early funding rounds to strategic M&A exits. Learn about key exit routes, valuation multiples, and the consolidation wave.",
    date: "July 2026",
    readTime: "12 min",
    featured: true,
  },
  {
    title: "Why Investors Are Rejecting Generic AI Pitches in 2026: The Moat Requirement",
    slug: "investors-rejecting-generic-ai-pitches-2026",
    category: "FOUNDER PLAYBOOK",
    excerpt: "Simple API wrappers are getting rejected. Discover the deep proprietary tech and data pipelines VCs now demand.",
    date: "July 2026",
    readTime: "12 min",
  },
  {
    title: "How Indian Space & Defense Tech Startups Are Winning Government Contracts in 2026",
    slug: "defense-tech-startups-india-2026",
    category: "STRATEGIC ANALYSIS",
    excerpt: "National defense is no longer the exclusive domain of state-run enterprises. Startups are securing major contracts under iDEX and space reforms.",
    date: "July 2026",
    readTime: "12 min",
  },
  {
    title: "Why Tier-2 & Tier-3 Indian Cities Are Producing 50% of New Startups in 2026",
    slug: "tier-2-tier-3-indian-cities-producing-startups-2026",
    category: "ECOSYSTEM ANALYSIS",
    excerpt: "Non-metro cities like Jaipur, Indore, Kochi and others now account for 50% of registrations. Examine the cost advantages and talent pools.",
    date: "July 2026",
    readTime: "12 min",
  },
  {
    title: "The Founder's Guide to UFRN Verification & Registry Credentials",
    slug: "startup-verification-ufrn-credentials-guide",
    category: "REGISTRY GUIDE",
    excerpt: "Learn how the UpForge Registry Number (UFRN) system validates startup legitimacy and provides verified operational metrics for VCs.",
    date: "July 2026",
    readTime: "12 min",
  },
  {
    title: "India Startup Ecosystem 2026: Complete State of the Nation Report",
    slug: "india-startup-ecosystem-2026",
    category: "ECOSYSTEM REPORT",
    excerpt: "650,000 startups. 125 unicorns. $3.44B raised in Q1. The definitive data-driven picture of India's startup landscape.",
    date: "March 2026",
    updated: "June 2026",
    readTime: "20 min",
    featured: true,
  },
  {
    title: "Top Indian Unicorns 2026: Every ₹1B+ Startup Ranked & Profiled",
    slug: "top-indian-unicorns-2026",
    category: "UNICORN REPORT",
    excerpt: "Complete rankings, sector breakdown, and founder profiles of all 125 Indian unicorns.",
    date: "March 2026",
    updated: "June 2026",
    readTime: "15 min",
    featured: true,
  },
  {
    title: "Top 30 Venture Capital Firms in India 2026: Complete Rankings & Profiles",
    slug: "best-vc-firms-india-2026",
    category: "VC & INVESTORS",
    excerpt: "The definitive ranked list of India's top VCs — investment thesis, cheque sizes, portfolio highlights, and how to pitch each one.",
    date: "June 2026",
    readTime: "15 min",
    featured: true,
  },
  {
    title: "India vs Silicon Valley: Why Indian Startups Are Winning Globally",
    slug: "india-vs-silicon-valley-startups",
    category: "GLOBAL ANALYSIS",
    excerpt: "7 structural advantages Indian founders have in 2026 — and why the next decade of global tech will be built in India.",
    date: "June 2026",
    readTime: "11 min",
    featured: true,
  },
  {
    title: "How to Get Startup Funding in India 2026: Complete Founder's Guide",
    slug: "how-to-get-startup-funding-india-2026",
    category: "FUNDING GUIDE",
    excerpt: "Step-by-step guide covering angel investors, VCs, government schemes, and pitch deck tips.",
    date: "March 2026",
    updated: "June 2026",
    readTime: "12 min",
  },
  {
    title: "Top AI Startups in India (2026 Updated List)",
    slug: "top-ai-startups-india-2026",
    category: "AI & DEEP TECH",
    excerpt: "The most promising AI startups in India across generative AI, computer vision, and NLP.",
    date: "March 2026",
    updated: "June 2026",
    readTime: "11 min",
  },
  {
    title: "How Startup Valuation Works in India 2026: Complete Founder's Guide",
    slug: "startup-valuation-india-2026",
    category: "FOUNDER PLAYBOOK",
    excerpt: "How VCs value your startup at every stage — Berkus method, ARR multiples, benchmarks, and negotiation tips.",
    date: "June 2026",
    readTime: "13 min",
  },
  {
    title: "Top Fintech Startups in India 2026: Complete Ranked List",
    slug: "fintech-startups-india-2026",
    category: "FINTECH",
    excerpt: "The definitive guide to India's top fintechs across payments, lending, insurtech, wealthtech, and neobanks.",
    date: "June 2026",
    readTime: "16 min",
  },
  {
    title: "25 Best Indian Startup Founders to Follow in 2026",
    slug: "best-indian-startup-founders-to-follow-2026",
    category: "FOUNDER PROFILES",
    excerpt: "Philosophies, playbooks, and success patterns of India's most influential startup founders.",
    date: "March 2026",
    updated: "June 2026",
    readTime: "18 min",
  },
  {
    title: "Top 25 Women Founders in India Building Billion-Dollar Companies 2026",
    slug: "women-founders-india-2026",
    category: "FOUNDER PROFILES",
    excerpt: "From unicorn builders to category creators — India's most inspiring women startup founders and their strategies.",
    date: "June 2026",
    readTime: "14 min",
  },
  {
    title: "Why 90% of Indian Startups Fail: The Data, Reasons & How to Survive",
    slug: "startup-failure-reasons-india",
    category: "FOUNDER PLAYBOOK",
    excerpt: "Data from 500+ post-mortems — the 12 real reasons Indian startups fail and actionable strategies to beat the odds.",
    date: "June 2026",
    readTime: "12 min",
  },
  {
    title: "20 Bootstrapped Indian Startups That Beat Funded Rivals",
    slug: "bootstrapped-startups-india-success-stories",
    category: "SUCCESS STORIES",
    excerpt: "Zerodha. Zoho. Freshworks in early days. How Indian founders built profitable empires without VC money.",
    date: "June 2026",
    readTime: "14 min",
  },
  {
    title: "The Ultimate Legal Guide for Indian Startups 2026",
    slug: "startup-legal-guide-india-2026",
    category: "FOUNDER PLAYBOOK",
    excerpt: "Company registration, DPIIT recognition, ESOPs, FEMA compliance, IP protection — every legal milestone from founding to Series A.",
    date: "June 2026",
    readTime: "13 min",
  },
  {
    title: "How to Start a Startup in India (Step-by-Step Guide 2026)",
    slug: "how-to-start-startup-india-2026",
    category: "FOUNDER PLAYBOOK",
    excerpt: "Complete guide covering registration, compliance, funding, and go-to-market strategy.",
    date: "March 2026",
    updated: "June 2026",
    readTime: "14 min",
  },
]

export default function BlogIndexPage() {
  const featuredPosts = BLOG_POSTS.filter(p => p.featured)
  const allPosts = BLOG_POSTS

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">

        {/* Header */}
        <section className="border-b-2 border-foreground max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6 text-center">
          <h1
            className="text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Startup Intelligence Journal
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-4">
            Data-driven analysis of Global startup ecosystem — funding trends, unicorn profiles, founder strategies, and actionable guides updated monthly.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
            <span>{BLOG_POSTS.length} In-Depth Reports</span>
            <span className="text-border">|</span>
            <span>Updated July 2026</span>
            <span className="text-border">|</span>
            <span>Free Forever</span>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-[1300px] mx-auto px-6 py-8">

          {/* Featured Posts */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Featured Analysis</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-2 border-border hover:border-[#C59A2E] transition-all p-6 flex flex-col"
                >
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.15em] text-[#C59A2E] mb-3">
                    {post.category}
                  </span>
                  <h2
                    className="text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-[#C59A2E] transition-colors flex-1"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <span className="font-mono uppercase">{post.updated ?? post.date}</span>
                    <span className="w-px h-3 bg-border" />
                    <span className="font-mono uppercase">{post.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Articles */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">All Reports</span>
              <div className="flex-1 h-px bg-foreground" />
              <span className="font-mono text-[9px] text-muted-foreground uppercase">{allPosts.length} articles</span>
            </div>

            <div className="divide-y-2 divide-border border-b-2 border-foreground">
              {allPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 py-5 hover:bg-muted/30 transition-colors -mx-2 px-2"
                >
                  <span className="font-mono text-sm font-bold text-[#C59A2E]/50 pt-1 w-6 text-right shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.15em] text-[#C59A2E]">
                      {post.category}
                    </span>
                    <h2
                      className="font-bold text-lg md:text-xl leading-tight mt-1 group-hover:text-[#C59A2E] transition-colors"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground font-mono uppercase">
                      <span>{post.updated ? `Updated ${post.updated}` : post.date}</span>
                      <span className="w-px h-2.5 bg-border" />
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                  <span className="text-2xl text-[#C59A2E]/30 group-hover:text-[#C59A2E] transition-colors shrink-0">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <div className="mt-12 border-2 border-foreground p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">Weekly Intelligence</span>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                  Stay ahead of Global startup scene
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  Every week: the biggest funding rounds, new unicorns, and the one founder insight you shouldn&apos;t miss. Free, no spam.
                </p>
              </div>
              <Link
                href="/newsletter"
                className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background px-8 py-3.5 font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Subscribe Free →
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 border-t-2 border-foreground pt-10 text-center">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Georgia', serif" }}>
              Get your startup verified globally
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join 47,000+ verified startups. Get your UFRN credential. Free basic listing.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background px-8 py-3.5 font-bold text-sm uppercase tracking-wider transition-colors"
            >
              List Your Startup →
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

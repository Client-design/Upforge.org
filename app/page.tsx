import { fetchAllStartups } from "@/lib/google-sheets"
import type { Metadata } from "next"
import { SITE_STATS } from "@/lib/site-stats"
import { FOUNDERS } from "@/lib/founders/data"
import { TrustStrip } from "@/components/homepage/TrustStrip"
import { ForbesIndex } from "@/components/forbes/forbes-index"
import { StartupIntelligenceJournal } from "@/components/forbes/startup-intelligence-journal"
import { ArrowRight, ShieldCheck, CheckCircle2, Award, ChevronRight, Rss } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.upforge.org"

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UpForge Global Startup Registry & Founder Intelligence Platform",
    "url": canonicalUrl,
    "description": "Global startup registry with verified founder database, editorial intelligence, and UFRN credentials",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }

  return {
    title: "UpForge — Global Startup Registry & Verified Founder Intelligence",
    description: `Discover ${SITE_STATS.trackedStartupsText} verified startups across ${SITE_STATS.countriesText} countries. Access UFRN credentials, deep-dive founder profiles, and global startup intelligence.`,
    keywords: [
      "startup registry",
      "founder database",
      "verified founders",
      "UpForge Founder Chronicle",
      "UFRN verification",
      "global startup database",
      "startup intelligence",
      "Michael Truell Cursor founder"
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "UpForge — Global Startup Registry & Founder Intelligence",
      description: `${SITE_STATS.trackedStartupsText} verified startups. Global founder database. Real-time intelligence.`,
      url: canonicalUrl,
      siteName: "UpForge",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://images.upforge.org/Magazine/michael-truell-cursor-founder-news.jpg",
          width: 1200,
          height: 675,
          alt: "UpForge Founder Intelligence Magazine Cover"
        },
      ],
    },
    other: {
      "application-ld+json": JSON.stringify(schema),
    },
    robots: { index: true, follow: true },
  }
}

export default async function HomePage() {
  const allStartups = await fetchAllStartups()

  const sortedStartups = [...allStartups].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1
    if (!a.is_featured && b.is_featured) return 1
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0
    return tb - ta
  })

  const indexStartups = sortedStartups.slice(0, 12)

  // FOUNDERS is already sorted by publishedAt descending
  const heroFounder = FOUNDERS[0] // Michael Truell (2026-07-28)
  const latestFoundersStrip = FOUNDERS.slice(1, 7)

  return (
    <div className="bg-[#09090b] min-h-screen text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Editorial Masthead Bar */}
      <header className="border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur-md">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold text-zinc-200 uppercase tracking-widest text-[11px]">FOUNDER CHRONICLE • EDITION NO. 26</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline">GLOBAL REGISTRY</span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <Link href="/founder-stories/feed.xml" className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 transition-colors">
              <Rss className="w-3.5 h-3.5 text-amber-500" />
              <span>RSS Feed</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Magazine Container */}
      <main className="max-w-[1300px] mx-auto px-4 md:px-8 pt-8 pb-20">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO = LATEST FOUNDER ENTRY (Magazine Cover Treatment)          */}
        {/* ========================================================================= */}
        {heroFounder && (
          <section className="mb-16 border-b border-zinc-800 pb-16">
            <Link 
              href={`/founder-stories/${heroFounder.slug}`}
              className="group grid lg:grid-cols-12 gap-8 lg:gap-12 rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/80 via-zinc-900/40 to-zinc-950/80 p-6 sm:p-10 hover:border-amber-500/50 transition-all duration-500 shadow-2xl overflow-hidden relative"
            >
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
              
              {/* Left Column: 4:5 Portrait Magazine Cover Image */}
              <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
                <Image
                  src={heroFounder.cardImage || heroFounder.imageUrl}
                  alt={`${heroFounder.name}, ${heroFounder.role} of ${heroFounder.company} — UpForge Verified Founder`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                
                {/* Cover Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 text-zinc-950 bg-amber-400 font-mono text-[10px] font-black uppercase tracking-widest rounded shadow-md">
                    COVER STORY
                  </span>
                  {heroFounder.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-zinc-950/90 px-2.5 py-1 rounded border border-emerald-500/30 backdrop-blur-xs">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-zinc-200 font-mono text-xs">
                  <p className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">{heroFounder.category || "AI & TECHNOLOGY"}</p>
                </div>
              </div>

              {/* Right Column: Magazine Masthead & Pull Quote */}
              <div className="lg:col-span-7 flex flex-col justify-between py-2 space-y-6">
                <div>
                  {/* Eyebrow Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-amber-400 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                      {heroFounder.category || "AI & TECHNOLOGY"}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      UFRN Code: <strong className="text-zinc-200">{heroFounder.ufrnCode || "UF-2026-US-XXXXX"}</strong>
                    </span>
                  </div>

                  {/* Giant Serif Name Headline */}
                  <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-zinc-50 leading-[1.04] tracking-tight group-hover:text-amber-400 transition-colors mb-3">
                    {heroFounder.name}
                  </h1>

                  {/* Role / Company Subheading */}
                  <p className="font-sans font-bold text-xl sm:text-2xl text-amber-400/90 tracking-wide mb-6">
                    {heroFounder.role} of {heroFounder.company}
                  </p>

                  {/* 1-2 Line Pull Quote Description */}
                  <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-sm mb-6">
                    <blockquote className="font-serif italic text-xl sm:text-2xl text-zinc-200 leading-relaxed">
                      "{heroFounder.oneLiner || heroFounder.deck}"
                    </blockquote>
                  </div>

                  {heroFounder.headline && (
                    <p className="font-serif text-base text-zinc-400 leading-relaxed max-w-2xl line-clamp-3">
                      {heroFounder.headline}
                    </p>
                  )}
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <span>Published {heroFounder.publishedAt}</span>
                    <span>•</span>
                    <span>{heroFounder.city || "San Francisco"}</span>
                  </div>

                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all group-hover:translate-x-1 shadow-lg">
                    Read Full Cover Story <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: LATEST FOUNDERS HORIZONTAL STRIP                               */}
        {/* ========================================================================= */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
                Latest Verified Founders
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-semibold">
                Updated Daily
              </span>
            </div>

            <Link
              href="/founder-stories"
              className="font-mono text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
            >
              View All Founder Stories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {latestFoundersStrip.map((f) => (
              <Link
                key={f.id}
                href={`/founder-stories/${f.slug}`}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col shadow-lg"
              >
                <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden">
                  <Image
                    src={f.cardImage || f.imageUrl}
                    alt={`${f.name}, ${f.role} of ${f.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-950/90 text-amber-400 border border-zinc-800">
                      {f.category || "FOUNDER"}
                    </span>
                    {f.verified && (
                      <span className="text-emerald-400 bg-zinc-950/90 p-1 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {f.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 line-clamp-1">
                      {f.role} • {f.company}
                    </p>
                  </div>
                  <p className="font-serif text-xs text-zinc-400 line-clamp-2 italic">
                    "{f.oneLiner || f.deck}"
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Strip */}
        <div className="mb-20">
          <TrustStrip />
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: GLOBAL STARTUP REGISTRY INDEX                                  */}
        {/* ========================================================================= */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
              Verified Global Startup Index
            </h2>
            <Link
              href="/registry"
              className="font-mono text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
            >
              Explore Full Registry <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ForbesIndex startups={indexStartups} />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: STARTUP INTELLIGENCE JOURNAL                                    */}
        {/* ========================================================================= */}
        <section className="mb-20">
          <StartupIntelligenceJournal />
        </section>

      </main>

      {/* Register Startup Banner */}
      <section className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border-t border-zinc-800 py-16">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-2">VERIFIED GLOBAL REGISTRY</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-zinc-50 mb-3">
                Register Your Startup Globally
              </h2>
              <p className="text-zinc-400 text-base max-w-xl">
                Get your official UFRN credential. Appear in the global founder database. Attract international investors. Takes 5 minutes.
              </p>
            </div>
            <Link
              href="/submit"
              className="font-mono font-bold text-xs text-zinc-950 bg-amber-500 hover:bg-amber-400 px-8 py-4 rounded-xl uppercase tracking-widest transition-all shrink-0 whitespace-nowrap shadow-xl"
            >
              Apply For Listing →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import { FOUNDERS, getAllCategories } from "@/lib/founders/data"
import { FounderCard } from "@/components/founder-stories/founder-card"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"
import { JsonLd } from "@/components/seo/json-ld"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.upforge.org/founder-stories"

  return {
    title: "Founder Stories & Intelligence — The Founder Chronicle | UpForge",
    description: "Deep-dive editorial profiles of top tech founders, CEOs, and unicorn builders. Verified credentials, leadership analysis, and real stories.",
    keywords: [
      "founder stories", "startup founders", "entrepreneur profiles",
      "global unicorn founders", "founder interviews", "AI founders",
      "tech billionaires", "startup success stories", "UpForge Founder Chronicle"
    ],
    alternates: { 
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Founder Stories & Intelligence — The Founder Chronicle | UpForge",
      description: "Editorial deep-dives into the founders building tomorrow's economy.",
      url: canonicalUrl,
      siteName: "UpForge",
      type: "website",
      images: [{
        url: "https://images.upforge.org/Magazine/michael-truell-cursor-founder-news.jpg",
        width: 1200,
        height: 675,
        alt: "UpForge Founder Chronicle Cover"
      }]
    },
    twitter: {
      card: "summary_large_image",
      site: "@UpForgeHQ",
      title: "The Founder Chronicle — UpForge",
      description: "Deep-dive founder profiles. Real stories, verified data.",
    },
    robots: { index: true, follow: true }
  }
}

export default async function FounderStoriesPage() {
  const categories = getAllCategories()
  const latestHeroFounder = FOUNDERS[0]
  const restFounders = FOUNDERS.slice(1)

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "The Founder Chronicle — UpForge",
    "description": "Editorial profiles of startup founders building the future economy",
    "url": "https://www.upforge.org/founder-stories",
    "numberOfItems": FOUNDERS.length,
    "itemListElement": FOUNDERS.map((founder, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.upforge.org/founder-stories/${founder.slug}`,
      "name": `${founder.name} — ${founder.role} of ${founder.company}`
    }))
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.upforge.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Founder Stories",
        "item": "https://www.upforge.org/founder-stories"
      }
    ]
  }

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <div className="bg-background text-foreground min-h-screen selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-200">
        
        {/* Breadcrumb / Top Bar - Hidden on mobile view */}
        <div className="hidden md:block border-b border-border bg-background/95 backdrop-blur-md sticky top-14 z-30">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between font-mono text-xs text-muted-foreground">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-xs">
              <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold">Founder Stories</span>
            </nav>

            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:inline">
              FOUNDER CHRONICLE • {FOUNDERS.length} VERIFIED
            </span>
          </div>
        </div>

        <main className="max-w-[1300px] mx-auto px-4 md:px-8 py-6 sm:py-10">
          
          {/* Header Masthead Banner */}
          <section className="text-center py-6 border-b border-border mb-8">
            <span className="inline-block text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-3">
              THE FOUNDER CHRONICLE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">
              Verified Founder Intelligence
            </h1>
            <p className="font-serif text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Deep-dive editorial profiles of the world's most consequential founders, CEOs, and technology pioneers.
            </p>
          </section>

          {/* Compact Horizontal Scroll Category Filter Bar */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
                Filter By Category
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {categories.length} Categories ({FOUNDERS.length} Profiles)
              </span>
            </div>
            
            {/* Sleek Horizontal Scrollable Pills */}
            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                <Link
                  href="/founder-stories"
                  className="shrink-0 px-3.5 py-1.5 rounded-full bg-amber-500 text-black font-mono text-xs font-bold transition-all shadow-sm"
                >
                  All ({FOUNDERS.length})
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/founder-stories/category/${cat.slug}`}
                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-card border border-border text-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 font-mono text-xs transition-all snap-start"
                  >
                    {cat.name} <span className="text-muted-foreground font-normal">({cat.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Cover Story Hero */}
          {latestHeroFounder && (
            <section className="mb-14">
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
                <h2 className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  LATEST COVER STORY
                </h2>
                <div className="flex-1" />
                <span className="font-mono text-xs text-muted-foreground hidden sm:inline">Published {latestHeroFounder.publishedAt}</span>
              </div>

              <Link 
                href={`/founder-stories/${latestHeroFounder.slug}`}
                className="group grid lg:grid-cols-12 gap-6 lg:gap-10 rounded-2xl border border-border bg-card p-5 sm:p-8 hover:border-amber-500/50 transition-all duration-500 shadow-md overflow-hidden"
              >
                {/* 4:5 Portrait Card Image */}
                <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden bg-muted border border-border shadow-lg">
                  <Image
                    src={latestHeroFounder.cardImage || latestHeroFounder.imageUrl}
                    alt={`${latestHeroFounder.name}, ${latestHeroFounder.role} of ${latestHeroFounder.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/80 text-amber-300 border border-zinc-700">
                    {latestHeroFounder.category || "COVER STORY"}
                  </span>
                </div>

                {/* Info & One-Liner */}
                <div className="lg:col-span-7 flex flex-col justify-between py-1 space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {latestHeroFounder.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED FOUNDER
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif font-black text-2xl sm:text-4xl text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight mb-2">
                      {latestHeroFounder.name}
                    </h2>
                    <p className="font-sans font-bold text-lg sm:text-xl text-amber-600 dark:text-amber-400/90 mb-4">
                      {latestHeroFounder.role} of {latestHeroFounder.company}
                    </p>

                    <p className="font-serif italic text-base sm:text-xl text-foreground leading-relaxed mb-4">
                      "{latestHeroFounder.oneLiner || latestHeroFounder.deck}"
                    </p>

                    {latestHeroFounder.headline && (
                      <p className="font-serif text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {latestHeroFounder.headline}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{latestHeroFounder.city || "San Francisco"} • Est. {latestHeroFounder.founded || "2022"}</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs sm:text-sm">
                      Read Cover Story <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Founders Grid Index */}
          <section className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                All Verified Founders
              </h2>
              <div className="flex-1" />
              <span className="font-mono text-xs text-muted-foreground">Sorted by Latest Published</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {restFounders.map((f) => (
                <FounderCard key={f.id} founder={f} />
              ))}
            </div>
          </section>

        </main>

        <FounderNewsletter />
      </div>
    </>
  )
}

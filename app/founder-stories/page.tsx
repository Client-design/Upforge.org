import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ShieldCheck, Rss } from "lucide-react"
import { FOUNDERS, getAllCategories, getCategorySlug } from "@/lib/founders/data"
import { FounderCard } from "@/components/founder-stories/founder-card"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"
import { JsonLd } from "@/components/seo/json-ld"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.upforge.org/founder-stories"

  return {
    title: "Founder Stories & Intelligence — The Founder Chronicle | UpForge",
    description: "Deep-dive editorial profiles of top tech founders, CEOs, and unicorn builders. Verified UFRN credentials, leadership analysis, and real stories.",
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

      <div className="bg-[#09090b] min-h-screen text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Breadcrumb / Top Bar */}
        <div className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between font-mono text-xs text-zinc-400">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">Founder Stories</span>
            </nav>

            <Link
              href="/founder-stories/feed.xml"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors text-xs font-mono"
            >
              <Rss className="w-3.5 h-3.5 text-amber-500" />
              <span>RSS Feed</span>
            </Link>
          </div>
        </div>

        <main className="max-w-[1300px] mx-auto px-4 md:px-8 py-8">
          
          {/* Header Banner */}
          <section className="text-center py-6 border-b border-zinc-800 mb-10">
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
              THE FOUNDER CHRONICLE
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-50 tracking-tight mb-3">
              Verified Founder Intelligence
            </h1>
            <p className="font-serif text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Deep-dive editorial profiles of the world's most consequential founders, CEOs, and technology pioneers.
            </p>
          </section>

          {/* Featured Latest Hero Entry */}
          {latestHeroFounder && (
            <section className="mb-14">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
                <h2 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  LATEST COVER STORY
                </h2>
                <div className="flex-1" />
                <span className="font-mono text-xs text-zinc-500">Published {latestHeroFounder.publishedAt}</span>
              </div>

              <Link 
                href={`/founder-stories/${latestHeroFounder.slug}`}
                className="group grid lg:grid-cols-12 gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 hover:border-amber-500/50 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* 4:5 Portrait Card Image */}
                <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl">
                  <Image
                    src={latestHeroFounder.cardImage || latestHeroFounder.imageUrl}
                    alt={`${latestHeroFounder.name}, ${latestHeroFounder.role} of ${latestHeroFounder.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded bg-zinc-950/90 text-amber-400 border border-zinc-700">
                    {latestHeroFounder.category || "COVER STORY"}
                  </span>
                </div>

                {/* Info & One-Liner */}
                <div className="lg:col-span-7 flex flex-col justify-between py-2 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {latestHeroFounder.verified && (
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED FOUNDER
                        </span>
                      )}
                      <span className="font-mono text-xs text-zinc-400">
                        UFRN: <strong className="text-amber-400">{latestHeroFounder.ufrnCode || "UF-2026-VERIFIED"}</strong>
                      </span>
                    </div>

                    <h2 className="font-serif font-black text-3xl sm:text-4xl text-zinc-50 group-hover:text-amber-400 transition-colors leading-tight mb-2">
                      {latestHeroFounder.name}
                    </h2>
                    <p className="font-sans font-bold text-xl text-amber-400/90 mb-4">
                      {latestHeroFounder.role} of {latestHeroFounder.company}
                    </p>

                    <p className="font-serif italic text-lg sm:text-xl text-zinc-300 leading-relaxed mb-6">
                      "{latestHeroFounder.oneLiner || latestHeroFounder.deck}"
                    </p>

                    {latestHeroFounder.headline && (
                      <p className="font-serif text-base text-zinc-400 leading-relaxed line-clamp-3">
                        {latestHeroFounder.headline}
                      </p>
                    )}
                  </div>

                  <div className="pt-6 border-t border-zinc-800 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-400">{latestHeroFounder.city || "San Francisco"} • Est. {latestHeroFounder.founded || "2022"}</span>
                    <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-sm">
                      Read Cover Story <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Category Tabs */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">Filter By Category</h2>
              <span className="font-mono text-xs text-zinc-500">{FOUNDERS.length} Total Founders</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/founder-stories/category/${cat.slug}`}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/40 hover:text-amber-400 font-mono text-xs transition-all"
                >
                  {cat.name} <span className="text-zinc-500 font-normal">({cat.count})</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Founders Grid Index */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
              <h2 className="font-serif text-2xl font-bold text-zinc-100">
                All Verified Founders
              </h2>
              <div className="flex-1" />
              <span className="font-mono text-xs text-zinc-400">Sorted by Latest Published</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

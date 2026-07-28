import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck, CheckCircle2, Award } from "lucide-react"
import {
  getFounderBySlug,
  getRelatedFounders,
  getAdjacentFounders,
  getAllFounders,
  getCategorySlug
} from "@/lib/founders/data"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"
import { JsonLd } from "@/components/seo/json-ld"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { founders } = getAllFounders(1, 200)
  return founders.map(founder => ({ slug: founder.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const founder = getFounderBySlug(slug)

  if (!founder) return {}

  const baseUrl = "https://www.upforge.org"
  const url = `${baseUrl}/founder-stories/${slug}`

  const cardImg = founder.cardImage || founder.imageUrl
  const newsImg = founder.newsImage || founder.imageUrl

  const title = `${founder.name} — ${founder.role} of ${founder.company} | UpForge Founder Story`
  const description = `${founder.oneLiner || founder.deck} Built by ${founder.name} (${founder.company}). Verified on UpForge.`

  return {
    title,
    description,
    keywords: [
      `${founder.name} story`,
      `${founder.company} founder`,
      `${founder.company} net worth`,
      `${founder.name} ${founder.company}`,
      `how ${founder.name} built ${founder.company}`,
      `${founder.category || "startup founders"}`,
      `${founder.country} tech founders 2026`,
      `The Founder Chronicle UpForge`
    ],
    alternates: {
      canonical: url,
      languages: {
        'en': url,
        'x-default': url
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpForge",
      locale: "en_US",
      type: "article",
      publishedTime: founder.publishedAt,
      modifiedTime: founder.updatedAt || founder.publishedAt,
      authors: ["UpForge Editorial"],
      tags: [founder.company, founder.name, founder.category || "Startups", "Founder Story"],
      images: [{
        url: newsImg,
        width: 1200,
        height: 675,
        alt: `${founder.name}, ${founder.role} of ${founder.company} — UpForge Verified Founder Article Image`
      }]
    },
    twitter: {
      card: "summary_large_image",
      site: "@UpForgeHQ",
      creator: "@UpForgeHQ",
      title,
      description,
      images: [newsImg]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  }
}

export default async function FounderPage({ params }: PageProps) {
  const { slug } = await params
  const founder = getFounderBySlug(slug)
  const baseUrl = "https://www.upforge.org"

  if (!founder) notFound()

  const categorySlug = getCategorySlug(founder.category)
  const relatedFounders = getRelatedFounders(slug, 4)
  const { prev, next } = getAdjacentFounders(slug)

  const cardImg = founder.cardImage || founder.imageUrl
  const newsImg = founder.newsImage || founder.imageUrl

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": founder.name,
    "jobTitle": founder.role,
    "worksFor": {
      "@type": "Organization",
      "name": founder.company
    },
    "image": cardImg,
    "description": founder.oneLiner || founder.deck
  }

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/founder-stories/${slug}`
    },
    "headline": `${founder.name}: ${founder.headline || founder.oneLiner}`,
    "description": founder.oneLiner || founder.deck,
    "image": [
      newsImg
    ],
    "datePublished": founder.publishedAt,
    "dateModified": founder.updatedAt || founder.publishedAt,
    "inLanguage": "en-US",
    "author": {
      "@type": "Organization",
      "name": "UpForge Editorial",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "UpForge",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 600,
        "height": 60
      }
    },
    "about": {
      "@type": "Person",
      "name": founder.name,
      "jobTitle": founder.role,
      "worksFor": {
        "@type": "Organization",
        "name": founder.company
      }
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Founder Stories",
        "item": `${baseUrl}/founder-stories`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": founder.category || "Category",
        "item": `${baseUrl}/founder-stories/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": founder.name,
        "item": `${baseUrl}/founder-stories/${slug}`
      }
    ]
  }

  return (
    <>
      <JsonLd data={[personSchema, newsArticleSchema, breadcrumbSchema]} />

      <div className="bg-[#09090b] min-h-screen text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">

        {/* Editorial Sub-Header / Breadcrumbs Bar */}
        <div className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-zinc-400">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/founder-stories" className="hover:text-amber-400 transition-colors">Founder Stories</Link>
              <span>/</span>
              <Link href={`/founder-stories/category/${categorySlug}`} className="hover:text-amber-400 transition-colors text-amber-400/90 font-semibold">
                {founder.category || "General"}
              </Link>
              <span>/</span>
              <span className="text-zinc-200 font-semibold truncate max-w-[200px] sm:max-w-none">{founder.name}</span>
            </nav>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-wider border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                VERIFIED PROFILE
              </span>
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">{founder.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Main Editorial Masthead Section */}
        <main className="max-w-[1300px] mx-auto px-4 md:px-8 pt-8 pb-20">

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 pb-16 border-b border-zinc-800">

            {/* Left Column — Main Story & Header */}
            <div>
              {/* Category Eyebrow & UFRN Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  href={`/founder-stories/category/${categorySlug}`}
                  className="text-[11px] font-mono font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                >
                  {founder.category || "AI & TECHNOLOGY"}
                </Link>
                {founder.verified && (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <strong className="text-amber-400">VERIFIED FOUNDER</strong>
                  </span>
                )}

              </div>

              {/* Single H1 Tag */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-50 leading-[1.06] tracking-tight mb-4">
                {founder.name}
              </h1>

              {/* Styled Subheading for Role & Company */}
              <p className="font-sans font-bold text-xl sm:text-2xl text-amber-400/90 tracking-wide mb-6">
                {founder.role} of {founder.company}
              </p>

              {/* Editorial Deck / One-Liner */}
              <div className="p-5 sm:p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 mb-8 backdrop-blur-sm">
                <p className="font-serif italic text-lg sm:text-xl text-zinc-300 leading-relaxed">
                  "{founder.oneLiner || founder.deck}"
                </p>
              </div>

              {/* Byline and Context Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 border-y border-zinc-800/80 mb-8 font-mono text-xs text-zinc-400">
                <span>By <strong className="text-zinc-200">UpForge Editorial</strong></span>
                <span>•</span>
                <span>{founder.city || "San Francisco"}, {founder.country || "United States"}</span>
                <span>•</span>
                <span>Published {founder.publishedAt}</span>
                {founder.valuation && (
                  <>
                    <span>•</span>
                    <span>Valuation: <strong className="text-emerald-400">{founder.valuation}</strong></span>
                  </>
                )}
              </div>

              {/* Mobile Portrait Card Image */}
              <div className="lg:hidden mb-10">
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                  <Image
                    src={cardImg}
                    alt={`${founder.name}, ${founder.role} of ${founder.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-serif font-bold text-xl text-zinc-100">{founder.name}</p>
                    <p className="text-amber-400 text-xs font-mono font-semibold uppercase">{founder.role} • {founder.company}</p>
                  </div>
                </div>
              </div>

              {/* Editorial Body Content Columns */}
              {founder.columns && founder.columns.length > 0 ? (
                <div className="space-y-10">
                  {founder.columns.map((col, idx) => (
                    <div key={idx} className="border-l-2 border-amber-500/40 pl-5 sm:pl-6 py-1">
                      <h2 className="font-serif text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
                        {col.heading}
                      </h2>
                      {col.body.split("\n\n").map((paragraph, pIdx) => (
                        <p key={pIdx} className="font-serif text-base sm:text-lg text-zinc-300 leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 font-serif text-lg text-zinc-300 leading-relaxed">
                  <p>
                    {founder.name} has emerged as one of the defining voices in {founder.category || "modern technology"}, steering {founder.company} into a powerhouse of innovation and operational excellence.
                  </p>
                  <p>
                    {founder.headline}
                  </p>
                  <p>
                    Under {founder.name}'s leadership as {founder.role}, {founder.company} continues to redefine industry standards, combining technical depth with relentless focus on user outcomes.
                  </p>
                </div>
              )}

              {/* Pull Quote Block */}
              {founder.pullQuote && (
                <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-amber-500/10 font-serif text-8xl leading-none select-none">“</div>
                  <blockquote className="font-serif italic text-xl sm:text-2xl text-zinc-100 leading-relaxed max-w-2xl mx-auto relative z-10">
                    "{founder.pullQuote}"
                  </blockquote>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                    — {founder.pullQuoteBy || founder.name}, {founder.company}
                  </p>
                </div>
              )}

              {/* Takeaway / Lesson */}
              {founder.lesson && (
                <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    FOUNDER LESSON & TAKEAWAY
                  </h3>
                  <p className="font-serif italic text-zinc-200 text-base leading-relaxed">
                    {founder.lesson}
                  </p>
                </div>
              )}
            </div>

            {/* Right Sidebar — Desktop Cover & Intelligence Cards */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-6">

                {/* 4:5 Magazine Cover Card */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
                  <Image
                    src={cardImg}
                    alt={`${founder.name}, ${founder.role} of ${founder.company} — UpForge Verified Founder`}
                    fill
                    sizes="400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500 text-zinc-950 mb-2">
                      {founder.category || "AI & TECHNOLOGY"}
                    </span>
                    <h3 className="font-serif font-black text-2xl text-zinc-50">{founder.name}</h3>
                    <p className="text-zinc-300 font-mono text-xs mt-1">{founder.role} • {founder.company}</p>
                  </div>
                </div>

                {/* Verification & Key Metrics Card */}
                <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">VERIFICATION</span>
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-mono font-bold">
                      <ShieldCheck className="w-4 h-4" /> VERIFIED
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">UFRN Code</span>
                      <span className="text-amber-400 font-bold">{founder.ufrnCode || `UF-2026-${founder.countryCode || 'US'}-XXXXX`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Company</span>
                      <span className="text-zinc-200 font-semibold">{founder.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Founded</span>
                      <span className="text-zinc-200">{founder.founded || "2022"}</span>
                    </div>
                    {founder.valuation && (
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Valuation</span>
                        <span className="text-emerald-400 font-bold">{founder.valuation}</span>
                      </div>
                    )}
                    {founder.funding && (
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Total Funding</span>
                        <span className="text-zinc-200">{founder.funding}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Newsletter Box */}
                <div className="p-5 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center">
                  <h4 className="font-serif font-bold text-base text-zinc-100 mb-2">Founder Intelligence Weekly</h4>
                  <p className="text-xs text-zinc-400 mb-4 font-sans">Get deep-dive founder profiles & verified startup data sent to your inbox.</p>
                  <Link
                    href="/newsletter"
                    className="inline-block w-full py-2.5 px-4 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Subscribe Free
                  </Link>
                </div>

              </div>
            </aside>
          </div>

          {/* Related Founders Internal Linking Section */}
          {relatedFounders.length > 0 && (
            <section className="mt-16 pt-12 border-t border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
                    Related {founder.category || "Technology"} Founders
                  </h2>
                  <p className="text-xs font-mono text-zinc-400 mt-1">Explore verified founder profiles in the same category</p>
                </div>
                <Link
                  href={`/founder-stories/category/${categorySlug}`}
                  className="font-mono text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
                >
                  View Category Hub <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedFounders.map((rf) => (
                  <Link
                    key={rf.id}
                    href={`/founder-stories/${rf.slug}`}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden">
                      <Image
                        src={rf.cardImage || rf.imageUrl}
                        alt={`${rf.name}, ${rf.role} of ${rf.company} — UpForge Verified Founder`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900/90 text-amber-400 border border-zinc-700">
                        {rf.category || "FOUNDER"}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                          {rf.name}
                        </h3>
                        <p className="font-mono text-xs text-zinc-400 mt-0.5 line-clamp-1">
                          {rf.role} • {rf.company}
                        </p>
                      </div>
                      <p className="font-sans text-xs text-zinc-400 line-clamp-2 mt-3 italic">
                        "{rf.oneLiner || rf.deck}"
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next Founder Pagination Links */}
          <div className="flex items-center justify-between gap-4 mt-12 py-6 border-t border-b border-zinc-800 font-mono text-xs">
            {prev ? (
              <Link
                href={`/founder-stories/${prev.slug}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors truncate max-w-[45%]"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span className="truncate">Prev: <strong className="text-zinc-200">{prev.name}</strong></span>
              </Link>
            ) : <div />}

            <Link href="/founder-stories" className="text-zinc-500 hover:text-zinc-300 font-bold uppercase tracking-widest text-[11px] shrink-0">
              All Founders Index
            </Link>

            {next ? (
              <Link
                href={`/founder-stories/${next.slug}`}
                className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors truncate max-w-[45%]"
              >
                <span className="truncate">Next: <strong className="text-zinc-200">{next.name}</strong></span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </Link>
            ) : <div />}
          </div>

        </main>

        <FounderNewsletter />
      </div>
    </>
  )
}

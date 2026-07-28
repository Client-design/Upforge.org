import { Metadata } from "next" 
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, CheckCircle2, ArrowRight, Rss } from "lucide-react"
import { 
  getAllCategories, 
  getFoundersByCategory,
  getCategorySlug
} from "@/lib/founders/data"
import { JsonLd } from "@/components/seo/json-ld"
import { FounderNewsletter } from "@/components/founder-stories/founder-newsletter"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(cat => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const categories = getAllCategories()
  const matchedCat = categories.find(c => c.slug === categorySlug)
  
  if (!matchedCat) {
    return {
      title: "Founder Stories Category | UpForge",
      description: "Explore verified founder stories and intelligence across global startup categories."
    }
  }

  const baseUrl = "https://www.upforge.org"
  const url = `${baseUrl}/founder-stories/category/${categorySlug}`
  const title = `${matchedCat.name} Founder Stories & Intelligence | UpForge`
  const description = `Explore ${matchedCat.count} verified founder profiles, leadership analysis, and startup data in ${matchedCat.name} on UpForge.`

  return {
    title,
    description,
    keywords: [
      `${matchedCat.name} founders`,
      `${matchedCat.name} startups 2026`,
      `${matchedCat.name} CEOs`,
      `verified ${matchedCat.name} profiles`,
      `UpForge ${matchedCat.name}`
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpForge",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params
  const categories = getAllCategories()
  const currentCat = categories.find(c => c.slug === categorySlug)
  
  if (!currentCat) notFound()

  const founders = getFoundersByCategory(categorySlug)
  const baseUrl = "https://www.upforge.org"
  const pageUrl = `${baseUrl}/founder-stories/category/${categorySlug}`

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${currentCat.name} Founder Stories`,
    "description": `Verified founder profiles and editorial analysis for ${currentCat.name}.`,
    "url": pageUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": founders.length,
      "itemListElement": founders.map((f, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${baseUrl}/founder-stories/${f.slug}`,
        "name": `${f.name} — ${f.role} of ${f.company}`
      }))
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
        "name": currentCat.name,
        "item": pageUrl
      }
    ]
  }

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />

      <div className="bg-[#09090b] min-h-screen text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
        
        {/* Sub-Header / Breadcrumb */}
        <div className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between font-mono text-xs text-zinc-400">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/founder-stories" className="hover:text-amber-400 transition-colors">Founder Stories</Link>
              <span>/</span>
              <span className="text-amber-400 font-semibold">{currentCat.name}</span>
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

        <main className="max-w-[1300px] mx-auto px-4 md:px-8 py-10">
          {/* Header Banner */}
          <div className="mb-12 border-b border-zinc-800 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                CATEGORY HUB
              </span>
              <span className="font-mono text-xs text-zinc-500">
                {founders.length} Verified Profile{founders.length === 1 ? '' : 's'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-50 tracking-tight mb-4">
              {currentCat.name} Founder Stories
            </h1>

            <p className="font-serif text-lg text-zinc-400 max-w-3xl leading-relaxed">
              Verified founder intelligence, executive leadership profiles, and operational breakdowns of top entrepreneurs in {currentCat.name}.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {founders.map((f) => (
              <Link
                key={f.id}
                href={`/founder-stories/${f.slug}`}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden">
                  <Image
                    src={f.cardImage || f.imageUrl}
                    alt={`${f.name}, ${f.role} of ${f.company} — UpForge Verified Founder`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-900/90 text-amber-400 border border-zinc-700">
                      {f.category || "FOUNDER"}
                    </span>
                    {f.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-zinc-950/90 px-2.5 py-1 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-serif font-black text-2xl text-zinc-50 group-hover:text-amber-400 transition-colors">
                      {f.name}
                    </p>
                    <p className="font-mono text-xs text-amber-400/90 font-semibold mt-1">
                      {f.role} • {f.company}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="font-serif text-sm text-zinc-300 leading-relaxed italic line-clamp-3">
                    "{f.oneLiner || f.deck}"
                  </p>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-400">
                    <span>{f.city || "San Francisco"}</span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      Read Story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Explore Other Categories */}
          <section className="pt-10 border-t border-zinc-800">
            <h2 className="font-serif text-xl font-bold text-zinc-200 mb-6">
              Explore All Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/founder-stories/category/${cat.slug}`}
                  className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                    cat.slug === categorySlug
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-amber-500/40 hover:text-amber-400"
                  }`}
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          </section>
        </main>

        <FounderNewsletter />
      </div>
    </>
  )
}

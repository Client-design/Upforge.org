// app/blog/category/[slug]/page.tsx
// Static category pages for blog taxonomy

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map(category => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = BLOG_CATEGORIES.find(c => c.slug === slug)
  if (!category) return {}

  const title = `${category.name} Articles & Guides — Startup Journal | UpForge`
  const description = `${category.description} Read data-driven articles, founder insights, and tactical guides on UpForge.`
  const url = `https://www.upforge.org/blog/category/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpForge",
      type: "website",
    },
    robots: { index: true, follow: true },
  }
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params
  const category = BLOG_CATEGORIES.find(c => c.slug === slug)
  if (!category) {
    notFound()
  }

  const posts = BLOG_POSTS.filter(post => post.categorySlug === slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Articles & Guides`,
    description: category.description,
    url: `https://www.upforge.org/blog/category/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://www.upforge.org",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        
        {/* Header */}
        <section className="border-b-2 border-foreground max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6 text-center">
          <div className="flex justify-center mb-2">
            <span className="bg-[#C59A2E]/10 border border-[#C59A2E]/30 px-3 py-0.5 text-[10px] font-mono text-[#C59A2E] rounded-md uppercase">
              Category Focus
            </span>
          </div>
          <h1
            className="text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {category.name}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-4 font-serif italic">
            {category.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-mono">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground hover:underline">
              Journal Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{category.name} ({posts.length})</span>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-[1300px] mx-auto px-6 py-12">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">Category Archive</span>
            <div className="flex-1 h-px bg-foreground" />
            <span className="font-mono text-[9px] text-muted-foreground uppercase">{posts.length} articles</span>
          </div>

          {posts.length === 0 ? (
            <div className="border border-dashed border-border p-16 text-center">
              <p className="text-muted-foreground text-sm font-serif italic">No articles published in this category yet.</p>
            </div>
          ) : (
            <div className="divide-y-2 divide-border border-b-2 border-foreground">
              {posts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 py-6 hover:bg-muted/30 transition-colors -mx-2 px-2"
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
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
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
          )}

          {/* Back to blog list */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-foreground hover:bg-muted px-6 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors"
            >
              ← View All Categories
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

// app/blog/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog-posts"
import { Filter } from "lucide-react"
import { SITE_STATS } from "@/lib/site-stats"

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredPosts = selectedCategory === "all"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.categorySlug === selectedCategory)

  const featuredPosts = filteredPosts.filter(p => p.featured)
  const regularPosts = filteredPosts

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">

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

        <div className="max-w-[1300px] mx-auto px-6 py-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1 text-xs font-mono uppercase border transition-all ${
                  selectedCategory === "all"
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
                }`}
              >
                All Articles
              </button>
              {BLOG_CATEGORIES.map(category => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-3 py-1 text-xs font-mono uppercase border transition-all ${
                    selectedCategory === category.slug
                      ? "bg-foreground text-background border-foreground font-bold"
                      : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background border border-border px-3 py-1.5 text-xs font-mono uppercase text-foreground focus:outline-none focus:border-foreground cursor-pointer"
              >
                <option value="all">Filter: All</option>
                {BLOG_CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategory !== "all" && (
            <p className="text-xs text-muted-foreground italic mt-3 font-serif">
              Showing {filteredPosts.length} reports in &ldquo;{
                BLOG_CATEGORIES.find(c => c.slug === selectedCategory)?.name
              }&rdquo;: {
                BLOG_CATEGORIES.find(c => c.slug === selectedCategory)?.description
              }
            </p>
          )}
        </div>

        <div className="max-w-[1300px] mx-auto px-6 py-8">

          {featuredPosts.length > 0 && (
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
          )}

          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
                {selectedCategory === "all" ? "All Reports" : "Category Reports"}
              </span>
              <div className="flex-1 h-px bg-foreground" />
              <span className="font-mono text-[9px] text-muted-foreground uppercase">{regularPosts.length} articles</span>
            </div>

            {regularPosts.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center">
                <p className="text-muted-foreground text-sm font-serif italic">No articles found in this category yet.</p>
              </div>
            ) : (
              <div className="divide-y-2 divide-border border-b-2 border-foreground">
                {regularPosts.map((post, idx) => (
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
            )}
          </section>

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

          <div className="mt-8 border-t-2 border-foreground pt-10 text-center">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Georgia', serif" }}>
              Get your startup verified globally
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Join {SITE_STATS.trackedStartupsText} verified startups. Get your UFRN credential. Free basic listing.
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

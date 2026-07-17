// app/about/page.tsx
// v6: Gold brand, matching header format, stats band removed, polished global UI

import { fetchAllStartups } from "@/lib/google-sheets"
import Link from "next/link"
import type { Metadata } from "next"
import {
  Shield, Users, TrendingUp, Award, BadgeCheck,
  Globe, ArrowRight, Sparkles, Calculator,
} from "lucide-react"

export const revalidate = 600

export const metadata: Metadata = {
  title: "About UpForge — India's Independent Startup Registry | UpForge",
  description:
    "UpForge is India's independent startup registry — not a media platform, not a marketplace. A permanent public record of serious builders across 30+ sectors.",
  alternates: { canonical: "https://www.upforge.org/about" },
  openGraph: {
    title: "About UpForge — India's Independent Startup Registry",
    description:
      "India's verified, structured, permanent startup registry. Free for founders. Trusted by investors and press.",
    url: "https://www.upforge.org/about",
    siteName: "UpForge",
    images: [{ url: "https://www.upforge.org/og-about.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
}

interface RegistryInsight {
  point: string;
  data: string;
}

interface MilestoneInsight {
  year: string;
  event: string;
}

interface AboutInsightsData {
  ecosystemPulse: {
    headline: string;
    stat: string;
    context: string;
  };
  whyRegistry: RegistryInsight[];
  milestones: MilestoneInsight[];
}

async function getAboutInsights(): Promise<AboutInsightsData> {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: `Return ONLY valid JSON:
            {
              "ecosystemPulse": {
                "headline": "one powerful stat or fact about Indian startup ecosystem 2026",
                "stat": "big number or %",
                "context": "brief context under 12 words"
              },
              "whyRegistry": [
                {"point": "why a startup registry matters in India", "data": "supporting stat"}
              ],
              "milestones": [
                {"year": "year", "event": "Indian startup ecosystem milestone"}
              ]
            }`,
          },
          { role: "user", content: "Give compelling data about why documenting Indian startups matters in 2026." },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  } catch {
    return {
      ecosystemPulse: {
        headline: "India is now home to the world's 3rd largest startup ecosystem",
        stat: "126 Unicorns",
        context: "and growing — ₹9.2B funded in Q1 2026 alone",
      },
      whyRegistry: [
        { point: "90% of Indian startups have zero structured digital presence",    data: "Less than 10% appear on verified databases" },
        { point: "Investors lose time verifying basic startup information",          data: "Avg 3–5 days per due diligence on basic data" },
        { point: "Founders lack institutional-grade digital credibility early on",  data: "Most rely only on LinkedIn and AngelList" },
        { point: "India's startup data is fragmented across 200+ sources",          data: "No single trusted public registry existed before" },
      ],
      milestones: [
        { year: "2016", event: "Startup India launched — 10,000 registered startups" },
        { year: "2019", event: "India crosses 50,000 DPIIT-recognized startups" },
        { year: "2021", event: "Record $42B funding — India's breakout year" },
        { year: "2023", event: "100+ unicorns, 3rd largest ecosystem globally" },
        { year: "2025", event: "72,000+ active startups, AI-led second wave begins" },
        { year: "2026", event: "UpForge becomes India's independent public registry" },
      ],
    }
  }
}

const EDITORIAL_TEAM = [
  {
    name: "Lucky Tiwari",
    role: "Founder & Editor-in-Chief",
    photo: "/lucky-tiwari.png",
    initials: "LT",
    bio: "Lucky founded UpForge with a mission to build India's first independent, data-driven startup registry. He has 5+ years of experience tracking the Indian startup ecosystem, covering 650,000+ startups across 30+ sectors. He previously built digital products for Indian SMEs and has been cited by national publications on startup policy.",
    expertise: ["Startup Ecosystem", "Venture Capital", "Founder Profiles", "Policy Analysis"],
    location: "Delhi NCR, India",
  },
  {
    name: "Anurag Tiwari",
    role: "Senior Research Analyst",
    photo: "/anurag-tiwari.png",
    initials: "AT",
    bio: "Anurag leads UpForge's deep research into fintech, edtech, and AI startups. With a background in financial analysis and a passion for Indian entrepreneurship, he has profiled 200+ funded startups and regularly tracks Q1-Q4 funding data across all verticals.",
    expertise: ["Fintech", "AI Startups", "Funding Analysis", "Unicorn Tracking"],
    location: "Delhi NCR, India",
  },
  {
    name: "Vikash Sharma",
    role: "Editorial Director — Investor Intelligence",
    photo: "/vikash-sharma.png",
    initials: "VS",
    bio: "Vikash specializes in venture capital, investor relations, and startup valuation methodology. He has mapped 200+ active VC funds and angel networks operating in India, and his coverage of VC strategies is regularly referenced by founders preparing for fundraising rounds.",
    expertise: ["Venture Capital", "Startup Valuation", "Investor Relations", "Term Sheets"],
    location: "Delhi NCR, India",
  },
  {
    name: "Vikash Yadav",
    role: "Technology & Product Analyst",
    photo: "/vikash-yadav.png",
    initials: "VY",
    bio: "Vikash covers India's deep tech, SaaS, and AI startup landscape. With hands-on experience building tech products, he brings a founder's lens to editorial coverage — analyzing product-market fit, technical moats, and the engineering talent driving India's next generation of global startups.",
    expertise: ["Deep Tech", "SaaS", "AI/ML", "Product Analysis"],
    location: "Delhi NCR, India",
  },
]

const FAQ_ITEMS = [
  { q: "What is UpForge?",                  a: "UpForge is India's independent startup registry — a free, structured, and permanently accessible public record of verified Indian startups across 30+ sectors." },
  { q: "Is UpForge free for founders?",     a: "Yes. Listing your startup on UpForge is completely free. We believe every serious builder deserves institutional-grade digital credibility without paying for it." },
  { q: "How does UpForge verify startups?", a: "Every startup profile is manually reviewed before listing. We check basic company details, founders, and operational status to ensure accuracy." },
  { q: "Is UpForge a media company?",       a: "No. UpForge is neither a media outlet nor an accelerator. We are India's neutral, independent registry — no paid rankings, no sponsored placements." },
  { q: "Who can use UpForge?",              a: "Founders use UpForge to build a verified digital paper trail. Investors use it to discover startups before they hit headlines. Press use it to cite reliable startup data." },
  { q: "How many startups are on UpForge?", a: "UpForge lists thousands of verified Indian startups and grows daily across sectors like AI/ML, FinTech, SaaS, HealthTech, Climate Tech, and more." },
]

const TRUST_QUOTES = [
  { quote: "Every serious startup needs a permanent, verifiable record. UpForge fills that gap for India.",        by: "Independent Founder · Bengaluru" },
  { quote: "We used UpForge to cite startup data in our due diligence report. Clean, structured, trustworthy.",    by: "Early-Stage Investor · Mumbai" },
  { quote: "Listed our startup before our seed round. Investors found us here first.",                             by: "Founder, Series A · Delhi NCR" },
]

const PROMISE_ITEMS = [
  { icon: BadgeCheck, label: "Manually Verified",    desc: "Every profile reviewed before listing" },
  { icon: Shield,     label: "No Paid Rankings",     desc: "Zero sponsored placements, ever" },
  { icon: Globe,      label: "Permanently Indexed",  desc: "Public, structured, always accessible" },
  { icon: Sparkles,   label: "AI-Powered Analysis",  desc: "Growth insights for every listed startup" },
  { icon: Calculator, label: "Free for Founders",    desc: "Listing, reports, and tools — always free" },
]

const PRINCIPLES = [
  { icon: Users,      title: "Built for Builders",     desc: "Every listed startup represents independent execution — no accelerator required, no VC needed to get listed." },
  { icon: Shield,     title: "Structured Credibility", desc: "Profiles are designed as institutional records, not social media posts. Data-first, editorial-grade." },
  { icon: TrendingUp, title: "Independent First",      desc: "We spotlight founders before the headlines do. UpForge is where a startup's story starts." },
  { icon: Award,      title: "Long-Term Vision",       desc: "Trust, quality, and permanence over traffic and virality. Built to last decades, not quarters." },
]

const AUDIENCE = [
  { type: "Founders",  headline: "Build your paper trail",   href: "/submit",  desc: "Get independently verified and indexed in India's most trusted startup registry." },
  { type: "Investors", headline: "Discover before the crowd", href: "/startup", desc: "Search verified startup data across 30+ sectors before they hit headlines." },
  { type: "Press",     headline: "Cite with confidence",      href: "/startup", desc: "Reliable startup data — manually verified, permanently accessible, always citable." },
]

export default async function AboutPage() {
  let totalStartups = 0
  try {
    const startups = await fetchAllStartups()
    totalStartups = startups.length
  } catch (err) {
    console.error("[About Page] Failed to fetch startup counts from google sheets:", err)
  }

  const insights = await getAboutInsights()

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.upforge.in/#organization",
        "name": "UpForge", "url": "https://www.upforge.in", "logo": "https://www.upforge.in/logo.png",
        "description": "India's independent startup registry — verified, structured, permanently accessible.",
        "foundingDate": "2025", "areaServed": "IN",
        "sameAs": ["https://www.linkedin.com/company/upforge", "https://twitter.com/upforge_in"],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "UpForge", "item": "https://www.upforge.in/" },
          { "@type": "ListItem", "position": 2, "name": "About",   "item": "https://www.upforge.in/about" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(faq => ({
          "@type": "Question", "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="bg-background min-h-screen text-foreground font-serif overflow-x-hidden">

          {/* ══════════════════════════════════════
              HEADER — Authoritative & Trust-first
          ══════════════════════════════════════ */}
          <section className="border-b-[2px] border-foreground max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6 flex flex-col items-center text-center">
            <h1
              className="mast-h1 text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              About UpForge
            </h1>
            {totalStartups > 0 && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#C59A2E] font-bold mt-2">
                Documenting {totalStartups.toLocaleString()} Verified Builders Across India
              </p>
            )}
          </section>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <main className="max-w-[1300px] mx-auto px-6 py-12 space-y-16">

          {/* ── EDITORIAL TEAM ── */}
          <section aria-label="Editorial team">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#C59A2E] text-[8px]">✦</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Editorial Team</span>
              <div className="flex-1 h-px bg-foreground" />
              <span className="font-mono text-[9px] text-muted-foreground uppercase">Expert Verified Content</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[1.5px] border-foreground bg-background">
              {EDITORIAL_TEAM.map((member, i) => (
                <div
                  key={i}
                  className={`p-6 md:p-8 flex gap-5 border-b border-foreground last:border-b-0 hover:bg-muted/30 transition-colors group ${
                    i % 2 === 0 ? "md:border-r-[1.5px]" : ""
                  }`}
                >
                  {/* Avatar Container with Pure CSS Initial Fallback */}
                  <div className="shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-foreground group-hover:border-[#C59A2E] transition-colors bg-[#C59A2E20] flex items-center justify-center font-bold text-xl text-[#C59A2E]" style={{ fontFamily: "Georgia, serif" }}>
                      {/* Initials sit in the background layer */}
                      <span className="absolute inset-0 flex items-center justify-center z-0">{member.initials}</span>
                      
                      {/* Image sits contextually above it. If it fails, the background initials remain visible */}
                      <img
                        src={member.photo}
                        alt={`${member.name} — UpForge Editorial Team`}
                        className="absolute inset-0 w-full h-full object-cover z-10 bg-background"
                      />
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-[18px] text-foreground group-hover:text-[#C59A2E] transition-colors" style={{ fontFamily: "'Georgia', serif" }}>
                        {member.name}
                      </h3>
                    </div>
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.15em] text-[#C59A2E] mb-2">{member.role}</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 font-serif italic">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {member.expertise.map(tag => (
                        <span key={tag} className="bg-muted border border-border px-2 py-0.5 text-[10px] font-mono text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    <p className="font-mono text-[9px] text-muted-foreground">📍 {member.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PROMISE STRIP ── */}
          <section aria-label="Our commitments">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#C59A2E] text-[8px]">✦</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">What We Stand For</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-[1.5px] border-foreground bg-background">
              {PROMISE_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="p-6 flex flex-col items-center text-center gap-3 hover:bg-muted transition-colors border-b lg:border-b-0 lg:border-r border-foreground last:border-0 group"
                >
                  <div className="w-10 h-10 border-[1.5px] border-foreground flex items-center justify-center bg-background group-hover:border-[#C59A2E] transition-colors">
                    <item.icon className="w-4 h-4 text-foreground group-hover:text-[#C59A2E] transition-colors" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-foreground mb-1 group-hover:text-[#C59A2E] transition-colors">{item.label}</p>
                    <p className="text-xs text-muted-foreground font-serif italic leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ECOSYSTEM PULSE ── */}
          <section aria-label="Ecosystem pulse">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Ecosystem Pulse</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-0 border-[1.5px] border-foreground bg-background">
              <div className="p-7 sm:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-foreground">
                <p
                  className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {insights.ecosystemPulse?.headline}
                </p>
                <p className="text-base text-muted-foreground font-serif italic">{insights.ecosystemPulse?.context}</p>
              </div>
              <div className="bg-muted flex flex-col items-center justify-center text-center p-7">
                <p
                  className="text-4xl sm:text-5xl font-black text-foreground mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {insights.ecosystemPulse?.stat}
                </p>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C59A2E]">& counting in India</p>
              </div>
            </div>
          </section>

          {/* ── TRUST QUOTES ── */}
          <section aria-label="What people say">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Trusted by Founders & Investors</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-foreground">
              {TRUST_QUOTES.map((tq, i) => (
                <div
                  key={i}
                  className="bg-background hover:bg-muted p-6 flex flex-col gap-4 transition-colors border-b md:border-b-0 md:border-r border-foreground last:border-0 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-4xl font-black text-[#C59A2E] leading-none mt-3 rotate-180">
                      "
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <p className="font-serif italic text-[15px] text-foreground leading-relaxed flex-1">"{tq.quote}"</p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#C59A2E] pt-4 border-t border-border">
                    — {tq.by}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHY THIS EXISTS ── */}
          <section aria-label="Why UpForge exists">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Why UpForge Exists</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[1.5px] border-foreground bg-background divide-y md:divide-y-0 md:divide-x divide-foreground">
              {/* Left — the problem */}
              <div className="p-7 sm:p-10 hover:bg-muted transition-colors group">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] bg-foreground text-background py-1 px-3 mb-5 inline-block">
                  The Problem
                </span>
                <h2
                  className="text-2xl font-bold text-foreground mb-6 leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  India's startup data was fragmented, unverified, and buried.
                </h2>
                <div className="space-y-5">
                  {insights.whyRegistry?.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-5 border-b border-border last:border-0 last:pb-0">
                      <div className="w-6 h-6 shrink-0 border border-foreground text-foreground font-mono text-[9px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <p
                          className="text-[15px] font-bold text-foreground leading-snug mb-1"
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          {item.point}
                        </p>
                        <p className="font-serif italic text-sm text-muted-foreground">{item.data}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — the answer */}
              <div className="p-7 sm:p-10 hover:bg-muted transition-colors group">
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] bg-[#C59A2E] text-background py-1 px-3 mb-5 inline-block">
                  Our Answer
                </span>
                <h2
                  className="text-2xl font-bold text-foreground mb-4 leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  One independent record. Neutral, free, permanent.
                </h2>
                <p className="text-base text-muted-foreground font-serif italic leading-relaxed mb-7">
                  UpForge is India's independent startup registry — not a media outlet, not an accelerator. We document startup data in a neutral, permanently accessible format.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: BadgeCheck, text: "Every profile manually verified before listing" },
                    { icon: Shield,     text: "No paid rankings, no sponsored placements" },
                    { icon: Globe,      text: "Publicly indexed and permanently accessible" },
                    { icon: Sparkles,   text: "AI-powered growth analysis for every startup" },
                    { icon: Calculator, text: "Free valuation tool for early-stage founders" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="w-8 h-8 shrink-0 border border-foreground flex items-center justify-center bg-background group-hover:border-[#C59A2E] transition-colors">
                        <item.icon className="w-4 h-4 text-foreground group-hover:text-[#C59A2E] transition-colors" />
                      </div>
                      <span
                        className="text-[15px] font-bold text-foreground"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── CORE PRINCIPLES ── */}
          <section aria-label="Core principles">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Core Principles</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-[1.5px] border-foreground">
              {PRINCIPLES.map((item, i) => (
                <div
                  key={i}
                  className="bg-background p-6 hover:bg-muted transition-colors border-b lg:border-b-0 lg:border-r border-foreground last:border-0 group"
                >
                  <div className="w-9 h-9 border border-foreground flex items-center justify-center mb-5 bg-background group-hover:border-[#C59A2E] transition-colors">
                    <item.icon className="w-4 h-4 text-foreground group-hover:text-[#C59A2E] transition-colors" />
                  </div>
                  <h3
                    className="text-[18px] font-bold text-foreground mb-3 group-hover:text-[#C59A2E] transition-colors"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground font-serif italic leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ECOSYSTEM MILESTONES ── */}
          <section aria-label="Ecosystem milestones">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Ecosystem Milestones</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 border-[1.5px] border-foreground bg-background">
              {insights.milestones?.map((m, i) => {
                const isLast = i === insights.milestones.length - 1
                return (
                  <div
                    key={i}
                    className={`p-5 transition-colors border-r border-b lg:border-b-0 border-foreground last:border-r-0 group ${
                      isLast ? "bg-muted hover:bg-background" : "hover:bg-muted"
                    }`}
                  >
                    <p
                      className={`text-2xl font-black mb-3 ${isLast ? "text-[#C59A2E]" : "text-foreground"}`}
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {m.year}
                    </p>
                    <p className="text-xs font-serif italic leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                      {m.event}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── WHO WE SERVE ── */}
          <section aria-label="Who uses UpForge">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Who Uses UpForge</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-[1.5px] border-foreground">
              {AUDIENCE.map((aud, i) => (
                <div
                  key={i}
                  className="p-6 group bg-background hover:bg-muted transition-colors border-b sm:border-b-0 sm:border-r border-foreground last:border-r-0"
                >
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] mb-3 text-[#C59A2E]">
                    {aud.type}
                  </p>
                  <h3
                    className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-[#C59A2E] transition-colors"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {aud.headline}
                  </h3>
                  <p className="text-[13px] text-muted-foreground font-serif italic mb-6">{aud.desc}</p>
                  <Link
                    href={aud.href}
                    className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-foreground hover:text-[#C59A2E] transition-colors group/link"
                  >
                    Explore <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section aria-label="Frequently asked questions">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-foreground whitespace-nowrap">Frequently Asked Questions</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="border-[1.5px] border-foreground bg-background">
              {FAQ_ITEMS.map((faq, i) => (
                <details
                  key={i}
                  className="group border-b border-border last:border-none hover:bg-muted transition-colors open:bg-muted"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span
                      className="font-bold text-[17px] text-foreground group-hover:text-[#C59A2E] transition-colors"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {faq.q}
                    </span>
                    <span className="font-mono text-xl text-foreground group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-[15px] text-muted-foreground font-serif italic leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── CTA BLOCK ── */}
          <section className="border-[1.5px] border-foreground bg-muted px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A2E] mb-3">UpForge Registry</p>
              <h2
                className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Your founder story starts with a verified profile.
              </h2>
              <p className="font-serif italic text-base text-muted-foreground">Free forever. Trusted by investors across India.</p>
            </div>
            <Link
              href="/submit"
              className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background py-3.5 px-7 font-bold uppercase tracking-[0.15em] font-mono transition-colors whitespace-nowrap"
            >
              List Free <ArrowRight size={14} />
            </Link>
          </section>

          {/* ── FOOTER ── */}
          <footer className="pt-8 border-t border-border">
            <p className="font-serif text-xs italic text-muted-foreground leading-relaxed mb-6 max-w-4xl">
              * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of{" "}
              {new Date().toLocaleString("default", { month: "long", year: "numeric" })}.
              UpForge is an independent registry — no paid placements, no sponsored rankings.
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em]">
                {[
                  { l: "The Founder Chronicle",  h: "/"                },
                  { l: "Startup Registry India", h: "/startup"         },
                  { l: "Indian Unicorns 2026",   h: "/indian-unicorns" },
                  { l: "The Forge — Blog",        h: "/blog"            },
                  { l: "Valuation Tool",          h: "/report"          },
                  { l: "Submit Startup",          h: "/submit"          },
                ].map(lnk => (
                  <li key={lnk.h + lnk.l}>
                    <Link href={lnk.h} className="text-muted-foreground hover:text-foreground transition-colors">
                      {lnk.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </footer>

        </main>
      </div>
    </>
  )
}

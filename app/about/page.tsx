// app/about/page.tsx
// v7 — Global registry positioning. Merges the verification/UFRN narrative
// with editorial trust-signals (team, quotes, milestones, FAQ), unified
// under one design system, with a signature animated "registry seal" and
// a live ledger ticker. Built to feel like an institution, not a template.
//
// INTEGRATION NOTES (read before dropping in):
// 1. Place the four files from components/about/* into your own
//    components/about/ directory (or adjust the import paths below).
// 2. This still calls fetchAllStartups() from "@/lib/google-sheets" and
//    SITE_STATS from "@/lib/site-stats" exactly like your existing pages —
//    wire the numeric stat targets (see STATS array) to real numbers so
//    the count-up animation reflects live data instead of the placeholders.
// 3. The getAboutInsights() Groq call is optional flavor copy for the
//    "Ecosystem Pulse" band — if you'd rather not depend on a third-party
//    LLM call at request time, delete that block and use the fallback
//    object directly (it's already written to stand alone).
// 4. Swap EDITORIAL_TEAM / FAQ_ITEMS / TRUST_QUOTES copy for your real,
//    verifiable details before shipping — placeholders are marked.

import { fetchAllStartups } from "@/lib/google-sheets"
import { SITE_STATS } from "@/lib/site-stats"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ShieldCheck, Award, FileText, CheckCircle2, Globe, ArrowRight,
  Sparkles, Building2, Users, BadgeCheck, TrendingUp,
} from "lucide-react"

import { Reveal } from "@/components/about/reveal"
import { CountUpStat } from "@/components/about/count-up-stat"
import { RegistrySeal } from "@/components/about/registry-seal"
import { LiveLedgerTicker } from "@/components/about/live-ledger-ticker"

export const revalidate = 600

export const metadata: Metadata = {
  title: "About UpForge — The Independent Global Startup Registry",
  description:
    "UpForge is the independent global startup registry and verified founder database — structured data, UFRN credentials, and ecosystem intelligence for builders, investors, and press.",
  alternates: { canonical: "https://www.upforge.org/about" },
  openGraph: {
    title: "About UpForge — The Independent Global Startup Registry",
    description:
      "The trust index for verified startups and founders worldwide. Independent, standardized, permanent.",
    url: "https://www.upforge.org/about",
    siteName: "UpForge",
    images: [{ url: "https://www.upforge.org/og/registry.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
}

// ── Optional flavor copy for the Ecosystem Pulse band ──────────────────
interface EcosystemPulse { headline: string; stat: string; context: string }

async function getEcosystemPulse(): Promise<EcosystemPulse> {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: `Return ONLY valid JSON: {"headline": "one factual, well-sourced stat about the global startup ecosystem in 2026", "stat": "big number or %", "context": "brief context under 12 words"}`,
          },
          { role: "user", content: "Give one credible, verifiable data point about why documenting startups globally matters in 2026." },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  } catch {
    return {
      headline: "Most early-stage startups have no verifiable public record until they raise",
      stat: "180+",
      context: "countries with active early-stage founders today",
    }
  }
}

// ── Static content ──────────────────────────────────────────────────────
const PILLARS = [
  {
    num: "01",
    title: "Verified Startup Registry",
    desc: "Every profile is evaluated through a multi-step verification process — corporate details, domain ownership, leadership identity, and sector classification.",
    icon: ShieldCheck,
  },
  {
    num: "02",
    title: "UFRN Credentialing",
    desc: "Verified entities receive a unique UpForge Registry Number — a permanent, audit-ready digital identity that travels with the company.",
    icon: Award,
  },
  {
    num: "03",
    title: "Founder & Creator Intelligence",
    desc: "Verified founders and builders get a trusted place to show traction, milestones, and audience — legible to investors and partners alike.",
    icon: Users,
  },
  {
    num: "04",
    title: "Independent Ecosystem Research",
    desc: "Data-driven reports and sector breakdowns for founders, investors, and policymakers — built from registry data, not press releases.",
    icon: FileText,
  },
]

const METHOD_STEPS = [
  { title: "Entity Verification", desc: "Official registration checks against the relevant national or state registry for each entity." },
  { title: "Domain & Digital Footprint", desc: "Active web presence, SSL validation, and basic operational checks." },
  { title: "Leadership Authenticity", desc: "Founder identity checks against verified professional records." },
  { title: "Product & Operations Signal", desc: "Evidence of an active product, customers, or independently verifiable media coverage." },
]

// Wire these to real numbers from SITE_STATS before shipping — the strings
// below are illustrative so the count-up has something to animate toward.
const STATS = [
  { target: 42000, suffix: "+", label: "Verified Startups & Growing" },
  { target: 650000, suffix: "+", label: "Tracked Entities in Database" },
  { target: 34, suffix: "+", label: "Industry Sectors Covered" },
  { target: 90, suffix: "+", label: "Countries Reached Globally" },
]

const MILESTONES = [
  { year: "2008", event: "First wave of globally networked startup hubs emerges outside Silicon Valley" },
  { year: "2015", event: "Public startup registries begin appearing across national governments" },
  { year: "2019", event: "Cross-border early-stage funding passes pre-2015 records" },
  { year: "2021", event: "Record global venture funding — the industry's breakout year" },
  { year: "2024", event: "AI-native startups become the fastest-growing registry category" },
  { year: "2026", event: "UpForge becomes an independent global registry standard" },
]

const TRUST_QUOTES = [
  { quote: "Every serious startup needs a permanent, verifiable record — UpForge fills that gap.", by: "Independent Founder · Placeholder" },
  { quote: "We cited registry data in a due diligence report. Clean, structured, easy to trust.", by: "Early-Stage Investor · Placeholder" },
  { quote: "Our UFRN credential was live before our seed round closed.", by: "Founder, Series A · Placeholder" },
]

const FAQ_ITEMS = [
  { q: "What is UpForge?", a: "UpForge is an independent global startup registry and verified founder database — a structured, permanently accessible public record across 30+ sectors and 90+ countries." },
  { q: "What is a UFRN?", a: "A UFRN (UpForge Registry Number) is a unique, permanent credential issued to a verified entity — an audit-ready identity that stays with the company." },
  { q: "Is UpForge free for founders?", a: "Yes. Listing on the registry is free. Verification and a UFRN credential don't require paying for placement." },
  { q: "How does UpForge verify entities?", a: "Through entity registration checks, domain and digital footprint review, leadership authenticity checks, and product or operations signal — see our full methodology." },
  { q: "Is UpForge a media company?", a: "No. UpForge is neither a media outlet nor an accelerator — a neutral registry with no paid rankings or sponsored placements." },
  { q: "Who uses UpForge?", a: "Founders build a verifiable record. Investors discover companies before they're widely covered. Press cite registry data with confidence." },
]

export default async function AboutPage() {
  let totalStartups = 0
  try {
    const startups = await fetchAllStartups()
    totalStartups = startups.length
  } catch (err) {
    console.error("[About Page] Failed to fetch startup counts:", err)
  }

  const pulse = await getEcosystemPulse()

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.upforge.org/#organization",
        name: "UpForge",
        url: "https://www.upforge.org",
        logo: "https://www.upforge.org/logo.png",
        description: "The independent global startup registry and verified founder database.",
        foundingDate: "2025",
        sameAs: ["https://www.linkedin.com/company/upforge", "https://twitter.com/upforge_in"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "UpForge", item: "https://www.upforge.org/" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://www.upforge.org/about" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      <div className="bg-background text-foreground min-h-screen font-serif overflow-x-hidden">

        {/* ══════════════ HERO ══════════════ */}
        <section className="border-b-[2px] border-foreground max-w-[1300px] mx-auto px-4 md:px-8 pt-12 pb-10 flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-6">
            <RegistrySeal size={148} />
            <div>
              {totalStartups > 0 && (
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] mb-4">
                  {totalStartups.toLocaleString()} Entities Verified & Counting
                </p>
              )}
              <h1
                className="text-3xl md:text-5xl lg:text-[56px] font-bold leading-[1.06] mb-5 max-w-4xl mx-auto"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                The Independent Global Registry for Startups &amp; Founders
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-serif italic">
                A permanent, standardized public record of verified companies and builders —
                no paid rankings, no sponsored placements, no algorithm to game.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background py-3.5 px-7 font-bold uppercase tracking-[0.15em] text-xs font-mono transition-colors"
              >
                Get Verified <ArrowRight size={14} />
              </Link>
              <Link
                href="/registry"
                className="inline-flex items-center gap-2 border-[1.5px] border-foreground hover:border-[#C59A2E] hover:text-[#C59A2E] py-3.5 px-7 font-bold uppercase tracking-[0.15em] text-xs font-mono transition-colors"
              >
                Explore Registry
              </Link>
            </div>
          </div>
        </section>

        {/* Signature ledger strip — full bleed, sits right under the hero */}
        <LiveLedgerTicker />

        <main className="max-w-[1300px] mx-auto px-6 py-16 space-y-20">

          {/* ══════════════ MISSION ══════════════ */}
          <Reveal as="section">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">
                  Section 01 — Mission
                </span>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                  Solving the Credibility Gap in the Global Ecosystem
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  UpForge is an independent global startup registry and verified founder database.
                  We provide structured data, verification infrastructure, and public credibility
                  credentials for early-stage companies, high-growth ventures, and independent builders.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Noise, unverified claims, and fragmented data make it hard for investors, partners,
                  and customers to tell a legitimate venture from a well-designed landing page.
                  UpForge exists as one standardized source of truth.
                </p>
              </div>
              <div className="border-[1.5px] border-foreground p-8 bg-muted/20">
                <div className="space-y-6">
                  {[
                    { icon: Building2, title: "Standardized Registry", desc: "Structured profiles: verified leadership, corporate details, operational status." },
                    { icon: Award, title: "UFRN Digital Credentials", desc: "Unique, permanent, audit-ready identifiers issued to verified entities." },
                    { icon: Globe, title: "Global Standard", desc: "Connecting founders to capital, international press, and enterprise partners." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 shrink-0 border border-foreground flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#C59A2E]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1" style={{ fontFamily: "'Georgia', serif" }}>{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ══════════════ CORE PILLARS ══════════════ */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[#C59A2E] text-[8px]">✦</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Section 02 — What UpForge Does</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-[1.5px] border-foreground">
              {PILLARS.map((p, i) => (
                <div
                  key={p.num}
                  className={`p-6 flex flex-col justify-between hover:bg-muted/30 transition-colors group border-b lg:border-b-0 border-foreground ${i < 3 ? "lg:border-r-[1.5px]" : ""}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] font-bold text-[#C59A2E]">{p.num}</span>
                      <p.icon className="w-4 h-4 text-foreground group-hover:text-[#C59A2E] transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-[#C59A2E] transition-colors" style={{ fontFamily: "'Georgia', serif" }}>
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ══════════════ METHODOLOGY ══════════════ */}
          <Reveal as="section">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">
                  Section 03 — Methodology
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                  How We Verify — Transparency First
                </h2>
                <p className="text-sm text-muted-foreground font-serif italic">
                  Trust is earned through clear methodology. Verification status is not for sale.
                </p>
              </div>
              <div className="border-[1.5px] border-foreground divide-y divide-border">
                {METHOD_STEPS.map((step, i) => (
                  <div key={i} className="p-5 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#C59A2E] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center pt-6">
                <Link href="/methodology" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#C59A2E] hover:underline">
                  Read Full Verification Protocol &amp; Documentation <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* ══════════════ ECOSYSTEM PULSE ══════════════ */}
          <Reveal as="section">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-0 border-[1.5px] border-foreground">
              <div className="p-7 sm:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-foreground">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">Ecosystem Pulse</span>
                <p className="text-2xl sm:text-3xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                  {pulse.headline}
                </p>
                <p className="text-base text-muted-foreground font-serif italic">{pulse.context}</p>
              </div>
              <div className="bg-muted flex flex-col items-center justify-center text-center p-7">
                <p className="text-4xl sm:text-5xl font-black mb-3" style={{ fontFamily: "'Georgia', serif" }}>{pulse.stat}</p>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#C59A2E]">Worldwide</p>
              </div>
            </div>
          </Reveal>

          {/* ══════════════ STATS BAND ══════════════ */}
          <Reveal as="section">
            <div className="text-center mb-8">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">Section 04 — Scale</span>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>Our Platform in Numbers</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-[1.5px] border-foreground">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className={`p-8 text-center border-foreground ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} lg:border-b-0 ${i < 3 ? "lg:border-r" : "lg:border-r-0"}`}
                >
                  <CountUpStat
                    target={s.target}
                    suffix={s.suffix}
                    className="block text-3xl md:text-4xl font-bold font-mono text-[#C59A2E] mb-2"
                  />
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            {SITE_STATS && (
              <p className="text-center text-[10px] text-muted-foreground font-mono mt-3">
                Figures above are placeholders — wire to SITE_STATS numeric fields for live data.
              </p>
            )}
          </Reveal>

          {/* ══════════════ MILESTONES LEDGER ══════════════ */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Ecosystem Milestones</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 border-[1.5px] border-foreground">
              {MILESTONES.map((m, i) => {
                const isLast = i === MILESTONES.length - 1
                return (
                  <div key={i} className={`p-5 border-r border-b lg:border-b-0 border-foreground last:border-r-0 transition-colors group ${isLast ? "bg-muted" : "hover:bg-muted/50"}`}>
                    <p className={`text-2xl font-black mb-3 ${isLast ? "text-[#C59A2E]" : ""}`} style={{ fontFamily: "'Georgia', serif" }}>{m.year}</p>
                    <p className="text-xs font-serif italic leading-relaxed text-muted-foreground">{m.event}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* ══════════════ EDITORIAL INDEPENDENCE ══════════════ */}
          <Reveal as="section">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">Section 05 — Trust Standards</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ fontFamily: "'Georgia', serif" }}>Editorial Independence &amp; Governance</h2>
              <div className="grid md:grid-cols-3 gap-0 border-[1.5px] border-foreground mb-8 text-left">
                {[
                  { title: "No Paid Rankings", desc: "Registry placement, spotlight features, and reports cannot be purchased." },
                  { title: "Objective Criteria", desc: "Every listing is evaluated against the same published verification standard." },
                  { title: "Transparent Corrections", desc: "When corporate data changes, records are updated and dated promptly." },
                ].map((item, i) => (
                  <div key={i} className={`p-5 border-b md:border-b-0 border-foreground ${i < 2 ? "md:border-r" : ""}`}>
                    <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/editorial-standards" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">
                View Full Editorial Independence Statement <ArrowRight size={12} />
              </Link>
            </div>
          </Reveal>

          {/* ══════════════ TRUST QUOTES ══════════════ */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Trusted by Founders &amp; Investors</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[1.5px] border-foreground">
              {TRUST_QUOTES.map((tq, i) => (
                <div key={i} className="p-6 flex flex-col gap-4 hover:bg-muted/40 transition-colors border-b md:border-b-0 md:border-r border-foreground last:border-0 group">
                  <span className="font-serif text-4xl font-black text-[#C59A2E] leading-none rotate-180">"</span>
                  <p className="font-serif italic text-[15px] leading-relaxed flex-1">"{tq.quote}"</p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#C59A2E] pt-4 border-t border-border">— {tq.by}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground font-mono mt-3">Placeholder quotes — replace with real, attributable testimonials before publishing.</p>
          </Reveal>

          {/* ══════════════ LEADERSHIP ══════════════ */}
          <Reveal as="section">
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#C59A2E] block mb-3">Section 06 — Leadership</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>Leadership &amp; Team</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                UpForge was founded to bring transparency and institutional trust to startup data —
                led by a small team of engineers, analysts, and researchers building global startup
                trust infrastructure.
              </p>
              <div className="p-6 border-[1.5px] border-foreground inline-block text-left max-w-md mx-auto">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#C59A2E] mb-2">
                  Official Inquiries &amp; Registry Board
                </div>
                <p className="text-sm font-bold mb-1">UpForge Global Registry Operations</p>
                <p className="text-xs text-muted-foreground mb-3">For corporate updates, verification appeals, or institutional partnerships.</p>
                <a href="mailto:contact@upforge.org" className="text-xs font-mono font-bold text-[#C59A2E] hover:underline">contact@upforge.org</a>
              </div>
            </div>
          </Reveal>

          {/* ══════════════ FAQ ══════════════ */}
          <Reveal as="section">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">Frequently Asked Questions</span>
              <div className="flex-1 h-px bg-foreground" />
            </div>
            <div className="border-[1.5px] border-foreground">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="group border-b border-border last:border-none hover:bg-muted/30 transition-colors open:bg-muted/30">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-bold text-[16px] group-hover:text-[#C59A2E] transition-colors" style={{ fontFamily: "'Georgia', serif" }}>{faq.q}</span>
                    <span className="font-mono text-xl group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-[15px] text-muted-foreground font-serif italic leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </Reveal>

          {/* ══════════════ CTA ══════════════ */}
          <Reveal as="section" className="border-[1.5px] border-foreground bg-muted px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A2E] mb-3">UpForge Registry</p>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Your founder story starts with a verified profile.
              </h2>
              <p className="font-serif italic text-base text-muted-foreground">Free forever. Trusted by investors across 90+ countries.</p>
            </div>
            <Link href="/submit" className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background py-3.5 px-7 font-bold uppercase tracking-[0.15em] font-mono transition-colors whitespace-nowrap">
              Get Verified <ArrowRight size={14} />
            </Link>
          </Reveal>

          {/* ══════════════ FOOTER ══════════════ */}
          <footer className="pt-8 border-t border-border">
            <p className="font-serif text-xs italic text-muted-foreground leading-relaxed mb-6 max-w-4xl">
              * Registry data sourced from national company registries, public filings, and verified
              submissions as of {new Date().toLocaleString("default", { month: "long", year: "numeric" })}.
              UpForge is an independent registry — no paid placements, no sponsored rankings.
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em]">
                {[
                  { l: "Startup Registry", h: "/registry" },
                  { l: "Methodology", h: "/methodology" },
                  { l: "Editorial Standards", h: "/editorial-standards" },
                  { l: "The Forge — Blog", h: "/blog" },
                  { l: "Submit Startup", h: "/submit" },
                ].map((lnk) => (
                  <li key={lnk.h}>
                    <Link href={lnk.h} className="text-muted-foreground hover:text-foreground transition-colors">{lnk.l}</Link>
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

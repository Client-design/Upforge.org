// app/about/page.tsx
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ShieldCheck, Award, FileText, CheckCircle2,
  Globe, ArrowRight, Sparkles, Building2, Users, Search
} from "lucide-react"
import { SITE_STATS } from "@/lib/site-stats"

export const metadata: Metadata = {
  title: "About UpForge — Independent Global Startup Registry & Founder Database",
  description:
    "UpForge is an independent global startup registry and verified founder database providing structured data, UFRN verification credentials, and ecosystem intelligence.",
  alternates: { canonical: "https://www.upforge.org/about" },
  openGraph: {
    title: "About UpForge — Independent Global Startup Registry & Founder Database",
    description:
      "The official trust index of verified startups, founders, and creators worldwide. Independent, transparent, and standardized.",
    url: "https://www.upforge.org/about",
    siteName: "UpForge",
    images: [{ url: "https://www.upforge.org/og/registry.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-background text-foreground min-h-screen">
        
        {/* HERO SECTION */}
        <section className="border-b-2 border-foreground max-w-[1300px] mx-auto px-4 md:px-8 pt-10 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59A2E]/10 border border-[#C59A2E]/30 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#C59A2E]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C59A2E]">
              Independent Trust Infrastructure
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            UpForge — The Independent Global Startup Registry &amp; Verified Founder Database
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We exist to build the most reliable, transparent, and comprehensive public record of verified startups and founders worldwide.
          </p>
        </section>

        {/* SECTION 1: OUR MISSION */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-16 border-b border-border">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-3">
                Section 01 — Mission
              </span>
              <h2
                className="text-2xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Solving the Credibility Gap in the Global Ecosystem
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                UpForge is an independent global startup registry and verified founder database. We provide structured data, verification infrastructure, and public credibility credentials for high-growth ventures, early-stage companies, and digital creators.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                While noise, unverified claims, and fragmented data make it difficult for investors, partners, and customers to identify legitimate ventures, UpForge provides a single, standardized source of truth.
              </p>
            </div>

            <div className="bg-muted/20 border-2 border-foreground p-8 rounded-xl relative">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#C59A2E]/10 border border-[#C59A2E]/30 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[#C59A2E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Standardized Registry</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Structured profiles with verified leadership, corporate details, and operational status.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#C59A2E]/10 border border-[#C59A2E]/30 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#C59A2E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">UFRN Digital Credentials</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Unique permanent audit-ready identifiers issued to verified entities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#C59A2E]/10 border border-[#C59A2E]/30 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#C59A2E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Global Standard</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Connecting founders to global capital, international media, and enterprise partners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT UPFORGE DOES */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-16 border-b border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-3">
              Section 02 — Core Pillars
            </span>
            <h2
              className="text-3xl font-bold leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              What UpForge Does
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Verified Startup Registry",
                desc: "Every profile on UpForge is evaluated through our multi-step verification process, confirming corporate details, domain ownership, leadership identity, and sector classification.",
                icon: ShieldCheck,
              },
              {
                num: "02",
                title: "UFRN Credentialing",
                desc: "We assign unique UpForge Registry Numbers (UFRN) to verified entities, creating a permanent, audit-ready digital identity for every startup.",
                icon: Award,
              },
              {
                num: "03",
                title: "Founder & Creator Intelligence",
                desc: "We track verified founders and digital creators, giving builders a trusted platform to showcase their traction, audience, and milestones.",
                icon: Users,
              },
              {
                num: "04",
                title: "Independent Ecosystem Research",
                desc: "We publish data-driven analysis, ecosystem reports, and sector breakdowns to inform founders, investors, and policymakers.",
                icon: FileText,
              },
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="border-2 border-border hover:border-[#C59A2E] p-6 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#C59A2E]">{pillar.num}</span>
                    <pillar.icon className="w-5 h-5 text-[#C59A2E]" />
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: HOW WE VERIFY */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-16 border-b border-border bg-muted/10">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-3 text-center">
              Section 03 — Methodology
            </span>
            <h2
              className="text-3xl font-bold mb-4 text-center"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              How We Verify (Transparency First)
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-10">
              We believe trust is earned through clear methodology. Verification status cannot be bought.
            </p>

            <div className="space-y-4 mb-10">
              {[
                {
                  title: "Entity Verification",
                  desc: "Official registration checks (ROC / MCA for India, state registries for global entities).",
                },
                {
                  title: "Domain & Digital Footprint",
                  desc: "Active web presence, SSL validation, and digital operational checks.",
                },
                {
                  title: "Leadership Authenticity",
                  desc: "Founder identity checks via verified profiles and professional records.",
                },
                {
                  title: "Product & Operations Signal",
                  desc: "Active product presence, customer signals, or verified media coverage.",
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-background border border-border p-5 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#C59A2E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-border pt-6">
              <Link
                href="/methodology"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C59A2E] hover:underline"
              >
                Read Full Verification Protocol &amp; Documentation →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: PLATFORM IN NUMBERS */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-16 border-b border-border">
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-3">
              Section 04 — Scale
            </span>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Our Platform in Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="border-2 border-border p-8">
              <div className="text-3xl md:text-4xl font-bold font-mono text-[#C59A2E] mb-2">
                {SITE_STATS.verifiedStartupsText}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Verified Startups &amp; Growing
              </div>
            </div>

            <div className="border-2 border-border p-8">
              <div className="text-3xl md:text-4xl font-bold font-mono text-foreground mb-2">
                {SITE_STATS.trackedStartupsText}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tracked Entities in Database
              </div>
            </div>

            <div className="border-2 border-border p-8">
              <div className="text-3xl md:text-4xl font-bold font-mono text-[#C59A2E] mb-2">
                {SITE_STATS.sectorsText}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Industry Sectors Covered
              </div>
            </div>

            <div className="border-2 border-border p-8">
              <div className="text-3xl md:text-4xl font-bold font-mono text-foreground mb-2">
                {SITE_STATS.countriesText}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Countries Reached Globally
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: EDITORIAL INDEPENDENCE */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-16 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-3 text-center">
              Section 05 — Trust Standards
            </span>
            <h2
              className="text-3xl font-bold mb-6 text-center"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Editorial Independence &amp; Governance
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="border border-border p-5">
                <h3 className="font-bold text-sm mb-2 text-foreground">No Paid Rankings</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Placement in our registry, spotlight features, or research reports cannot be purchased.
                </p>
              </div>

              <div className="border border-border p-5">
                <h3 className="font-bold text-sm mb-2 text-foreground">Objective Criteria</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All listings are evaluated strictly against standard compliance parameters.
                </p>
              </div>

              <div className="border border-border p-5">
                <h3 className="font-bold text-sm mb-2 text-foreground">Transparent Corrections</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If corporate data changes or requires updating, our team updates records promptly.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/editorial-standards"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                View Full Editorial Independence Statement →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 6: LEADERSHIP & TEAM */}
        <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-16 border-b border-border bg-muted/10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-3">
              Section 06 — Leadership
            </span>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Leadership &amp; Team
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto mb-8">
              UpForge was founded to bring transparency and institutional trust to startup data. Led by a dedicated team of engineers, data analysts, and technical researchers focused on building global startup trust infrastructure.
            </p>

            <div className="p-6 border-2 border-foreground bg-background inline-block text-left max-w-md mx-auto">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C59A2E] mb-2">
                Official Inquiries &amp; Registry Board
              </div>
              <p className="text-sm font-bold text-foreground mb-1">UpForge Global Registry Operations</p>
              <p className="text-xs text-muted-foreground mb-3">
                For corporate updates, verification appeals, or institutional partnerships.
              </p>
              <a
                href="mailto:contact@upforge.org"
                className="text-xs font-mono font-bold text-[#C59A2E] hover:underline"
              >
                contact@upforge.org
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 7: JOIN THE REGISTRY (CTA) */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-[1300px] mx-auto px-4 md:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Join the Global Registry
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8">
              Building a startup? Get your venture verified, receive your UFRN credential, and join the global founder database.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C59A2E] hover:bg-[#A8821E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Submit Your Startup <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/registry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Explore Registry
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

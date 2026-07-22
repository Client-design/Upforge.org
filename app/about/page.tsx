'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About UpForge — India\'s Independent Startup Registry',
  description: 'UpForge is an independent, verified startup registry trusted by founders, investors, and journalists. Learn our mission, team, and approach to startup verification in India.',
}

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <section className="border-b-[2px] border-foreground max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
            About UpForge
          </h1>
          <p className="text-muted-foreground font-serif italic text-base mt-4 max-w-2xl">
            An independent, verified startup registry trusted by founders, investors, and journalists worldwide.
          </p>
        </section>

        {/* Main Content */}
        <main className="max-w-[1300px] mx-auto px-4 md:px-8 py-12">
          {/* Mission */}
          <section className="mb-16 border-b-[2px] border-foreground pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-serif mb-4">
              Build the world\'s most trusted, independent registry of startups. Every founder deserves verification without bias, every investor needs transparent data, and every journalist needs reliable sources.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-serif">
              UpForge is not owned by a VC fund. Not controlled by a media company. Not incentivized to promote anyone. Just an independent, open-source platform for startup verification.
            </p>
          </section>

          {/* Core Values */}
          <section className="mb-16 border-b-[2px] border-foreground pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Independence",
                  desc: "Zero VC funding. Zero corporate ownership. We\'re funded by grants, not incentives."
                },
                {
                  title: "Verification",
                  desc: "Every startup is manually reviewed. Every founder is cross-checked. No shortcuts."
                },
                {
                  title: "Transparency",
                  desc: "Our methodology is public. Our data is auditable. We hide nothing."
                },
                {
                  title: "Access",
                  desc: "Free to list. Free to search. Forever. No paywalls. No premium tiers."
                },
              ].map((value, i) => (
                <div key={i} className="border border-border p-6">
                  <h3 className="font-bold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground font-serif text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16 border-b-[2px] border-foreground pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              By The Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { num: "650K+", label: "Registered Startups" },
                { num: "125", label: "Indian Unicorns Tracked" },
                { num: "50+", label: "Startup Sectors" },
                { num: "89", label: "Countries Represented" },
              ].map((stat, i) => (
                <div key={i} className="border border-border p-6 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[#C59A2E] mb-2">{stat.num}</p>
                  <p className="text-sm text-muted-foreground font-serif">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Editorial */}
          <section className="mb-16 border-b-[2px] border-foreground pb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              Editorial Standard
            </h2>
            <p className="text-muted-foreground font-serif leading-relaxed mb-4">
              Every startup profile on UpForge is researched and verified by our editorial team. We cross-check founders, funding announcements, and company details with public records, news archives, and founder interviews.
            </p>
            <p className="text-muted-foreground font-serif leading-relaxed">
              Our methodology is published. Our team is named. Our corrections are transparent. If we make a mistake, we fix it publicly.
            </p>
            <Link href="/editorial-standards" className="inline-flex items-center gap-2 text-[#C59A2E] hover:text-[#A8821E] mt-4 font-bold uppercase tracking-wider text-sm">
              Read Editorial Standards <ArrowRight size={16} />
            </Link>
          </section>

          {/* CTA */}
          <section className="border-[1.5px] border-foreground bg-muted px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A2E] mb-3">UpForge Registry</p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Your founder story starts with a verified profile.
              </h2>
              <p className="font-serif italic text-base text-muted-foreground">Free forever. Trusted by investors worldwide.</p>
            </div>
            <Link href="/submit" className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background py-3.5 px-7 font-bold uppercase tracking-[0.15em] font-mono transition-colors whitespace-nowrap">
              List Free <ArrowRight size={14} />
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}
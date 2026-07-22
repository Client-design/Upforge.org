'use client'

import { ArrowRight, ChevronDown, Check } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — UpForge Registry | Verified Startup Database',
  description: 'Frequently asked questions about UpForge, India\'s most trusted independent startup registry. Learn about UFRN credentials, founder profiles, and verification.',
}

const FAQs = [
  {
    q: 'What is UpForge?',
    a: 'UpForge is India\'s first independent, open-source startup registry. We maintain a comprehensive database of 650,000+ registered startups, manually verify founders and companies, and assign unique UFRN (UpForge Registry Number) credentials. Zero paid placements. Zero sponsored rankings.',
  },
  {
    q: 'What is a UFRN?',
    a: 'UFRN stands for UpForge Registry Number — a globally unique identifier assigned to every verified startup on our platform. Think of it like a serial number for startups. Format: UFRN-YYYY-CC-NNNNN (e.g., UFRN-2026-IND-00042). It\'s permanent, verifiable, and trusted by investors and journalists.',
  },
  {
    q: 'How do I get a UFRN?',
    a: 'Submit your startup profile on our registry. Provide company name, founder details, founding year, and website. Our team verifies your information within 5-7 business days. Once approved, you receive a UFRN and a permanent verified badge. Completely free.',
  },
  {
    q: 'Is UpForge really free?',
    a: 'Yes. 100% free forever. No hidden fees, no premium tiers, no "upgrade to list" nonsense. We fund the registry through partnerships and grants. Every founder gets equal access to verification.',
  },
  {
    q: 'Can I edit my profile after listing?',
    a: 'Yes. Log in to your dashboard and update company info, team members, funding details, or social links anytime. Changes are reviewed within 24 hours.',
  },
  {
    q: 'Is my data safe?',
    a: 'Completely. We comply with GDPR, India\'s Digital Personal Data Protection Act 2023, and ISO 27001. Your data is encrypted, never sold, and only used to maintain the registry.',
  },
  {
    q: 'Why should I care about UFRN?',
    a: 'A UFRN proves your startup is independently verified. When you share your UFRN in emails, pitch decks, or LinkedIn, investors and journalists instantly know you\'re legit. It\'s social proof from a trusted independent source.',
  },
  {
    q: 'How do I cite UpForge data in press?',
    a: 'Link to the specific startup profile or use the UFRN. Example: "XYZ startup (UFRN-2026-IND-00042) raised $5M Series A according to UpForge Registry." Always link back to the profile.',
  },
]

export default function FAQPage() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <section className="border-b-[2px] border-foreground max-w-[1300px] mx-auto px-4 md:px-8 w-full mt-5 pb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            FAQ
          </h1>
          <p className="text-muted-foreground font-serif italic text-base max-w-2xl mx-auto">
            Everything you need to know about UpForge, UFRN verification, and the global startup registry.
          </p>
        </section>

        <main className="max-w-[800px] mx-auto px-6 py-12">
          <div className="space-y-0 divide-y-2 divide-border border-t-2 border-foreground">
            {FAQs.map((faq, idx) => (
              <details key={idx} className="group py-6 cursor-pointer">
                <summary className="flex items-center justify-between font-serif text-lg font-bold text-foreground hover:text-[#C59A2E] transition-colors">
                  <span style={{ fontFamily: "'Georgia', serif" }}>
                    {faq.q}
                  </span>
                  <span className="font-mono text-xl text-foreground group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <div className="px-0 pb-0 pt-6">
                  <p className="text-[15px] text-muted-foreground font-serif italic leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </main>

        <section className="border-[1.5px] border-foreground bg-muted px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left max-w-[1300px] mx-auto mt-16 mb-12">
          <div className="max-w-xl">
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-[#C59A2E] mb-3">UpForge Registry</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
              Your founder story starts with a verified profile.
            </h2>
            <p className="font-serif italic text-base text-muted-foreground">Free forever. Trusted by investors across India.</p>
          </div>
          <Link href="/submit" className="shrink-0 inline-flex items-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background py-3.5 px-7 font-bold uppercase tracking-[0.15em] font-mono transition-colors whitespace-nowrap">
            List Free <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </>
  )
}
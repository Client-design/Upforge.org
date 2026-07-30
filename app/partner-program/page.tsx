import type { Metadata } from "next"
import Link from "next/link"  
import Image from "next/image"
import { Sparkles, ShieldCheck, ArrowRight, CheckCircle2, HelpCircle, Video, Gift, DollarSign, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "UpForge Partner Program | Creator & Ecosystem Network",
  description: "Learn how the UpForge Partner Program works. Transparent guidelines for creators, ecosystem partners, and analysts.",
  alternates: { canonical: "https://www.upforge.org/partner-program" },
  openGraph: {
    title: "UpForge Partner Program | Creator & Ecosystem Network",
    description: "Transparent partner program for ecosystem leads and content creators. Detailed qualification criteria and payout structures.",
    url: "https://www.upforge.org/partner-program",
    siteName: "UpForge",
    locale: "en_US",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.upforge.org/partner-program#webpage",
      "url": "https://www.upforge.org/partner-program",
      "name": "UpForge Partner Program",
      "description": "Official overview and application terms for the UpForge Partner Program.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.upforge.org" },
          { "@type": "ListItem", "position": 2, "name": "Partner Program", "item": "https://www.upforge.org/partner-program" }
        ]
      }
    }
  ]
}

const FAQ_ITEMS = [
  {
    q: "Who is eligible for the UpForge Partner Program?",
    a: "Founders, tech ecosystem creators, startup analysts, and community leaders with an active, authentic audience of founders or investors."
  },
  {
    q: "How are views and payouts verified?",
    a: "Every submission goes through manual human review and automated view-verification algorithms to prevent fraud, view farms, or bot manipulation."
  },
  {
    q: "What is required to join the Creator Program?",
    a: "Read our official book 'The Unfinished Millionaire' on Amazon, submit your Amazon Order ID for verification, and follow our official creator guidelines."
  },
  {
    q: "Is there any application fee or cost?",
    a: "Partner onboarding and review details are clear upfront. Check our process timeline for current processing timelines."
  }
]

export default function PartnerProgramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen text-foreground font-serif">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16">
          
          {/* 1. HERO SECTION */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-[#C59A2E]/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C59A2E]" />
              <span className="text-[10px] font-mono font-bold text-[#C59A2E] uppercase tracking-widest">
                Ecosystem & Creator Network
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The UpForge Partner Program
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-serif">
              An authentic rewards and distribution network connecting startup founders, ecosystem analysts, and content creators with verified intelligence.
            </p>
          </section>

          {/* 2. PROGRAM EXPLAINER GRID */}
          <section className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 border border-border bg-card">
              <Gift className="w-6 h-6 text-[#C59A2E] mb-4" />
              <h3 className="font-sans font-bold text-sm uppercase tracking-wider mb-2">What Partners Get</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Book prerequisite ('The Unfinished Millionaire'), verified creator profile, transparent rulebook, and competitive payout structures per verified view.
              </p>
            </div>
            <div className="p-6 border border-border bg-card">
              <ShieldCheck className="w-6 h-6 text-[#C59A2E] mb-4" />
              <h3 className="font-sans font-bold text-sm uppercase tracking-wider mb-2">What UpForge Gets</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Authentic ecosystem reach, human-curated startup recommendations, and transparent brand awareness across global tech communities.
              </p>
            </div>
            <div className="p-6 border border-border bg-card">
              <DollarSign className="w-6 h-6 text-[#C59A2E] mb-4" />
              <h3 className="font-sans font-bold text-sm uppercase tracking-wider mb-2">Clear Compensation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No hidden formulas. Payouts are calculated transparently based on manually verified view milestones and organic engagement.
              </p>
            </div>
          </section>

          {/* 3. VIDEO EMBED SECTION */}
          <section className="mb-16 border border-border p-6 md:p-8 bg-muted/20">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-4 h-4 text-[#C59A2E]" />
              <h2 className="font-sans font-bold text-xs uppercase tracking-widest">Program Overview & Walkthrough</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-6">Watch our 2-minute overview video on how partner verification and rewards work.</p>
            
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900 border border-border flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/VIDEO_ID_PLACEHOLDER"
                title="UpForge Partner Program Walkthrough Video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          {/* 4. ELIGIBILITY CRITERIA */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold font-serif mb-6">Eligibility & Qualification Criteria</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Active content channel or publication focused on tech, startups, software, or venture capital.",
                "Minimum organic engagement threshold without artificially inflated reach or bot networks.",
                "Commitment to editorial integrity and clear disclosure of partner relationship.",
                "Verified digital identity or entity registration (LinkedIn / institutional profile)."
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 border border-border/60 bg-background">
                  <CheckCircle2 className="w-4 h-4 text-[#C59A2E] shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. PROCESS & TIMELINE */}
          <section className="mb-16 border-t border-border pt-12">
            <h2 className="text-2xl font-bold font-serif mb-6">Application Process & Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 border border-border bg-card">
                <div className="font-mono text-sm font-bold text-[#C59A2E]">Step 1</div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-1">Submit Application</h4>
                  <p className="text-xs text-muted-foreground">Fill out the partner registration form with your channel links and audience focus. Turnaround time: [X] business days.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border border-border bg-card">
                <div className="font-mono text-sm font-bold text-[#C59A2E]">Step 2</div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-1">Channel Verification & Review</h4>
                  <p className="text-xs text-muted-foreground">Our review team audits audience metrics and content quality. Approved partners receive access credentials.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border border-border bg-card">
                <div className="font-mono text-sm font-bold text-[#C59A2E]">Step 3</div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-1">Order Verification & Content Submission</h4>
                  <p className="text-xs text-muted-foreground">Verify your Amazon Order ID on our portal, read the book, and start submitting your video content for per-view payouts.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FAQ ACCORDION */}
          <section className="mb-16 border-t border-border pt-12">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#C59A2E]" />
              <h2 className="text-2xl font-bold font-serif">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="group border border-border p-4 bg-background">
                  <summary className="font-sans font-bold text-xs uppercase tracking-wider cursor-pointer flex justify-between items-center text-foreground">
                    <span>{item.q}</span>
                    <span className="text-[#C59A2E] group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed font-serif">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* 7. BOTTOM CTA */}
          <section className="text-center p-10 border border-foreground bg-muted/30">
            <h2 className="text-2xl font-bold font-serif mb-3">Ready to Join the Partner Program?</h2>
            <p className="text-xs text-muted-foreground max-w-xl mx-auto mb-6">
              Submit your details to start the verification process. Applications are reviewed in order of submission.
            </p>
            <a
              href="https://payments.cashfree.com/forms/UpForge-Partners-Program"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C59A2E] hover:bg-[#A8821E] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
            >
              Apply for Partner Program <ArrowRight className="w-4 h-4" />
            </a>
          </section>

          {/* FOUNDER DATA PLACEHOLDER COMMENT */}
          {/* <!-- NEEDS REAL DATA: partner application fee structure, review turnaround timeline [X], and YouTube video embed ID (VIDEO_ID_PLACEHOLDER) --> */}

        </div>
      </div>
    </>
  )
}

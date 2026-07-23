// components/creators/partner-program-section.tsx
"use client"

import Image from "next/image"
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react"

const APPLY_LINK = "https://payments.cashfree.com/forms/UpForge-Partners-Program"

export function PartnerProgramSection() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-amber-50/50 via-background to-background dark:from-amber-950/10 dark:via-background dark:to-background">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-12 md:py-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#C59A2E]" />
            <span className="text-[10px] font-bold text-[#C59A2E] uppercase tracking-widest">
              Official UpForge Partner Program
            </span>
          </div>
          <h2
            className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Become a Partner. <span className="text-[#C59A2E]">Earn Per View.</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Post about UpForge on your own social media and earn for every verified view.
            A transparent, invite-based rewards program built for our verified creator community —
            no spam, no gimmicks, no hidden terms.
          </p>
        </div>

        {/* Steps + Kit */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* How it works */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
              How It Works
            </h3>
            <ol className="space-y-5 flex-1">
              {[
                {
                  title: "Submit your creator profile",
                  desc: "Instant approval — takes less than 2 minutes.",
                },
                {
                  title: "Apply for the Partner Program",
                  desc: "Right inside your profile card below, tap “Apply for Partner Program.”",
                },
                {
                  title: "Receive your Partner Kit",
                  desc: "Within 7–14 days, your official welcome kit ships to your address.",
                },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#C59A2E]/10 border border-[#C59A2E]/30 flex items-center justify-center font-serif font-black text-sm text-[#C59A2E]">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{step.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={APPLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#C59A2E] hover:bg-[#A8821E] rounded-full transition-colors shadow w-fit"
            >
              Apply for Partner Program <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3">
              Already have a profile? Apply directly from your card in the registry below.
            </p>
          </div>

          {/* Kit preview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
              Your Partner Kit Includes
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { src: "/t-shirt.jpg", label: "Official T-Shirt" },
                { src: "/tripod.jpg", label: "Content Tripod" },
                { src: "/book.jpg", label: "Kindle Edition Book" },
              ].map((item) => (
                <div key={item.src} className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 mb-2">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100px, 140px"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl px-3 py-2.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              Shipped directly to approved partners — tracked and insured.
            </div>
          </div>
        </div>

        {/* Earnings table */}
        <div className="bg-slate-900 dark:bg-black rounded-2xl p-6 md:p-8 text-white">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              Earnings Per Verified View
            </h3>
            <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">
              Approved posts only · Paid monthly
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { views: "Per View Rate", amount: "₹0.01" },
              { views: "10,000 Views", amount: "₹100" },
              { views: "1,00,000 Views", amount: "₹1,000" },
              { views: "10,00,000 Views", amount: "₹10,000" },
            ].map((row, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center"
              >
                <p className="font-serif font-black text-xl md:text-2xl text-white mb-1">
                  {row.amount}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-white/50 font-semibold">
                  {row.views}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/40 mt-5 leading-relaxed">
            Every post is manually reviewed before views are counted toward earnings. This keeps the
            program authentic and spam-free — built for genuine creators, not view farms. UpForge
            reserves the right to verify view counts before payout.
          </p>
        </div>
      </div>
    </section>
  )
}

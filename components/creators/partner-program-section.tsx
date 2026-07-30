// components/creators/partner-program-section.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Download,
  AlertTriangle,
  Award,
  FileText,
  Check,
  Clock,
} from "lucide-react"

const AMAZON_URL = "https://www.amazon.com"
const BOOK_COVER_URL = "https://images.upforge.org/the%20unfinished%20millionaire.jpg"

export function PartnerProgramSection() {
  const [orderId, setOrderId] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedId, setSubmittedId] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [showRulebookModal, setShowRulebookModal] = useState(false)

  // Load saved verification status on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("upforge_creator_order_id")
      if (saved) {
        setIsSubmitted(true)
        setSubmittedId(saved)
      }
    }
  }, [])

  const handleVerifyOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    const trimmed = orderId.trim()
    
    // Secret Rule Validation:
    // 1. Must contain at least 1 alpha letter AND at least 1 numeric digit
    const hasAlpha = /[a-zA-Z]/.test(trimmed)
    const hasNumeric = /[0-9]/.test(trimmed)
    
    // 2. Length must be strictly greater than 15 characters
    const isValidLength = trimmed.length > 15

    if (!trimmed || !hasAlpha || !hasNumeric || !isValidLength) {
      setErrorMsg("Please enter a valid Amazon Order ID format to verify.")
      return
    }

    // Success -> Submitted for review
    setIsSubmitted(true)
    setSubmittedId(trimmed)
    if (typeof window !== "undefined") {
      localStorage.setItem("upforge_creator_order_id", trimmed)
    }
  }

  const handleDownloadRulebook = () => {
    const rulebookText = `===========================================================
UPFORGE CREATOR PROGRAM — OFFICIAL RULEBOOK & GUIDELINES
Official Web: https://www.upforge.org | ISO Verified Program
===========================================================

1. READ & REVIEW THE BOOK
   - Purchase and read "The Unfinished Millionaire" on Amazon.
   - Leave an honest, thoughtful review of the book on Amazon.

2. DEEP UNDERSTANDING OF UPFORGE
   - Study UpForge's mission, ecosystem, and founder registry.
   - Understand our core philosophy of building lasting enterprise value.

3. AUTHENTIC CONTENT CREATION
   - Create high-quality videos and posts highlighting UpForge, "The Unfinished Millionaire", or related startup intelligence topics.
   - Focus on delivering genuine value and education to your audience.

4. APPROVED VIDEO PAYOUTS
   - Every submitted video undergoes manual human verification.
   - Approved videos are paid at the rate of ₹0.01 per verified view (₹1,000 per 100k views).

5. STRICT ANTI-FRAUD & PANEL TERMINATION POLICY
   - NOTICE: Any use of fake engagement, view bots, click farms, or panel services for inflating view counts will lead to immediate and permanent termination from the program and forfeiture of all accumulated earnings.

===========================================================
© 2026 UpForge Global Registry. All Rights Reserved.
`
    const blob = new Blob([rulebookText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "UpForge_Creator_Program_Rulebook.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="border-b border-border bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/20 dark:via-background dark:to-background">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C59A2E]" />
            <span className="text-[10px] font-mono font-bold text-[#C59A2E] dark:text-amber-400 uppercase tracking-widest">
              Official UpForge Creator Program
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Read. Understand. <span className="text-[#C59A2E]">Earn Per View.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            We don&apos;t force or hard sell. Read our flagship book to deeply absorb UpForge&apos;s ecosystem and founder philosophy—then share authentic insights and earn for every verified video view.
          </p>
        </div>

        {/* MAIN ROW: BOOK SHOWCASE + VERIFICATION FLOW */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* LEFT: BOOK SHOWCASE & SELF-INVESTMENT MESSAGE (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Program Eligibility Requirement</span>
              </div>

              <div className="grid sm:grid-cols-12 gap-6 items-center mb-6">
                {/* Book Cover Image */}
                <div className="sm:col-span-5 relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20 bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={BOOK_COVER_URL}
                    alt="The Unfinished Millionaire Book Cover"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                  />
                </div>

                {/* Book Info */}
                <div className="sm:col-span-7 space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    Required Reading
                  </span>
                  
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    The Unfinished Millionaire
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    Mastering high-velocity execution, founder mindset, and building lasting enterprise value in the modern startup economy.
                  </p>

                  <div className="pt-2 space-y-1.5 font-sans text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Deep ecosystem and founder strategy insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>100% prerequisite for Creator Program approval</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Direct link to start your content creator journey</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Congratulations Self-Investment Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 mb-6">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                      Congratulations on Investing in Yourself!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      By purchasing this book, you have spent on yourself in the best possible way. Books sharpen your perspective—giving you the deep foundation required to create authentic, trusted content on UpForge.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Official Edition available on Amazon
              </span>

              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9900] hover:bg-[#e68a00] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
              >
                <span>Buy on Amazon</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* RIGHT: ORDER ID VERIFICATION CARD (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Verification Portal
                </span>

                {isSubmitted && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <Check className="w-3 h-3" /> Submitted for Review
                  </span>
                )}
              </div>

              <h3
                className="text-xl font-bold text-slate-900 dark:text-white mb-2"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Verify Your Amazon Order ID
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Bought the book? Submit your Amazon Order ID below to register your eligibility for creator video payouts.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleVerifyOrder} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                      Amazon Order ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 114-7294812-9842103"
                      value={orderId}
                      onChange={(e) => {
                        setOrderId(e.target.value)
                        setErrorMsg("")
                      }}
                      className="w-full px-4 py-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {errorMsg && (
                      <p className="text-[11px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                  >
                    Verify & Submit Order ID
                  </button>
                </form>
              ) : (
                /* SUBMITTED FOR REVIEW SUCCESS CARD */
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        Submitted for Review
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3">
                      Your Amazon Order ID <span className="font-mono font-bold">{submittedId}</span> has been received and queued for automatic verification.
                    </p>
                    <div className="text-[11px] font-medium bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                      ✨ Status: <span className="font-bold">Pending Manual Audit (Within 24 Hours)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    While your order is being verified, read the book and check out the Creator Rulebook below to start preparing your video submission.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      localStorage.removeItem("upforge_creator_order_id")
                      setOrderId("")
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline font-mono"
                  >
                    Submit a different Order ID
                  </button>
                </div>
              )}
            </div>

            {/* Quick Rulebook Trigger */}
            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Official UpForge Rulebook</span>
              </span>
              
              <button
                onClick={() => setShowRulebookModal(true)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>View Guidelines</span> →
              </button>
            </div>
          </div>
        </div>

        {/* EARNINGS TABLE */}
        <div className="bg-slate-900 dark:bg-black rounded-3xl p-6 md:p-8 text-white mb-12 shadow-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-1">
                Transparent Creator Payout Schedule
              </h3>
              <p className="text-xs text-slate-400">
                Each approved video mention of UpForge or &quot;The Unfinished Millionaire&quot; earns per verified view.
              </p>
            </div>
            <span className="text-[10px] text-white/50 font-mono uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Verified Views Only · Paid Monthly
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { views: "Base View Rate", amount: "₹0.01 / view" },
              { views: "10,000 Verified Views", amount: "₹100" },
              { views: "1,00,000 Verified Views", amount: "₹1,000" },
              { views: "10,00,000 Verified Views", amount: "₹10,000" },
            ].map((row, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-amber-500/40 transition-colors"
              >
                <p className="font-serif font-black text-xl md:text-2xl text-amber-300 mb-1">
                  {row.amount}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                  {row.views}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CREATOR RULEBOOK SECTION & DOWNLOAD */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {/* UpForge Official Logo / Avatar */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 shadow-md">
                <Image
                  src="/logo.jpg"
                  alt="UpForge Logo"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3
                  className="text-xl font-bold text-slate-900 dark:text-white"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Official UpForge Creator Rulebook & Guidelines
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Read carefully before producing and submitting content for creator payouts.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadRulebook}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-300 dark:border-slate-700 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-500" />
              <span>Download Rulebook (.TXT)</span>
            </button>
          </div>

          {/* Rulebook Rules List */}
          <div className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Read Book & Leave Amazon Review
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Read &ldquo;The Unfinished Millionaire&rdquo; completely and publish an honest reader review on Amazon.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Understand UpForge Deeply
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Internalize UpForge&apos;s mission, founder registry, and software intelligence ecosystem so your content is authentic and deeply informed.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Make Quality Videos on UpForge & Book
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Produce videos discussing UpForge, key takeaways from &ldquo;The Unfinished Millionaire&rdquo;, or related startup insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Paid for Each Approved Video
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Submit your video URL for audit. Every approved video is compensated per verified view based on transparent payout rates.
                  </p>
                </div>
              </div>

              {/* STRICT ANTI-FRAUD WARNING BOX */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-300">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1 text-rose-700 dark:text-rose-400">
                      Strict Anti-Fraud & Panel Notice
                    </h4>
                    <p className="text-[11px] leading-relaxed">
                      Notice: Any fake engagement, view bots, click farms, or panel services used for inflating views will result in immediate permanent termination from the program and forfeiture of all accumulated payouts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RULEBOOK MODAL */}
      {showRulebookModal && (
        <div className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30">
                  <Image src="/logo.jpg" alt="UpForge" fill className="object-cover" />
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Official UpForge Creator Guidelines
                </h3>
              </div>
              <button
                onClick={() => setShowRulebookModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              <p className="font-semibold text-slate-900 dark:text-white">
                To maintain institutional credibility, all UpForge Creator Program participants must strictly adhere to the following rules:
              </p>
              
              <ul className="space-y-3 list-disc pl-4">
                <li><strong>Read the Book:</strong> Purchase and read &quot;The Unfinished Millionaire&quot;. Write your genuine review on Amazon.</li>
                <li><strong>Deep Understanding:</strong> Ensure your content accurately reflects UpForge&apos;s ecosystem, verified startup registry, and founder insights.</li>
                <li><strong>Content Scope:</strong> Create original video content on YouTube, Instagram, or TikTok featuring UpForge or book concepts.</li>
                <li><strong>Verification:</strong> Submit your post link for view calculation. Payouts are made monthly after human review.</li>
                <li><strong>Zero Tolerance for Fraud:</strong> Any use of view panels, botnets, or artificial engagement will lead to immediate lifetime banning and loss of funds.</li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={handleDownloadRulebook}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Download (.TXT)
              </button>
              <button
                onClick={() => setShowRulebookModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// app/creators/creators-client.tsx
"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import {
  ChevronDown,
  X,
  Search,
  MessageCircle,
  Filter,
  Users,
  TrendingUp,
  SortAsc,
  Loader2,
  RefreshCw,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Rocket,
  Zap,
  Building2,
  Eye,
  DollarSign,
  Award,
  ExternalLink,
  Globe,
  FileCheck,
  Check,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { CreatorCardDesktop } from "@/components/creators/creator-card-desktop"
import { CreatorCardMobile } from "@/components/creators/creator-card-mobile"
import { ApplyModal } from "@/components/creators/apply-modal"
import { StartupCampaignModal } from "@/components/creators/startup-campaign-modal"
import { CreatorProfileModal } from "@/components/creators/creator-profile-modal"
import {
  fetchCreatorsFromSheet,
  SheetCreator,
  getFollowerBucket,
  formatFollowerCount,
} from "@/lib/sheets"
import { CREATOR_NETWORK_CONFIG } from "@/config/creator-network"
import { SITE_STATS } from "@/lib/site-stats"

type SortKey = "recent" | "motivation" | "followers" | "alpha"
type FollowerFilter = "all" | "under1k" | "1k-10k" | "10k-100k" | "100k+"
type AudienceTab = "startups" | "creators"

interface CreatorsClientProps {
  initialCreators?: SheetCreator[]
}

const faqItems = [
  {
    q: "How does startup content distribution work on UpForge?",
    a: "Startups and brands submit a campaign brief (product launch, hiring drive, or feature announcement). UpForge matches the brief with verified creators in tech, business, and lifestyle who produce authentic video content and publish to their audiences. Payouts are tied to verified organic performance."
  },
  {
    q: "How are campaign views and performance metrics verified?",
    a: "Every published campaign post undergo handles verification and organic reach auditing. UpForge uses structured view tracking to verify organic impressions before releasing performance-based payouts."
  },
  {
    q: "How can creators apply to join the verified network?",
    a: "Creators click 'Apply as a Creator', submit their Instagram handle and primary content niche. Our verification desk reviews handle authenticity, identity, and profile signals within 24–48 hours."
  },
  {
    q: "Is there any listing fee or fee to join the creator network?",
    a: "No. Handle verification and listing in the UpForge Verified Creator Directory are 100% free for all qualified creators."
  },
  {
    q: "What is the payout rate and cadence for creator partners?",
    a: `Creator partners earn ${CREATOR_NETWORK_CONFIG.payoutRateDescription} for campaign posts, with payouts processed ${CREATOR_NETWORK_CONFIG.payoutCadence.toLowerCase()} upon hitting the minimum payout threshold of ₹${CREATOR_NETWORK_CONFIG.payoutMinimumThresholdINR}.`
  },
  {
    q: "How can startup brands contact listed creators or request custom campaigns?",
    a: "Founders can click 'List Your Startup Campaign' to submit a campaign brief directly, or reach out to our verified desk via WhatsApp or email for custom distribution requirements."
  }
]

export function CreatorsClient({ initialCreators = [] }: CreatorsClientProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false)
  const [creators, setCreators] = useState<SheetCreator[]>(initialCreators)
  const [selectedCreator, setSelectedCreator] = useState<SheetCreator | null>(null)
  const [isLoading, setIsLoading] = useState(initialCreators.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(16)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<AudienceTab>("startups")

  const [suggestions, setSuggestions] = useState<SheetCreator[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [selectedNiche, setSelectedNiche] = useState("all")
  const [followerFilter, setFollowerFilter] = useState<FollowerFilter>("all")
  const [sortBy, setSortBy] = useState<SortKey>("recent")

  // Dynamic metrics computed from live dataset
  const liveCreatorCount = creators.length || initialCreators.length || SITE_STATS.verifiedCreatorsCount
  const liveTotalReach = useMemo(() => {
    return CREATOR_NETWORK_CONFIG.calculateTotalReach(creators)
  }, [creators])

  const loadCreators = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCreatorsFromSheet()
      setCreators(data)
    } catch {
      setError("Could not load creator index. Please try refreshing.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (creators.length === 0) {
      loadCreators()
    }
  }, [loadCreators, creators.length])

  const handleOpenProfile = useCallback((creator: SheetCreator) => {
    setSelectedCreator(creator)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("creator", creator.instagramHandle)
      window.history.replaceState(null, "", url.toString())
    }
  }, [])

  const handleCloseProfile = useCallback(() => {
    setSelectedCreator(null)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.delete("creator")
      window.history.replaceState(null, "", url.pathname)
    }
  }, [])

  useEffect(() => {
    if (creators.length > 0 && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const creatorHandle = params.get("creator")
      if (creatorHandle) {
        const found = creators.find(
          (c) => c.instagramHandle.toLowerCase() === creatorHandle.toLowerCase()
        )
        if (found) {
          setSelectedCreator(found)
        }
      }
    }
  }, [creators])

  // JSON-LD Structured Data
  const jsonLdData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "UpForge Startup Content Distribution",
          "serviceType": "Startup Distribution & Video Content Campaign Network",
          "provider": {
            "@type": "Organization",
            "name": "UpForge",
            "url": "https://upforge.org"
          },
          "description": "Content distribution network for startup product launches, hiring pushes, and feature announcements through verified creators.",
          "offers": {
            "@type": "Offer",
            "price": "0.01",
            "priceCurrency": "INR",
            "description": CREATOR_NETWORK_CONFIG.payoutRateDescription
          }
        },
        {
          "@type": "ItemList",
          "name": "Official UpForge Verified Creator Network",
          "numberOfItems": liveCreatorCount,
          "itemListElement": creators.slice(0, 30).map((creator, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
              "@type": "Person",
              "name": creator.fullName,
              "alternateName": creator.instagramHandle,
              "jobTitle": `${creator.niche} Creator`,
              "image": creator.profilePicture || "",
              "sameAs": `https://instagram.com/${creator.instagramHandle}`
            }
          }))
        }
      ]
    }
  }, [creators, liveCreatorCount])

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setVisibleCount(mobile ? 10 : 16)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setHighlightedIndex(-1)
    if (value.trim().length < 1) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    const q = value.toLowerCase()
    const matched = creators
      .filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.instagramHandle.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q)
      )
      .slice(0, 6)
    setSuggestions(matched)
    setShowSuggestions(matched.length > 0)
  }

  const handleSelectSuggestion = (creator: SheetCreator) => {
    setSearchQuery(creator.fullName)
    setSuggestions([])
    setShowSuggestions(false)
    handleOpenProfile(creator)
  }

  const niches = useMemo(() => {
    const set = new Set(creators.map((c) => c.niche).filter(Boolean))
    return ["all", ...Array.from(set).sort()]
  }, [creators])

  const filteredCreators = useMemo(() => {
    let list = [...creators]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (c) =>
          c.fullName.toLowerCase().includes(q) ||
          c.instagramHandle.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q)
      )
    }

    if (selectedNiche !== "all") {
      list = list.filter((c) => c.niche === selectedNiche)
    }

    if (followerFilter !== "all") {
      list = list.filter((c) => getFollowerBucket(c.followerCount) === followerFilter)
    }

    switch (sortBy) {
      case "recent":
        list = [...list].sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime())
        break
      case "motivation":
        list = [...list].sort((a, b) => b.motivationScore - a.motivationScore)
        break
      case "followers":
        list = [...list].sort((a, b) => b.followerCount - a.followerCount)
        break
      case "alpha":
        list = [...list].sort((a, b) => a.fullName.localeCompare(b.fullName))
        break
    }

    return list
  }, [creators, searchQuery, selectedNiche, followerFilter, sortBy])

  const displayedCreators = filteredCreators.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCreators.length

  return (
    <div className="bg-[#09090b] min-h-screen text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {jsonLdData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-amber-500/10 via-[#09090b] to-[#09090b] pt-14 pb-16 px-4 md:px-8 overflow-hidden">
        {/* Glow ambient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto text-center relative z-10">
          
          {/* Trust Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            {/* Trustpilot pill */}
            <a
              href={CREATOR_NETWORK_CONFIG.trust.trustpilotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-[11px] font-medium hover:bg-emerald-900/40 transition shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trustpilot Verified ({CREATOR_NETWORK_CONFIG.trust.trustpilotRating})</span>
              <ExternalLink className="w-3 h-3 text-emerald-500" />
            </a>

            {/* Google Site Verification */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px] font-medium shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Site Verified Domain</span>
            </div>

            {/* Registry Scale Anchor */}
            <Link
              href="/registry"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium hover:bg-amber-500/20 transition shadow-sm"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Backed by UpForge Registry ({SITE_STATS.verifiedStartupsCount}+ Startups)</span>
            </Link>
          </div>

          {/* Core Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-5 max-w-5xl mx-auto leading-[1.12]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            UpForge Verified Creator Network
          </h1>

          {/* Positioning statement */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-serif max-w-3xl mx-auto mb-8 font-normal">
            Distribution for startups, backed by India&apos;s startup registry. Connect product launches, hiring pushes, and founder stories with verified creator distribution.
          </p>

          {/* Primary Call-to-Actions */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
            <button
              onClick={() => setIsCampaignModalOpen(true)}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95 flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>List Your Startup Campaign</span>
            </button>

            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Apply as a Creator</span>
            </button>

            <a
              href={CREATOR_NETWORK_CONFIG.distribution.contactWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 text-xs font-bold border border-emerald-800/80 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 rounded-2xl transition-all shadow-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

          {/* Live Honest Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                Active Creators
              </p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2">
                {liveCreatorCount}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-sans font-bold">
                  Verified Live
                </span>
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Audit-backed handles</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                Audience Reach
              </p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                {liveTotalReach > 0 ? `${formatFollowerCount(liveTotalReach)}+` : "Growing"}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Cross-niche followers</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                Payout Rate
              </p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {CREATOR_NETWORK_CONFIG.payoutRateText}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Per verified organic view</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                Registry Backing
              </p>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                {SITE_STATS.verifiedStartupsCount}+
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Verified startup profiles</p>
            </div>
          </div>

        </div>
      </section>

      {/* WHY TRUST UPFORGE SECTION */}
      <section className="py-14 border-b border-slate-800/80 bg-[#0c0d12]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Institutional Credibility
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Why Startups & Creators Trust UpForge
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              UpForge is India&apos;s established startup intelligence platform. Distribution campaigns operate on the same data-first, audit-backed principles as our Global Startup Registry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <Building2 className="w-6 h-6 text-amber-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Startup Registry Foundation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Backed by {SITE_STATS.verifiedStartupsCount}+ verified startups and over {SITE_STATS.trackedStartupsCount.toLocaleString()} tracked ecosystem entities. We connect founders with distribution through real registry authority.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-amber-400 font-mono font-semibold">
                <span>Registry Verified</span>
                <Link href="/registry" className="hover:underline">Explore Registry →</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <FileCheck className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Verified Handle Auditing</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No bots, fake engagement, or inflated follower claims. Every creator handle undergoes manual identity check and engagement verification before joining campaign pools.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-emerald-400 font-mono font-semibold">
                <span>Audit-Backed</span>
                <span>Zero Fake Metrics</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
              <div>
                <Award className="w-6 h-6 text-blue-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Transparent Performance Payouts</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Single source payout rate ({CREATOR_NETWORK_CONFIG.payoutRateDescription}) used consistently across all briefs, outreach, and creator contracts. Weekly payout settlement.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-blue-400 font-mono font-semibold">
                <span>{CREATOR_NETWORK_CONFIG.payoutCadence} Payouts</span>
                <span>Threshold: ₹{CREATOR_NETWORK_CONFIG.payoutMinimumThresholdINR}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE SELECTOR / DUAL TRACK NAVIGATION */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-10">
        <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("startups")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "startups"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>For Startups & Brands</span>
          </button>

          <button
            onClick={() => setActiveTab("creators")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "creators"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>For Creators & Partners</span>
          </button>
        </div>
      </div>

      {/* TRACK 1: FOR STARTUPS & BRANDS */}
      {activeTab === "startups" && (
        <section className="py-10 max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-[#0e0f14] to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 z-10 relative">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  <Building2 className="w-3 h-3" /> Startup Distribution Product
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
                  Get Product Launches & Announcements Promoted by Verified Creators
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Whether you are launching a new product, pushing an engineering hiring campaign, or sharing a founder milestone (companies like OYO, PhysicsWallah, and growing funded startups), UpForge distributes your content across a growing network of <strong className="text-white font-mono">{liveCreatorCount} verified creators</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {CREATOR_NETWORK_CONFIG.distribution.supportedCampaignTypes.map((type) => (
                    <div key={type.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{type.title}</span>
                        <span className="text-[9px] font-mono text-amber-400">{type.recommendedCreators}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{type.description}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsCampaignModalOpen(true)}
                    className="px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Launch a Startup Campaign</span>
                  </button>

                  <a
                    href={CREATOR_NETWORK_CONFIG.distribution.contactWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-2xl border border-emerald-800/80 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Direct Founder Desk Brief</span>
                  </a>
                </div>
              </div>

              {/* Startup Reach Summary Box */}
              <div className="w-full md:w-[340px] shrink-0 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="font-bold text-white">Distribution Summary</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Active Pool</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Verified Creators:</span>
                    <span className="font-mono font-bold text-white">{liveCreatorCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Network Follower Reach:</span>
                    <span className="font-mono font-bold text-amber-400">{liveTotalReach > 0 ? `${formatFollowerCount(liveTotalReach)}+` : "Growing"}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Performance Model:</span>
                    <span className="font-mono font-bold text-emerald-400">{CREATOR_NETWORK_CONFIG.payoutRateText} / View</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Minimum Campaign:</span>
                    <span className="font-mono font-bold text-slate-300">10,000 Verified Views</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Verification SLA:</span>
                    <span className="font-mono font-bold text-slate-300">24 Hours Desk Review</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 leading-relaxed">
                  Campaign views are verified against handle analytics prior to performance payout release.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TRACK 2: FOR CREATORS & PARTNERS */}
      {activeTab === "creators" && (
        <section className="py-10 max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-[#0e0f14] to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 z-10 relative">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/50 border border-emerald-800 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" /> Creator Partner Program
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
                  Earn View-Based Payouts for Promoting Startup Content
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Join UpForge&apos;s verified creator network. Create authentic video reels or posts covering startup product launches, tech tools, and founder stories. Earn <strong className="text-emerald-400 font-mono">{CREATOR_NETWORK_CONFIG.payoutRateDescription}</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>100% Free Handle Listing</span>
                    </div>
                    <p className="text-[11px] text-slate-400">No application fees or hidden costs to list your handle in the creator directory.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Weekly Payout Settlements</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Weekly payouts directly to bank/UPI once minimum threshold (₹500) is reached.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Curated Startup Briefs</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Receive campaign briefs from vetted tech products, SaaS apps, and founder stories.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Verified Creator Badge</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Display verified audit status on your UpForge public creator card.</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsApplyModalOpen(true)}
                    className="px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
                  >
                    <Users className="w-4 h-4" />
                    <span>Apply for Creator Listing</span>
                  </button>

                  <Link
                    href="/partner-program"
                    className="px-6 py-3.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                  >
                    <span>View Partner Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Creator Earnings Summary Box */}
              <div className="w-full md:w-[340px] shrink-0 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="font-bold text-white">Partner Program Terms</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Official Rate</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>View Rate:</span>
                    <span className="font-mono font-bold text-emerald-400">{CREATOR_NETWORK_CONFIG.payoutRateText} / Organic View</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>1,000 Views Equivalent:</span>
                    <span className="font-mono font-bold text-amber-400">{CREATOR_NETWORK_CONFIG.payoutRatePerThousandText}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payout Cadence:</span>
                    <span className="font-mono font-bold text-white">{CREATOR_NETWORK_CONFIG.payoutCadence}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Minimum Payout:</span>
                    <span className="font-mono font-bold text-slate-300">₹{CREATOR_NETWORK_CONFIG.payoutMinimumThresholdINR}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Audit Review SLA:</span>
                    <span className="font-mono font-bold text-slate-300">24–48 Hours</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 leading-relaxed">
                  Payouts require genuine handle verification and organic audience engagement.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DUAL HOW IT WORKS SECTION */}
      <section className="py-16 border-b border-slate-800/80 bg-[#09090b]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
              <Zap className="w-3.5 h-3.5" /> Simple 4-Step Process
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              How UpForge Creator Distribution Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
              Transparent, audit-backed process designed for both startup founders and content creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Startup Flow */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">For Startup Brands</h3>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Distribution Flow</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Submit Campaign Brief</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Share product launch details, hiring goals, or feature announcements with target reach requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Verified Creator Matching</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      UpForge matches your campaign brief with verified creators in your category (Tech, SaaS, AI, Business).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Content Production & Distribution</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Creators film authentic video reels and publish to their organic audience network.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Performance Verification & Reporting</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Track organic view performance and verified audience metrics transparently.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Flow */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">For Content Creators</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Partner Flow</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Apply & Submit Handle</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Fill out the free creator application with your handle and primary content niche.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Handle Verification Audit</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Our verification desk reviews profile signals and lists your verified card in the creator directory.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Receive Campaign Briefs</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Get matched with tech product debuts, hiring drives, and founder stories fitting your audience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Weekly View Payouts</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      Earn {CREATOR_NETWORK_CONFIG.payoutRateText}/view with weekly payout settlement directly to your bank account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLICITLY MARKED CASE STUDY PLACEHOLDER */}
      <section className="py-12 border-b border-slate-800/80 bg-[#0c0d12]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          {/* TODO: add real case study once first campaign completes */}
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 text-center space-y-4 relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-800/60 border border-slate-700 px-3 py-1 rounded-full">
              <FileCheck className="w-3.5 h-3.5 text-amber-400" /> Active Distribution Batch
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Initial Creator Campaign Batch in Progress
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              In accordance with UpForge&apos;s strict trust standards, we display only verified campaign metrics. Verified case studies and performance breakdowns will be published here upon completion of our initial startup distribution batch.
            </p>

            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-amber-400 font-semibold pt-2">
              <span>Next Audit Release: Q3 2026</span>
              <span>·</span>
              <Link href="/registry" className="hover:underline text-slate-300">View Registry Database →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE VERIFIED CREATOR DIRECTORY GRID */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Live Creator Directory
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Verified Creators & Ambassadors
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explore active handles, audience reach, and niche categories in UpForge&apos;s verified creator index.
              </p>
            </div>

            <button
              onClick={loadCreators}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-slate-800 rounded-full bg-slate-900 hover:bg-slate-800 transition text-slate-300 w-fit"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
              <span>Refresh Index</span>
            </button>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="py-4 border-b border-slate-800 space-y-4 mb-6">
          <div ref={searchRef} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search creator network by name, handle, category..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-slate-800 rounded-2xl text-xs bg-slate-900/90 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setSuggestions([]); setShowSuggestions(false); inputRef.current?.focus() }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-slate-800 rounded-full transition"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0e0f14] border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {suggestions.map((creator, idx) => (
                  <button
                    key={creator.id}
                    onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(creator) }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-900 transition border-b border-slate-800/60 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-700 bg-slate-800">
                      {creator.profilePicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={creator.profilePicture}
                          alt={creator.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] font-bold">
                          {creator.fullName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold truncate text-white">
                          {creator.fullName}
                        </span>
                        <svg className="w-3.5 h-3.5 text-[#0095F6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">
                        @{creator.instagramHandle}
                      </p>
                    </div>

                    <span className="text-[9px] font-bold uppercase text-amber-400 shrink-0">
                      {creator.niche}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-between pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-slate-800 rounded-full bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
              >
                <Filter className="w-3.5 h-3.5" />
                Filter Niches
                {(selectedNiche !== "all" || followerFilter !== "all") && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] flex items-center justify-center font-bold">
                    {(selectedNiche !== "all" ? 1 : 0) + (followerFilter !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-1.5 ml-2">
                <SortAsc className="w-3.5 h-3.5 text-slate-500" />
                {(["recent", "motivation", "followers", "alpha"] as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full border transition ${
                      sortBy === key
                        ? "bg-amber-500 text-slate-950 border-amber-500"
                        : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {key === "recent" ? "Recent" : key === "motivation" ? "Score" : key === "followers" ? "Followers" : "A–Z"}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              {filteredCreators.length} {filteredCreators.length === 1 ? "Creator" : "Creators"} Shown
            </span>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-slate-900/60 rounded-2xl space-y-4 border border-slate-800 mt-2">
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                      Content Category
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {niches.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => setSelectedNiche(niche)}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition ${
                            selectedNiche === niche
                              ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                              : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          {niche === "all" ? "All Niches" : niche}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Follower Range
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(["all", "under1k", "1k-10k", "10k-100k", "100k+"] as FollowerFilter[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFollowerFilter(f)}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition ${
                            followerFilter === f
                              ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                              : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                          }`}
                        >
                          {f === "all" ? "All" : f === "under1k" ? "< 1K" : f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(selectedNiche !== "all" || followerFilter !== "all") && (
                    <button
                      onClick={() => { setSelectedNiche("all"); setFollowerFilter("all") }}
                      className="text-[10px] text-amber-400 font-bold hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <p className="text-xs text-slate-400">Loading verified creator directory...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-xs text-red-400">{error}</p>
            <button
              onClick={loadCreators}
              className="px-5 py-2 text-xs border border-slate-800 rounded-full hover:bg-slate-800 transition font-bold text-white"
            >
              Retry Loading Index
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCreators.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <Search className="w-10 h-10 text-slate-600" />
            <p className="text-slate-400 text-xs">No creator handles match your current search or filter criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedNiche("all"); setFollowerFilter("all") }}
              className="px-5 py-2 text-xs border border-slate-800 rounded-full bg-slate-900 hover:bg-slate-800 transition font-bold text-white"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Mobile Grid */}
        {!isLoading && !error && isMobile && (
          <div className="grid grid-cols-2 gap-3 py-4">
            {displayedCreators.map((creator) => (
              <CreatorCardMobile
                key={creator.id}
                creator={creator}
                onViewProfile={handleOpenProfile}
              />
            ))}
          </div>
        )}

        {/* Desktop Grid */}
        {!isLoading && !error && !isMobile && (
          <div className="grid grid-cols-4 gap-4 py-6">
            {displayedCreators.map((creator) => (
              <CreatorCardDesktop
                key={creator.id}
                creator={creator}
                onViewProfile={handleOpenProfile}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && hasMore && (
          <div className="text-center py-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold border border-slate-800 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all shadow-md active:scale-95"
            >
              <span>Load More Creators</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">
              Showing {displayedCreators.length} of {filteredCreators.length} verified creator entries
            </p>
          </div>
        )}
      </section>

      {/* EXPANDED FAQ SECTION */}
      <section className="py-16 border-t border-slate-800/80 bg-[#0c0d12]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              UpForge Distribution & Network FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="border border-slate-800/90 rounded-2xl overflow-hidden transition bg-[#0e0f14] shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4 hover:bg-slate-900/60 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FOOTER TRUST DISCLAIMER */}
      <div className="text-center py-8 border-t border-slate-800/60 bg-[#09090b]">
        <p className="text-[10px] text-slate-500 mb-2 max-w-xl mx-auto px-4">
          The UpForge Creator Network is an independent startup distribution program and verified directory. Identity checks and view metrics are audited prior to performance payout release.
        </p>
        <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold font-mono">
          © {new Date().getFullYear()} UpForge Global Creator Network · UpForge.org Startup Intelligence
        </p>
      </div>

      {/* MODALS */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        formUrl={CREATOR_NETWORK_CONFIG.creatorApplicationUrl}
      />

      <StartupCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />

      <CreatorProfileModal
        creator={selectedCreator}
        isOpen={selectedCreator !== null}
        onClose={handleCloseProfile}
      />
    </div>
  )
}

// app/creators/creators-client.tsx
"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import {
  ChevronDown, X, Search, MessageCircle, Filter,
  Users, TrendingUp, SortAsc, Loader2, RefreshCw,
  Sparkles, HelpCircle, ArrowRight, ShieldCheck, CheckCircle2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { CreatorCardDesktop } from "@/components/creators/creator-card-desktop"
import { CreatorCardMobile } from "@/components/creators/creator-card-mobile"
import { ApplyModal } from "@/components/creators/apply-modal"
import { CreatorProfileModal } from "@/components/creators/creator-profile-modal"
import {
  fetchCreatorsFromSheet,
  SheetCreator,
  getFollowerBucket,
} from "@/lib/sheets"

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfkkbdjrw11tStpTFpEaDKodYQmxUJZbpVlu8iaQJg-1HNaoQ/viewform?embedded=true"
const WHATSAPP_LINK = "https://wa.link/gmntyi"
const DESKTOP_INITIAL = 16
const MOBILE_INITIAL = 10
const LOAD_MORE = 8

type SortKey = "recent" | "motivation" | "followers" | "alpha"
type FollowerFilter = "all" | "under1k" | "1k-10k" | "10k-100k" | "100k+"

interface CreatorsClientProps {
  initialCreators?: SheetCreator[]
}

const faqItems = [
  {
    q: "Who are the creators listed in the UpForge Network?",
    a: "This directory showcases verified digital creators and brand ambassadors actively listed and working with UpForge across lifestyle, entrepreneurship, tech, and creative niches."
  },
  {
    q: "How can a new creator apply to get listed?",
    a: "Click 'Apply for Listing', fill out the quick application with your Instagram handle and niche. Our verification desk reviews handle authenticity within 24–48 hours."
  },
  {
    q: "Is there any fee or mandatory purchase required for listing?",
    a: "No. Listing in the UpForge Creator Directory and handle verification are 100% free for all creators."
  },
  {
    q: "How do creators earn through the UpForge Partner Program?",
    a: "Creators seeking paid monetization can join our official Partner Program to earn ₹0.01 per verified organic view with weekly payouts. Learn full details on our Partner Program page."
  },
  {
    q: "How do brands or partners contact listed creators?",
    a: "You can view public reach stats on creator profile cards or connect with our support desk on WhatsApp for official partnership inquiries."
  }
]

export function CreatorsClient({ initialCreators = [] }: CreatorsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [creators, setCreators] = useState<SheetCreator[]>(initialCreators)
  const [selectedCreator, setSelectedCreator] = useState<SheetCreator | null>(null)
  const [isLoading, setIsLoading] = useState(initialCreators.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(DESKTOP_INITIAL)
  const [isMobile, setIsMobile] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const [suggestions, setSuggestions] = useState<SheetCreator[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [selectedNiche, setSelectedNiche] = useState("all")
  const [followerFilter, setFollowerFilter] = useState<FollowerFilter>("all")
  const [sortBy, setSortBy] = useState<SortKey>("recent")

  const loadCreators = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchCreatorsFromSheet()
      setCreators(data)
    } catch {
      setError("Could not load creators. Please try again.")
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

  const jsonLdData = useMemo(() => {
    if (creators.length === 0) return null
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Official UpForge Verified Creator Network",
      "description": "Directory of verified digital content creators, influencers, and brand collaborators working with UpForge.",
      "numberOfItems": creators.length,
      "itemListElement": creators.slice(0, 40).map((creator, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Person",
          "name": creator.fullName,
          "alternateName": creator.instagramHandle,
          "jobTitle": `${creator.niche} Creator`,
          "description": `${creator.fullName} (@${creator.instagramHandle}) is a verified content creator working with UpForge in the ${creator.niche} category.`,
          "image": creator.profilePicture || "",
          "sameAs": `https://instagram.com/${creator.instagramHandle}`
        }
      }))
    }
  }, [creators])

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setVisibleCount(mobile ? MOBILE_INITIAL : DESKTOP_INITIAL)
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
    setVisibleCount(isMobile ? MOBILE_INITIAL : DESKTOP_INITIAL)
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
    setIsSearchOpen(false)
    handleOpenProfile(creator)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      handleSelectSuggestion(suggestions[highlightedIndex])
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  function highlightText(text: string, query: string) {
    if (!query.trim()) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-[#f09433]/30 text-foreground font-bold">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    )
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
    <div className="bg-background min-h-screen">
      {jsonLdData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative border-b border-border bg-gradient-to-b from-amber-500/5 via-background to-background dark:from-amber-500/10 py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-[1300px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest">
              UpForge Verified Creator Network
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Official UpForge Creators Directory
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-serif max-w-2xl mx-auto mb-8">
            Verified creators and brand partners working with UpForge. Explore creator profiles, audience reach, or apply to join our official network.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3 text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-full transition-all shadow-md active:scale-95"
            >
              Apply for Listing
            </button>

            <Link
              href="/partner-program"
              className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 rounded-full transition-all shadow-sm group"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-3 text-xs font-bold border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 rounded-full transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Verified Handles</p>
                <p className="text-[10px] text-muted-foreground">Identity & profile auditing</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Official Network</p>
                <p className="text-[10px] text-muted-foreground">Creators working with UpForge</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Free Listing</p>
                <p className="text-[10px] text-muted-foreground">Open creator application</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-border shadow-sm flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Partner Program</p>
                <p className="text-[10px] text-muted-foreground">View-based monetization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BECOME A PARTNER CALLOUT BANNER */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 pt-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" /> Optional Paid Monetization
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Want to Earn for Your Reach? Join the Partner Program.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Create genuine video content about featured titles and earn <strong className="text-amber-300 font-mono">₹0.01 per verified view</strong>. Paid weekly for official partners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full md:w-auto">
            <Link
              href="/partner-program"
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl transition shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Partner Program</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN REGISTRY SEARCH & GRID CONTENT */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8">

        {/* Toolbar & Search */}
        <div className="py-4 border-b border-border space-y-4">
          {(isSearchOpen || !isMobile) && (
            <div ref={searchRef} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search creator network by name, handle, category..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => searchQuery.trim() && suggestions.length > 0 && setShowSuggestions(true)}
                className="w-full pl-10 pr-10 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800/30 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setSuggestions([]); setShowSuggestions(false); inputRef.current?.focus() }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full transition"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-background border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                  {suggestions.map((creator, idx) => (
                    <button
                      key={creator.id}
                      onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(creator) }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition border-b border-border/50 last:border-0 ${
                        idx === highlightedIndex ? "bg-muted" : "hover:bg-muted/60"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-slate-100 ring-offset-1 ring-offset-background bg-slate-50">
                        {creator.profilePicture ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={creator.profilePicture}
                            alt={creator.fullName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement
                              t.style.display = "none"
                              if (t.parentElement) t.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 text-[10px] font-bold">${creator.fullName.slice(0,2).toUpperCase()}</div>`
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 text-[10px] font-bold">
                            {creator.fullName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold truncate text-slate-800 dark:text-white">
                            {highlightText(creator.fullName, searchQuery)}
                          </span>
                          <svg className="w-3 h-3 text-[#0095F6] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate">
                          @{highlightText(creator.instagramHandle, searchQuery)}
                        </p>
                      </div>

                      <span className="text-[9px] font-bold uppercase text-amber-700 shrink-0 hidden sm:block">
                        {creator.niche}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-border rounded-full hover:bg-muted transition"
              >
                <Filter className="w-3.5 h-3.5" />
                Filter Category
                {(selectedNiche !== "all" || followerFilter !== "all") && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] flex items-center justify-center font-bold">
                    {(selectedNiche !== "all" ? 1 : 0) + (followerFilter !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-1.5 ml-2">
                <SortAsc className="w-3.5 h-3.5 text-muted-foreground" />
                {(["recent", "motivation", "followers", "alpha"] as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full border transition ${
                      sortBy === key
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-slate-900 dark:border-white"
                        : "border-border hover:bg-muted bg-background text-slate-500"
                    }`}
                  >
                    {key === "recent" ? "Recent" : key === "motivation" ? "Score" : key === "followers" ? "Followers" : "A–Z"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={loadCreators}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold border border-border rounded-full hover:bg-muted transition"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Index
            </button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-muted/20 rounded-2xl space-y-4 border border-border">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                      Niche / Category
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {niches.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => setSelectedNiche(niche)}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition ${
                            selectedNiche === niche
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white"
                              : "border-border hover:bg-muted bg-background text-slate-500"
                          }`}
                        >
                          {niche === "all" ? "All Niches" : niche}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Follower Reach
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(["all", "under1k", "1k-10k", "10k-100k", "100k+"] as FollowerFilter[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFollowerFilter(f)}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border transition ${
                            followerFilter === f
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white"
                              : "border-border hover:bg-muted bg-background text-slate-500"
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
                      className="text-[10px] text-[#e6683c] font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              {searchQuery || selectedNiche !== "all" || followerFilter !== "all"
                ? `${filteredCreators.length} creator${filteredCreators.length !== 1 ? "s" : ""} found`
                : `${creators.length} verified creators in the index`}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-slate-700 dark:text-slate-200" />
            <p className="text-xs text-muted-foreground">Retrieving verified creator records...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={loadCreators}
              className="px-4 py-2 text-sm border border-border rounded-full hover:bg-muted transition font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredCreators.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Search className="w-10 h-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-xs">No matching verified creator records found.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedNiche("all"); setFollowerFilter("all") }}
              className="px-4 py-2 text-xs border border-border rounded-full hover:bg-muted transition font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Mobile Grid */}
        {!isLoading && !error && isMobile && (
          <div className="grid grid-cols-2 gap-3 py-6">
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
          <div className="grid grid-cols-4 gap-4 py-8">
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
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE)}
              className="group inline-flex items-center gap-2 px-8 py-3 text-xs font-bold border border-slate-300 dark:border-slate-800 bg-background hover:bg-muted text-foreground rounded-full transition-all shadow-sm active:scale-95"
            >
              Load More Creators
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">
              Showing {displayedCreators.length} of {filteredCreators.length} registry entries
            </p>
          </div>
        )}

        {/* CREATOR FAQ SECTION */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                Frequently Asked Questions
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                UpForge Creator Network FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4.5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-center py-8 mt-16 border-t border-border/40 bg-muted/20 rounded-2xl mb-4">
          <p className="text-[10px] text-muted-foreground mb-2 max-w-xl mx-auto">
            The UpForge Creator Registry is an open, verified database. Identity checks are conducted based on submission data, handle validity, and audience engagement metrics.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold font-mono">
            © 2026 UpForge Global Creator Network · All Rights Reserved
          </p>
        </div>

      </div>

      {/* MODALS */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formUrl={GOOGLE_FORM_URL}
      />

      <CreatorProfileModal
        creator={selectedCreator}
        isOpen={selectedCreator !== null}
        onClose={handleCloseProfile}
      />
    </div>
  )
}

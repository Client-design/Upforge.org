// components/creators/creator-card-desktop.tsx
"use client"

import { SheetCreator, formatFollowerCount } from "@/lib/sheets"
import { Users, TrendingUp, ShieldCheck } from "lucide-react"

interface CreatorCardDesktopProps {
  creator: SheetCreator
  isPromoted?: boolean
  onViewProfile: (creator: SheetCreator) => void
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getGradient(handle: string): string {
  const colors = [
    "from-slate-100 to-slate-200",
    "from-slate-200 to-slate-300",
    "from-slate-300 to-slate-200",
  ]
  let hash = 0
  for (let i = 0; i < handle.length; i++) hash += handle.charCodeAt(i)
  return colors[hash % colors.length]
}

export function CreatorCardDesktop({
  creator,
  isPromoted = false,
  onViewProfile,
}: CreatorCardDesktopProps) {
  const gradient = getGradient(creator.instagramHandle)
  const registryNum = creator.id.replace("sheet-", "").padStart(5, "0")
  const registryId = `UPF-CR-2026-${registryNum}`

  return (
    <div
      onClick={() => onViewProfile(creator)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-full select-none"
    >
      {/* Registry ID Header Tag */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 dark:text-slate-500 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/60">
        <span>{registryId}</span>
        <div className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-wider">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          VERIFIED
        </div>
      </div>

      {/* Profile Image with Verified double rings */}
      <div className="relative mb-3 flex justify-center">
        <div
          className={`
            w-20 h-20 rounded-full overflow-hidden mx-auto
            ring-2 ${isPromoted ? "ring-amber-400" : "ring-slate-200 dark:ring-slate-700"} ring-offset-2 ring-offset-background
            transition-all duration-300 group-hover:scale-105
          `}
        >
          {creator.profilePicture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={creator.profilePicture}
              alt={creator.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-xl font-bold">${getInitials(creator.fullName)}</div>`
                }
              }}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-xl font-bold`}
            >
              {getInitials(creator.fullName)}
            </div>
          )}
        </div>
        {/* Verification Check Badge */}
        <div className="absolute -bottom-0.5 right-[calc(50%-44px)] bg-background rounded-full p-0.5 shadow-sm">
          <svg
            className="w-5 h-5 text-[#0095F6] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      {/* Name and Handle */}
      <div className="mb-2">
        <h3 className="font-serif font-black text-base text-slate-800 dark:text-white leading-snug truncate max-w-[170px] mx-auto group-hover:text-[#e6683c] transition-colors">
          {creator.fullName}
        </h3>
        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-[170px] mx-auto">
          @{creator.instagramHandle}
        </p>
      </div>

      {/* Niche Badge */}
      <div className="mb-4">
        <span className="inline-block px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 text-[9px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
          {creator.niche}
        </span>
      </div>

      {/* Metrics Row */}
      <div className="border-t border-slate-100 dark:border-slate-800/60 pt-3 flex items-center justify-around gap-2 mb-3">
        {creator.followerCount > 0 && (
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              {formatFollowerCount(creator.followerCount)} Reach
            </span>
          </div>
        )}
        <div className="w-px h-3.5 bg-slate-100 dark:bg-slate-800" />
        {creator.motivationScore > 0 && (
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              {creator.motivationScore}/10 Score
            </span>
          </div>
        )}
      </div>

      {/* View Profile Action button */}
      <div className="w-full mt-auto py-2 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" />
        View Credentials
      </div>
    </div>
  )
}

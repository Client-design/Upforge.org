// components/creators/creator-card-mobile.tsx
"use client"

import { SheetCreator, formatFollowerCount } from "@/lib/sheets"
import { Users, TrendingUp, ShieldCheck } from "lucide-react"

interface CreatorCardMobileProps {
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

export function CreatorCardMobile({
  creator,
  isPromoted = false,
  onViewProfile,
}: CreatorCardMobileProps) {
  const gradient = getGradient(creator.instagramHandle)
  const registryNum = creator.id.replace("sheet-", "").padStart(5, "0")
  const registryId = `UPF-CR-2026-${registryNum}`

  return (
    <div
      onClick={() => onViewProfile(creator)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-md select-none"
    >
      {/* Top row: Registry ID */}
      <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 dark:text-slate-500 mb-2.5 pb-1.5 border-b border-slate-100 dark:border-slate-800/60">
        <span>{registryId}</span>
        {isPromoted && (
          <span className="text-[8px] text-amber-500 font-bold uppercase tracking-wider">Spotlight</span>
        )}
      </div>

      {/* Main Info Area: Column Layout for Grid-cols-2 display */}
      <div className="flex flex-col items-center text-center">
        {/* Profile Image with Verified rings */}
        <div className="relative mb-2 flex justify-center">
          <div
            className={`
              w-14 h-14 rounded-full overflow-hidden
              ring-2 ${isPromoted ? "ring-amber-400" : "ring-slate-200 dark:ring-slate-700"} ring-offset-2 ring-offset-background
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
                    parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-sm font-bold">${getInitials(creator.fullName)}</div>`
                  }
                }}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-slate-700 dark:text-slate-300 text-sm font-bold`}
              >
                {getInitials(creator.fullName)}
              </div>
            )}
          </div>
          {/* Blue verification check badge */}
          <div className="absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5 shadow-sm">
            <svg
              className="w-4 h-4 text-[#0095F6] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>

        {/* Name and Handle */}
        <div className="mb-1 w-full">
          <h3 className="font-serif font-black text-xs text-slate-800 dark:text-white leading-tight truncate px-1">
            {creator.fullName}
          </h3>
          <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 truncate px-1 mt-0.5">
            @{creator.instagramHandle}
          </p>
        </div>

        {/* Niche Tag */}
        <div className="mb-2">
          <span className="inline-block px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 text-[8px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            {creator.niche}
          </span>
        </div>

        {/* Simple Stats Row */}
        <div className="w-full flex items-center justify-center gap-1.5 py-1.5 border-t border-slate-100 dark:border-slate-800/60 text-[9px] text-slate-500 dark:text-slate-400 mb-2">
          {creator.followerCount > 0 && (
            <div className="flex items-center gap-0.5">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{formatFollowerCount(creator.followerCount)}</span>
            </div>
          )}
          <span className="text-slate-300 dark:text-slate-800">|</span>
          {creator.motivationScore > 0 && (
            <div className="flex items-center gap-0.5 font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>{creator.motivationScore}/10</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full py-1.5 rounded-lg text-[9px] font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-300 flex items-center justify-center gap-0.5">
        <ShieldCheck className="w-3 h-3" />
        Verify Profile
      </div>
    </div>
  )
}

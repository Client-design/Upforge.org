"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react"
import type { Startup } from "@/types/startup"
import { getStartupUrl } from "@/lib/domain"

interface StartupCardProps {
  startup: Startup
  featured?: boolean
}

export function StartupCard({ startup, featured = false }: StartupCardProps) {
  const getDisplayFounder = () => {
    if (!startup.founders || startup.founders.trim() === "") {
      return { name: "Institutional Lead", hasMore: false }
    }
    const parts = startup.founders.split(",")
    return {
      name: parts[0].trim(),
      hasMore: parts.length > 1,
    }
  }

  const founderInfo = getDisplayFounder()
  const hasRealUFRN = !!startup.ufrn
  const ufrnDisplay = startup.ufrn ?? `UPF-${startup.slug?.substring(0, 6).toUpperCase()}`
  const ufrnShort = startup.ufrn
    ? startup.ufrn.split("-").slice(-2).join("-")
    : ufrnDisplay

  const startupHref = getStartupUrl(startup.slug || "")

  return (
    <Link href={startupHref} className="group block h-full">
      <article
        className={`relative flex h-full flex-col justify-between rounded-xl border bg-white p-6 transition-all duration-300 ${
          featured
            ? "border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            : "border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        }`}
      >
        {featured && (
          <div className="absolute -top-3 left-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-0.5 shadow-sm">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                Featured
              </span>
            </div>
          </div>
        )}

        <div>
          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              {startup.logo_url ? (
                <Image
                  src={startup.logo_url}
                  alt={`${startup.name} logo`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-2.5"
                  loading="lazy"
                />
              ) : (
                <span className="text-xl font-bold text-slate-800">
                  {startup.name?.charAt(0) || "?"}
                </span>
              )}
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all group-hover:bg-slate-900 group-hover:text-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {startup.name}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                {startup.category}
              </span>
              {startup.city && (
                <span className="text-slate-500 font-medium">• {startup.city}</span>
              )}
              {startup.founded_year && (
                <span className="text-slate-400 font-medium">• EST. {startup.founded_year}</span>
              )}
            </div>

            <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 font-normal">
              {startup.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
              {founderInfo.name.charAt(0)}
            </div>
            <span className="font-medium text-slate-700">
              {founderInfo.name}
              {founderInfo.hasMore && <span className="text-slate-400 font-normal ml-1">+ team</span>}
            </span>
          </div>

          <div>
            {hasRealUFRN ? (
              <span 
                className="text-[10px] font-mono text-slate-400"
                title={`Registry ID: ${startup.ufrn}`}
              >
                {ufrnShort}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-300">{ufrnDisplay}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

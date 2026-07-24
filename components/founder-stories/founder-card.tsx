// components/founder-stories/founder-card.tsx
"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Founder } from "@/lib/founders/types"
import { useState } from "react"

export function FounderCard({ founder }: { founder: Founder }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <Link href={`/founder-stories/${founder.slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-background border border-border hover:border-foreground transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
        <div className="relative w-full h-60 overflow-hidden bg-muted">
          {!imageFailed ? (
            <>
              <Image
                src={founder.imageUrl}
                alt={`${founder.name} - ${founder.company}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageFailed(true)}
              />
              {/* Subtle gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
              style={{ background: founder.accent }}
            >
              {founder.initials}
            </div>
          )}

          {/* Clean Category Badge without ranking numbers */}
          <div
            className="absolute top-3 left-3 px-3 py-1 text-white text-[9px] font-black uppercase tracking-wider shadow-xs backdrop-blur-xs"
            style={{ background: founder.accent }}
          >
            {founder.category || founder.company}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[8.5px] font-black uppercase tracking-[0.15em]" style={{ color: founder.accent }}>
              {founder.country}
            </span>
            <span className="text-border">·</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-mono">
              Est. {founder.founded}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-foreground leading-tight mb-2 group-hover:text-[#C59A2E] transition-colors">
            {founder.nameShort}
          </h3>

          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-mono">
            {founder.company}
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-serif italic mb-4">
            {founder.headline}
          </p>

          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              {founder.stats.slice(0, 2).map((stat, i) => (
                <div key={i}>
                  <p className="text-[8px] text-muted-foreground uppercase tracking-wider font-mono">{stat.label}</p>
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <ArrowUpRight className="w-4 h-4 text-border group-hover:text-[#C59A2E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  )
}

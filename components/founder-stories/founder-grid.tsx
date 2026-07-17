"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Founder } from "@/lib/founders/types"
import { FounderCard } from "./founder-card"
import { Loader2 } from "lucide-react"

interface FounderGridProps {
  initialFounders: Founder[]
  totalFounders: number
}

export function FounderGrid({ initialFounders, totalFounders }: FounderGridProps) {
  const [founders, setFounders] = useState<Founder[]>(initialFounders)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialFounders.length < totalFounders)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/founder-stories/load-more?page=${page + 1}&limit=10`)
      
      if (!res.ok) throw new Error('Failed to load more stories')
      
      const data = await res.json()
      
      // Smooth append with slight delay for animation
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setFounders(prev => [...prev, ...data.founders])
      setPage(data.nextPage || page + 1)
      setHasMore(data.hasMore)
    } catch (err) {
      setError('Failed to load more stories. Please try again.')
      console.error("Failed to load more founders:", err)
    } finally {
      setLoading(false)
    }
  }, [page, hasMore, loading])
  
  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading) return
    
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "100px" 
      }
    )
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, loadMore])
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {founders.map((founder, index) => (
          <div 
            key={founder.id} 
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${(index % 10) * 50}ms` }}
          >
            <FounderCard founder={founder} />
          </div>
        ))}
      </div>
      
      {/* Load More Trigger & Loading State */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-12">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#C59A2E]" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                Loading more stories...
              </span>
            </div>
          ) : error ? (
            <button
              onClick={loadMore}
              className="px-6 py-3 border border-foreground text-foreground text-xs uppercase tracking-widest font-mono hover:bg-foreground hover:text-background transition-colors"
            >
              Try Again
            </button>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
      
      {/* End of List */}
      {!hasMore && founders.length > 0 && (
        <div className="text-center py-16 border-t border-border mt-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
            ✦ You've reached the end ✦
          </span>
          <p className="font-serif italic text-muted-foreground mt-3">
            All {totalFounders} founder stories — more coming soon
          </p>
        </div>
      )}
      
      {/* Empty State */}
      {founders.length === 0 && (
        <div className="text-center py-16">
          <p className="font-serif text-xl text-muted-foreground">No stories found</p>
        </div>
      )}
    </>
  )
}

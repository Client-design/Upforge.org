"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { X, Send, Loader2, Minus, RotateCcw, Sparkles, ShieldCheck, Compass, TrendingUp, BookOpen } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

// ─── EXECUTIVE RICH TEXT RENDERER ─────────────────────────────────────────────

function RichText({ text }: { text: string }) {
  const lines = text.split("\n").reduce<string[]>((acc, line, i, arr) => {
    if (line.trim() === "" && i > 0 && arr[i - 1].trim() === "") return acc
    acc.push(line)
    return acc
  }, [])

  const inline = (str: string): React.ReactNode[] =>
    str.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((p, i) => {
      if (p.startsWith("**") && p.endsWith("**"))
        return <strong key={i} className="font-bold text-foreground">{p.slice(2, -2)}</strong>
      if (p.startsWith("*") && p.endsWith("*"))
        return <em key={i} className="text-muted-foreground italic">{p.slice(1, -1)}</em>
      if (p.startsWith("`") && p.endsWith("`"))
        return (
          <code key={i} className="bg-muted text-foreground px-1.5 py-0.5 rounded text-[11px] font-mono border border-border">
            {p.slice(1, -1)}
          </code>
        )
      return <span key={i}>{p}</span>
    })

  const els: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const t = lines[i].trim()
    if (!t) { els.push(<div key={`s${i}`} className="h-1.5" />); i++; continue }

    if (/^(\d+)[.)]\s/.test(t)) {
      const items: { n: string; text: string }[] = []
      while (i < lines.length) {
        const m = lines[i].trim().match(/^(\d+)[.)]\s+(.+)$/)
        if (!m) break
        items.push({ n: m[1], text: m[2] }); i++
      }
      els.push(
        <div key={`ol${i}`} className="flex flex-col gap-1.5 my-2">
          {items.map((it, ix) => (
            <div key={ix} className="flex gap-2.5 items-start">
              <span className="shrink-0 font-mono text-[10px] font-black text-amber-600 dark:text-amber-400 pt-0.5">
                {it.n}.
              </span>
              <span className="text-[13px] leading-relaxed text-foreground font-serif">
                {inline(it.text)}
              </span>
            </div>
          ))}
        </div>
      )
      continue
    }

    if (/^[-•]\s/.test(t)) {
      const items: string[] = []
      while (i < lines.length) {
        const m = lines[i].trim().match(/^[-•]\s+(.+)$/)
        if (!m) break
        items.push(m[1]); i++
      }
      els.push(
        <div key={`ul${i}`} className="flex flex-col gap-1.5 my-2">
          {items.map((b, ix) => (
            <div key={ix} className="flex gap-2.5 items-start">
              <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              <span className="text-[13px] leading-relaxed text-foreground font-serif">
                {inline(b)}
              </span>
            </div>
          ))}
        </div>
      )
      continue
    }

    const hm = t.match(/^(#{1,3})\s+(.+)$/)
    if (hm) {
      els.push(
        <p key={`h${i}`} className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mt-3 mb-1">
          {inline(hm[2])}
        </p>
      )
      i++; continue
    }

    if (t === "---") {
      els.push(<div key={`hr${i}`} className="h-px bg-border my-2" />)
      i++; continue
    }

    els.push(
      <p key={`p${i}`} className="text-[13px] leading-relaxed text-foreground font-serif m-0">
        {inline(t)}
      </p>
    )
    i++
  }

  return <div className="flex flex-col gap-1.5">{els}</div>
}

// ─── TYPING DOTS ─────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1 px-2">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/70 inline-block animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  )
}

// ─── EXECUTIVE QUICK PROMPTS ──────────────────────────────────────────────────

const FORBES_PROMPTS = [
  { q: "How do startups get UFRN verification?", cat: "UFRN Lookup", icon: ShieldCheck },
  { q: "Tell me about Michael Truell & Cursor", cat: "Cover Story", icon: BookOpen },
  { q: "What are global SaaS valuation benchmarks?", cat: "Valuations", icon: TrendingUp },
  { q: "How do I list my startup on UpForge?", cat: "Registry", icon: Compass },
]

// ─── MAIN FORBES CHATBOT COMPONENT ───────────────────────────────────────────

export function Chatbot() {
  const [isOpen, setIsOpen]       = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [input, setInput]         = useState("")
  const [loading, setLoading]     = useState(false)
  const [badge, setBadge]         = useState(0)
  const [msgs, setMsgs]           = useState<Message[]>([{
    role: "assistant",
    content: "Welcome to **UpForge Intelligence** — Forbes-grade Global Startup & Founder AI Analyst.\n\nI provide verified intelligence on:\n- **Startup Registry & UFRN Credentials**\n- **Founder Stories & Executive Profiles**\n- **Global VC Funding & Valuation Benchmarks**\n\nHow may I assist your research today?",
  }])
  const [newIdxs, setNewIdxs] = useState<Set<number>>(new Set())

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [msgs, loading])

  useEffect(() => {
    if (isOpen && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, minimized])

  useEffect(() => { if (isOpen) setBadge(0) }, [isOpen])

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    const userMsg: Message = { role: "user", content: msg }
    const nextIdx = msgs.length + 1
    setMsgs(p => [...p, userMsg])
    setNewIdxs(p => new Set(p).add(msgs.length))
    setInput("")
    setLoading(true)
    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...msgs, userMsg] }),
      })
      const data = await res.json()
      const reply = data.message ?? data.error ?? "Couldn't process request. Please try again."
      setMsgs(p => [...p, { role: "assistant", content: reply }])
      setNewIdxs(p => new Set(p).add(nextIdx))
      if (!isOpen) setBadge(c => c + 1)
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Network issue — please check connection." }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, msgs, isOpen])

  const reset = () => {
    setMsgs([{
      role: "assistant",
      content: "Welcome to **UpForge Intelligence** — Forbes-grade Global Startup & Founder AI Analyst.\n\nI provide verified intelligence on:\n- **Startup Registry & UFRN Credentials**\n- **Founder Stories & Executive Profiles**\n- **Global VC Funding & Valuation Benchmarks**\n\nHow may I assist your research today?",
    }])
    setNewIdxs(new Set())
    setInput("")
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">

        {/* ── INTELLIGENCE PANEL ───────────────────────────────────── */}
        {isOpen && (
          <div className={`mb-4 rounded-2xl w-[min(92vw,380px)] ${minimized ? 'h-auto' : 'h-[min(560px,80vh)]'} flex flex-col overflow-hidden bg-background border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-auto`}>

            {/* Forbes Header Masthead */}
            <div className="bg-foreground text-background shrink-0 px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-500/40 bg-black shrink-0">
                  <Image src="/logo.jpg" alt="UpForge AI" fill className="object-cover" priority />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm leading-none text-background">
                      UpForge AI
                    </span>
                    <span className="text-[8px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500 text-black">
                      FORBES AI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground opacity-80 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Global Intelligence Desk
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  title="Reset conversation"
                  className="p-1.5 text-muted-foreground hover:text-amber-400 transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMinimized(v => !v)}
                  title={minimized ? "Expand" : "Minimize"}
                  className="p-1.5 text-muted-foreground hover:text-amber-400 transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 text-muted-foreground hover:text-rose-400 transition-colors rounded-lg hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            {!minimized && (
              <>
                <div ref={scrollRef} aria-live="polite" className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background">
                  
                  <div className="text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest my-1">
                    UPFORGE EDITORIAL AI • LIVE ANALYST
                  </div>

                  {msgs.map((m, idx) => {
                    const isUser = m.role === "user"
                    return (
                      <div key={idx} className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        {!isUser && (
                          <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 border border-amber-500/30 bg-black mt-0.5">
                            <Image src="/logo.jpg" alt="" width={24} height={24} className="w-full h-full object-cover" />
                          </div>
                        )}

                        <div className={`max-w-[84%] p-3 rounded-xl border ${
                          isUser
                            ? 'bg-foreground text-background border-foreground font-sans'
                            : 'bg-card text-foreground border-border shadow-xs'
                        }`}>
                          {isUser ? (
                            <span className="text-[13px] font-sans leading-relaxed">{m.content}</span>
                          ) : (
                            <RichText text={m.content} />
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {loading && (
                    <div className="flex items-start gap-2.5 justify-start">
                      <div className="w-6 h-6 rounded-md overflow-hidden shrink-0 border border-amber-500/30 bg-black mt-0.5">
                        <Image src="/logo.jpg" alt="" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-card border border-border">
                        <TypingDots />
                      </div>
                    </div>
                  )}
                </div>

                {/* Forbes Executive Quick Action Shortcuts */}
                {msgs.length === 1 && (
                  <div className="px-3.5 py-3 border-t border-border bg-muted/40 shrink-0">
                    <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      EXECUTIVE QUERY SHORTCUTS
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {FORBES_PROMPTS.map((p, idx) => {
                        const Icon = p.icon
                        return (
                          <button
                            key={idx}
                            onClick={() => send(p.q)}
                            className="text-left p-2 rounded-lg bg-card border border-border hover:border-amber-500/50 transition-all flex flex-col justify-between group cursor-pointer"
                          >
                            <span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {p.cat}
                            </span>
                            <span className="text-[11px] text-muted-foreground group-hover:text-foreground line-clamp-1 font-serif mt-1">
                              {p.q}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Input Controls */}
                <div className="p-3 border-t border-border bg-background shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      send()
                    }}
                    className="flex gap-2"
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      disabled={loading}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Ask Forbes AI about startups, founders..."
                      aria-label="Message UpForge AI"
                      className="flex-1 px-3.5 py-2.5 text-xs font-serif bg-muted/60 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      aria-label="Send message"
                      className="w-10 h-10 shrink-0 rounded-xl bg-foreground text-background flex items-center justify-center border border-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-background" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </form>
                  <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-[9px] font-mono text-muted-foreground">
                      Powered by UpForge Intelligence AI
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground">
                      Press ↵ to send
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── FLOATING TRIGGER FAB ───────────────────────────────── */}
        <button
          onClick={() => { setIsOpen(v => !v); setMinimized(false) }}
          aria-label="Open UpForge Forbes AI Intelligence Assistant"
          className="w-13 h-13 rounded-full shrink-0 cursor-pointer overflow-hidden bg-foreground text-background border-2 border-amber-500/60 shadow-2xl flex items-center justify-center relative transition-all duration-300 hover:scale-105 pointer-events-auto touch-manipulation group"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-background" />
          ) : (
            <div className="relative w-full h-full p-1.5 flex items-center justify-center bg-black">
              <Image src="/logo.jpg" alt="UpForge AI" width={48} height={48} className="w-full h-full object-cover rounded-full" priority />
              <div className="absolute inset-0 rounded-full border border-amber-400/40 group-hover:border-amber-400 transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
              </span>
            </div>
          )}

          {!isOpen && badge > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-mono font-black border border-white flex items-center justify-center px-1">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
        </button>
      </div>
    </>
  )
}

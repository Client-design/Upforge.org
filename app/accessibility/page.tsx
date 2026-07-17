"use client";

import React from "react";
import Link from "next/link";
import { Accessibility as AccessIcon, Target, ShieldCheck, ArrowRight } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-10 pb-24">

        {/* ══════════════════════════════════════
              HEADER — Authoritative & Trust-first
        ══════════════════════════════════════ */}
        <section className="border-b border-border max-w-[1300px] mx-auto w-full mt-5 pb-6 flex flex-col items-center text-center">
          
          {/* Title */}
          <h1
            className="mast-h1 text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Accessibility Standards
          </h1>

          {/* Tagline */}
          <p className="mast-tagline font-serif italic text-base md:text-[17px] text-muted-foreground max-w-lg mb-5 leading-relaxed">
            Ensuring that global financial trust and verified records are inclusive, perceivable, and operable for all users.
          </p>
        </section>

        <main className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
            
            {/* Main Content */}
            <div className="space-y-16 text-center md:text-left">
              
              <section>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <span className="text-3xl font-serif italic text-muted-foreground/40">01</span>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                    Inclusive Record
                  </h2>
                </div>

                <div className="font-serif text-[18px] leading-[1.8] text-foreground italic">
                  <p>
                    UpForge is committed to ensuring that financial trust is accessible to everyone. We implement high-contrast typography and semantic markup to support screen readers and alternative navigation devices.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                  <span className="text-3xl font-serif italic text-muted-foreground/40">02</span>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-accent">
                    Feedback Channel
                  </h2>
                </div>

                <div className="font-serif text-[18px] leading-[1.8] text-foreground italic">
                  <p>
                    If you encounter barriers within the registry, please report them to our technical desk. We prioritize accessibility bug reports with 48-hour resolution targets to maintain WCAG 2.1 compliance.
                  </p>
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="border border-border p-8 sticky top-10 bg-background text-center md:text-left">

                <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
                  <Target className="text-accent w-5 h-5" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Compliance
                  </h4>
                </div>
                
                <div className="space-y-6">
                  <SidebarItem 
                    icon={<AccessIcon size={18}/>} 
                    title="WCAG 2.1" 
                    desc="AA-Level conformance target for all core registry interfaces." 
                  />

                  <SidebarItem 
                    icon={<ShieldCheck size={18}/>} 
                    title="ARIA Ready" 
                    desc="Optimized semantic structure for screen reader efficiency." 
                  />
                </div>
                
                <div className="pt-8 mt-12 border-t border-border">
                  <Link href="/contact" className="flex items-center justify-between group">
                    <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-accent transition-colors">
                      Report Barrier
                    </span>

                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform text-accent"
                    />
                  </Link>
                </div>

                <div className="mt-12 opacity-30 text-center">
                  <img
                    src="/seal.jpg"
                    alt="Official Seal"
                    className="w-20 mx-auto grayscale"
                  />
                </div>

              </div>
            </aside>

          </div>
        </main>

        <footer className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            UpForge Global • Technical Standards
          </p>

          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-foreground">
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
          </div>

        </footer>

      </div>
    </div>
  );
}


function SidebarItem({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode,
  title: string,
  desc: string
}) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">

      <div className="text-accent shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="text-[12px] font-black uppercase tracking-wider mb-1">
          {title}
        </h4>

        <p className="text-[11px] text-muted-foreground leading-snug font-serif italic">
          {desc}
        </p>
      </div>

    </div>
  );
}

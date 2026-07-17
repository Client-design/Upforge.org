"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Users,
  Zap,
  Globe,
  ShieldCheck,
} from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-10 pb-24">

        {/* HEADER */}
        <section className="border-b border-border max-w-[1300px] mx-auto w-full mt-5 pb-6 flex flex-col items-center text-center">

          <h1
            className="mast-h1 text-3xl md:text-[44px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Careers at UpForge
          </h1>

          <p className="mast-tagline font-serif italic text-base md:text-[17px] text-muted-foreground max-w-lg mb-5 leading-relaxed">
            We are building the definitive global index of founders and startups. Join our mission to create a registry built on trust and transparency.
          </p>

        </section>


        <main className="py-16">

          {/* STATUS BOX */}
          <div className="bg-muted border-4 border-border p-10 text-center mb-20">

            <p className="text-[18px] font-serif italic text-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              "Currently, our editorial and engineering desks are fully staffed. However, we are always on the lookout for exceptional talent in data science and registry management."
            </p>

            <a
              href="mailto:careers@upforge.org"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent transition-colors shadow-lg"
            >
              Send Open Application
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>


          {/* CORE VALUES */}
          <div className="space-y-12">

            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground text-center md:text-left mb-12">
              Our Core Values
            </h2>

            <div className="grid sm:grid-cols-2 gap-16">

              <ValueItem
                icon={<Zap size={20} />}
                title="Uncompromising Quality"
                desc="We treat our platform like legacy media, prioritizing authority and editorial excellence in every entry we verify."
              />

              <ValueItem
                icon={<Globe size={20} />}
                title="Global Perspective"
                desc="We build for the world. Our decisions are tailored for performance, high-speed indexing, and universal trust."
              />

              <ValueItem
                icon={<Users size={20} />}
                title="Founder First"
                desc="Every feature must serve the builder, providing them with immense value and visibility without exploitation."
              />

              <ValueItem
                icon={<ShieldCheck size={20} />}
                title="Data Integrity"
                desc="We are obsessed with precision. Our registry is a source of truth, and we uphold that with zero-tolerance for noise."
              />

            </div>

          </div>

        </main>


        {/* FOOTER */}
        <footer className="mt-20 pt-12 border-t border-border text-center md:text-left">

          <p className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            UpForge Global • Human Resources Division
          </p>

        </footer>

      </div>
    </div>
  );
}


/* VALUE ITEM */

function ValueItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4">

      <div className="text-accent bg-muted p-3 border border-border shadow-[4px_4px_0px_0px_var(--border)]">
        {icon}
      </div>

      <h3 className="text-xl font-bold font-serif italic tracking-tight">
        {title}
      </h3>

      <p className="text-[15px] text-muted-foreground leading-relaxed font-serif">
        {desc}
      </p>

    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, CheckCircle2, Compass, MessageCircle, Search, ShieldCheck, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Search,
    title: "Discover with focus",
    text: "Search and filter colleges by practical decision factors like fees, location, type, rating, and programs."
  },
  {
    icon: BarChart3,
    title: "Compare what matters",
    text: "Review institutions side by side so tradeoffs become clear before you shortlist your options."
  },
  {
    icon: MessageCircle,
    title: "Ask real questions",
    text: "Use student Q&A to clarify doubts that raw data alone cannot answer."
  }
];

const steps = ["Explore institutions", "Compare details", "Save your shortlist", "Ask the community"];

export default function AboutPage() {
  return (
    <div className="py-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-dot-pattern px-6 py-14 md:px-10 md:py-18">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/90 via-blue-50/80 to-teal-50/70 dark:from-slate-950/90 dark:via-blue-950/35 dark:to-teal-950/20" />
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur dark:border-blue-900/60 dark:bg-slate-950/60"
          >
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            About UniCompass
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl"
          >
            A clearer way to choose your next <span className="text-gradient">college path.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
          >
            UniCompass brings discovery, comparison, saved colleges, and student discussions into one calm workspace so students can make confident education decisions.
          </motion.p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 py-10 md:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="premium-card rounded-2xl p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-lg font-bold text-foreground">{pillar.title}</h2>
              <p className="text-sm leading-7 text-muted-foreground">{pillar.text}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="glass-panel grid gap-8 rounded-3xl p-6 md:grid-cols-[0.95fr_1.05fr] md:p-8">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-sm shadow-blue-500/20">
            <Compass className="h-6 w-6" />
          </div>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground">Built for practical decisions</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Instead of scattering your research across notes, tabs, and screenshots, UniCompass keeps the important actions close together.
          </p>
          <Link href="/colleges" className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-all hover:opacity-90">
            Start exploring <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl border border-border bg-background/75 p-4 shadow-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{step}</p>
                <p className="text-xs text-muted-foreground">Step {index + 1} in a simpler college research flow.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-teal-800 p-6 text-white shadow-xl shadow-blue-500/10 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              Student-first research
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Ready to build your shortlist?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/80">
              Start with the colleges directory, then compare options and use Q&A when you need a more human answer.
            </p>
          </div>
          <Link href="/colleges" className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-blue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            Explore Colleges <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

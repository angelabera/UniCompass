"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, MessageCircle, Sparkles } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      text: "Filter colleges by fees, location, type, ratings, and course fit with a fast, focused browsing flow.",
      color: "text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/40"
    },
    {
      icon: TrendingUp,
      title: "Decision Analytics",
      text: "Compare placement data, tuition, and core details side by side before you commit to a shortlist.",
      color: "text-teal-600 bg-teal-50 border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40"
    },
    {
      icon: MessageCircle,
      title: "Student Q&A",
      text: "Ask practical questions and collect answers from other students while researching institutions.",
      color: "text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-950/30 dark:border-orange-900/40"
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <section className="relative overflow-hidden rounded-[2rem] bg-dot-pattern px-4 py-20 md:px-10 md:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/80 via-blue-50/70 to-teal-50/70 dark:from-slate-950/80 dark:via-blue-950/30 dark:to-teal-950/20" />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center space-x-2 rounded-full border border-blue-200/80 bg-white/75 px-3 py-1 shadow-sm backdrop-blur dark:border-blue-900/60 dark:bg-slate-950/60"
            >
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">College decisions, redesigned</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-7xl"
            >
              Find the right college with <span className="text-gradient">clarity and confidence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-9 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
            >
              Browse institutions, compare real decision factors, save favorites, and ask student questions from one polished workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <Link href="/colleges" className="w-full sm:w-auto">
                <button className="btn-primary flex h-12 w-full min-w-48 items-center justify-center rounded-full px-7 text-sm font-semibold transition-all sm:w-auto">
                  Explore Colleges <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 py-12 md:grid-cols-3">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 + idx * 0.08 }}
              className="premium-card group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${feature.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{feature.text}</p>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}

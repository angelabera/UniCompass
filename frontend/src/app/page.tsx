"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, MessageCircle, Sparkles, Info } from "lucide-react";

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
              <Link href="/about" className="w-full sm:w-auto">
                <button className="flex h-12 w-full min-w-40 items-center justify-center rounded-full border border-border bg-white/75 px-7 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:w-auto dark:bg-slate-950/70 dark:hover:bg-slate-900">
                  <Info className="mr-2 h-4 w-4 text-blue-600" />
                  Learn More
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
              className="premium-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/15 dark:hover:border-blue-900/70"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-500/15 to-teal-500/15 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-125" />
              <div className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-lg ${feature.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="relative mb-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">{feature.title}</h3>
              <p className="relative text-sm leading-7 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85">{feature.text}</p>
              <div className="relative mt-5 h-0.5 w-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 transition-all duration-300 group-hover:w-20 group-hover:opacity-100" />
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}

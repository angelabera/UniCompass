"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, ShieldCheck, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] bg-dot-pattern">
      <div className="w-full py-20 md:py-32 flex flex-col items-center justify-center text-center relative">
        <div className="absolute inset-0 bg-background/80 blur-[100px] -z-10 rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-muted/50 border border-border px-3 py-1 rounded-full mb-8"
        >
          <span className="flex h-2 w-2 bg-blue-600 rounded-full"></span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">The New Standard for College Discovery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Navigate your future with <span className="text-gradient">precision.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          A professional, data-driven platform designed to help you analyze, compare, and shortlist top institutions with absolute clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link href="/colleges">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium text-sm flex items-center hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto justify-center h-12">
              Explore Institutions <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
          <Link href="/compare">
            <button className="px-6 py-3 bg-background text-foreground border border-border rounded-md font-medium text-sm flex items-center hover:bg-muted transition-colors shadow-sm w-full sm:w-auto justify-center h-12">
              <BarChart3 className="mr-2 h-4 w-4" /> Compare Data
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto w-full pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-start"
        >
          <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Smart Discovery</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Filter through hundreds of colleges based on rigorous criteria including fees, location, and specific course offerings.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-start"
        >
          <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Data-Driven Comparison</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Execute side-by-side analysis of multiple institutions. Compare placement metrics, tuition structures, and global ratings instantly.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col items-start"
        >
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Verified Analytics</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">Make strategic educational decisions leveraging curated, continuously updated data sets on academic excellence and corporate placements.</p>
        </motion.div>
      </div>
    </div>
  );
}

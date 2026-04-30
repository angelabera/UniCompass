"use client";

import Link from "next/link";
import { BarChart3, Compass, Heart, MessageCircle, Search } from "lucide-react";

const links = [
  { href: "/colleges", label: "Discover", icon: Search },
  { href: "/compare", label: "Compare", icon: BarChart3 },
  { href: "/questions", label: "Q&A", icon: MessageCircle },
  { href: "/saved", label: "Saved", icon: Heart }
];

export default function Footer() {
  return (
    <footer className="mt-10 px-4 pb-6 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border bg-card/80 shadow-xl shadow-slate-900/5 backdrop-blur">
        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 p-2 text-white shadow-sm shadow-blue-500/20">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">UniCompass</span>
            </Link>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              A modern college discovery workspace for exploring institutions, comparing choices, saving favorites, and asking useful student questions.
            </p>
          </div>

          <div className="md:justify-self-end">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Explore</p>
            <div className="grid grid-cols-2 gap-2">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-white hover:text-foreground hover:shadow-sm dark:hover:bg-slate-900"
                  >
                    <Icon className="h-4 w-4 text-blue-600" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border bg-muted/30 px-6 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} UniCompass. Built for clearer college decisions.</span>
          <span>Discover. Compare. Decide.</span>
        </div>
      </div>
    </footer>
  );
}

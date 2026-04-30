"use client";

import Link from "next/link";
import { Compass, Mail, MapPin, ShieldCheck } from "lucide-react";

const platformLinks = [
  { href: "/about", label: "About UniCompass" },
  { href: "/colleges", label: "College Directory" },
  { href: "/compare", label: "Compare Colleges" },
  { href: "/questions", label: "Student Q&A" }
];

const supportLinks = [
  { href: "/login", label: "Student Login" },
  { href: "/register", label: "Create Account" },
  { href: "/saved", label: "Saved Colleges" }
];

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border/80 bg-background/65 px-4 py-10 backdrop-blur md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.65fr_0.65fr_0.8fr]">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 p-2 text-white shadow-sm shadow-blue-500/20">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">UniCompass</span>
            </Link>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              A college decision platform for researching institutions, comparing options, saving shortlists, and asking practical student questions.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              Built for clearer education decisions
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">Platform</h3>
            <div className="space-y-3">
              {platformLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">Account</h3>
            <div className="space-y-3">
              {supportLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                support@unicompass.app
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-600" />
                India
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} UniCompass. All rights reserved.</span>
          <span>Made for students comparing their next step.</span>
        </div>
      </div>
    </footer>
  );
}

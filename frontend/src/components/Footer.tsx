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
    <footer className="mt-10 px-4 pb-6 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-sky-700 to-teal-600 text-white shadow-2xl shadow-blue-500/20">
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.65fr_0.65fr_0.8fr]">
          <div className="p-6 md:p-8">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="rounded-xl bg-white/15 p-2 text-white shadow-sm ring-1 ring-white/20 backdrop-blur">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">UniCompass</span>
            </Link>
            <p className="max-w-md text-sm leading-7 text-blue-50">
              A college decision platform for researching institutions, comparing options, saving shortlists, and asking practical student questions.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-100" />
              Built for clearer education decisions
            </div>
          </div>

          <div className="px-6 md:px-0 md:py-8">
            <h3 className="mb-4 text-sm font-bold text-white">Platform</h3>
            <div className="space-y-3">
              {platformLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-blue-50 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="px-6 md:px-0 md:py-8">
            <h3 className="mb-4 text-sm font-bold text-white">Account</h3>
            <div className="space-y-3">
              {supportLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-blue-50 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="px-6 pb-6 md:px-0 md:py-8 md:pr-8">
            <h3 className="mb-4 text-sm font-bold text-white">Contact</h3>
            <div className="space-y-3 text-sm text-blue-50">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-100" />
                support@unicompass.app
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-100" />
                India
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 bg-slate-950/10 px-6 py-4 text-xs text-blue-50 md:flex-row md:items-center md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} UniCompass. All rights reserved.</span>
          <span>Made for students comparing their next step.</span>
        </div>
      </div>
    </footer>
  );
}

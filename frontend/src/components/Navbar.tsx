"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Compass, LogOut, Heart, ChevronDown, MessageCircle, Search, BarChart3 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const showNavLinks = pathname !== "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/50 bg-white/75 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-teal-500 text-white p-1.5 rounded-lg shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              UniCompass
            </span>
          </Link>

          {showNavLinks && (
            <div className="hidden md:flex items-center gap-1 rounded-full border border-border/80 bg-background/70 p-1 shadow-sm">
              <Link href="/colleges" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm transition-all dark:hover:bg-slate-900">
                <Search className="h-3.5 w-3.5" />
                Discover
              </Link>
              <Link href="/compare" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm transition-all dark:hover:bg-slate-900">
                <BarChart3 className="h-3.5 w-3.5" />
                Compare
              </Link>
              <Link href="/questions" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm transition-all dark:hover:bg-slate-900">
                <MessageCircle className="h-3.5 w-3.5" />
                Q&A
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none bg-background/70 hover:bg-white py-1.5 px-3 rounded-full transition-all border border-border/80 hover:shadow-sm dark:hover:bg-slate-900"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white text-xs font-medium">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user?.name?.split(' ')[0] || 'Account'}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 premium-card rounded-lg py-1 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border bg-muted/50">
                        <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/saved"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                          Saved Colleges
                        </Link>
                      </div>
                      <div className="border-t border-border py-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsDropdownOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground hover:text-blue-600 transition-colors px-3 py-2"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-sm px-4 py-2 rounded-full font-medium transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

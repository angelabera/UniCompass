"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Compass, LogOut, Heart, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:bg-blue-600 transition-colors">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              UniCompass
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/colleges" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </Link>
            <Link href="/compare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Compare
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none hover:bg-muted py-1.5 px-3 rounded-md transition-colors border border-transparent hover:border-border"
                >
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
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
                      className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-lg border border-border py-1 overflow-hidden"
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 py-2 rounded-md font-medium transition-colors shadow-sm"
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

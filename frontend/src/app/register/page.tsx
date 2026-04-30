"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, UserPlus } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", { name, email, password });
      setAuth(response.data.token, response.data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">Create an account</h2>
          <p className="text-sm text-muted-foreground">Start your college discovery journey</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-5 text-sm font-medium border border-red-100 dark:bg-red-950/30 dark:border-red-900/50">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="block w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" /> Sign Up
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground hover:underline transition-colors">
            Log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

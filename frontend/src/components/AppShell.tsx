"use client";

import Navbar from "@/components/Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </>
  );
}

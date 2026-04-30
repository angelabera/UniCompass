import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniCompass | Professional College Discovery",
  description: "A premium, data-driven college discovery and decision platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} min-h-screen flex flex-col bg-background text-foreground selection:bg-blue-100 selection:text-blue-900`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

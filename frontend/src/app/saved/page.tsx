"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { MapPin, Star, ChevronRight, Bookmark, Trash2 } from "lucide-react";

export default function SavedColleges() {
  const { isAuthenticated, savedColleges, setSavedColleges, removeSavedCollege } = useStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchSaved = async () => {
      try {
        const response = await api.get("/save");
        setSavedColleges(response.data);
      } catch (error) {
        console.error("Error fetching saved colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [isAuthenticated, router, setSavedColleges]);

  const handleUnsave = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.delete(`/save/${id}`);
      removeSavedCollege(id);
    } catch (error) {
      console.error("Error unsaving college:", error);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center border-b border-border pb-6">
        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 border border-primary/20">
          <Bookmark className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Saved Portfolios</h1>
          <p className="text-muted-foreground text-sm">Your shortlisted institutions for future review.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm animate-pulse h-80">
              <div className="bg-muted h-40 w-full"></div>
              <div className="p-6">
                <div className="bg-muted h-5 w-3/4 mb-4 rounded"></div>
                <div className="bg-muted h-3 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : savedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((college, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              key={college.id}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-border relative group flex flex-col"
            >
              <button
                onClick={(e) => handleUnsave(college.id, e)}
                className="absolute top-3 right-3 z-10 bg-background/90 text-muted-foreground hover:text-red-500 p-1.5 rounded-md shadow-sm border border-border transition-colors opacity-0 group-hover:opacity-100"
                title="Remove from saved"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              
              <Link href={`/colleges/${college.id}`} className="flex flex-col h-full">
                <div className="h-40 bg-muted relative overflow-hidden">
                  <img
                    src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000"}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 leading-tight">{college.name}</h3>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {college.location.split(',')[0]}
                    </div>
                    <div className="flex items-center text-xs font-medium text-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                      <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                      {college.rating || "N/A"}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
          <Bookmark className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-1">No saved items</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            You haven't bookmarked any institutions yet. Explore the directory to find matches.
          </p>
          <Link href="/colleges">
            <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center shadow-sm">
              Explore Directory <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

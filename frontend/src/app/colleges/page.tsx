"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Banknote, Star, ChevronRight, Search, FilterX } from "lucide-react";
import api from "@/lib/api";

interface College {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  fees: number;
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(location && { location }),
        ...(maxFees && { maxFees })
      });
      
      const response = await api.get(`/colleges?${params}`);
      setColleges(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, location, maxFees]);

  useEffect(() => {
    fetchColleges();
  }, [debouncedSearch, location, maxFees, page]);

  return (
    <div className="py-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Institutions Directory</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">Browse, filter, and discover academic institutions matching your criteria.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-muted/30 p-4 rounded-xl border border-border">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-md text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Search by institution name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="block w-full md:w-48 pl-3 pr-10 py-2.5 bg-background border border-border text-sm rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Pilani">Pilani</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
          
          <select
            className="block w-full md:w-48 pl-3 pr-10 py-2.5 bg-background border border-border text-sm rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
          >
            <option value="">Any Tuition</option>
            <option value="200000">Under ₹2L / year</option>
            <option value="300000">Under ₹3L / year</option>
            <option value="500000">Under ₹5L / year</option>
          </select>

          {(search || location || maxFees) && (
            <button 
              onClick={() => { setSearch(""); setLocation(""); setMaxFees(""); }}
              className="p-2.5 text-muted-foreground hover:text-foreground bg-background border border-border rounded-md hover:bg-muted transition-colors flex-shrink-0 shadow-sm flex items-center justify-center"
              title="Clear filters"
            >
              <FilterX className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm animate-pulse h-96">
              <div className="bg-muted h-48 w-full"></div>
              <div className="p-6">
                <div className="bg-muted h-5 w-3/4 mb-4 rounded"></div>
                <div className="bg-muted h-3 w-1/2 mb-2 rounded"></div>
                <div className="bg-muted h-3 w-1/3 mb-6 rounded"></div>
                <div className="bg-muted h-9 w-full rounded-md mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : colleges.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={college.id}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group"
              >
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img
                    src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000"}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border shadow-sm flex items-center space-x-1 font-medium text-xs text-foreground">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span>{college.rating || "N/A"}</span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 leading-tight">{college.name}</h3>
                  <div className="flex flex-col space-y-1.5 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-2" />
                      <span className="text-xs">{college.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Banknote className="h-3.5 w-3.5 mr-2" />
                      <span className="text-xs font-medium">₹{(college.fees || 0).toLocaleString()} / year</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link href={`/colleges/${college.id}`}>
                      <button className="w-full py-2 bg-background border border-border hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                        View Details <ChevronRight className="ml-1 h-3 w-3 text-muted-foreground" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-muted transition-colors text-foreground"
              >
                Previous
              </button>
              <div className="flex items-center px-3 text-sm font-medium text-muted-foreground">
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-muted transition-colors text-foreground"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-xl bg-muted/20">
          <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}

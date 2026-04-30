"use client";

import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Banknote, Star, ChevronRight, Search, FilterX, SlidersHorizontal } from "lucide-react";
import api from "@/lib/api";

interface College {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  fees: number;
  type: string;
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(location && { location }),
        ...(maxFees && { maxFees }),
        ...(collegeType && { type: collegeType })
      });

      const response = await api.get(`/colleges?${params}`);
      setColleges(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  }, [collegeType, debouncedSearch, location, maxFees, page]);

  useEffect(() => {
    queueMicrotask(() => {
      fetchColleges();
    });
  }, [fetchColleges]);

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setMaxFees("");
    setCollegeType("");
    setPage(1);
  };

  return (
    <div className="py-8">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-600 via-sky-600 to-teal-500 px-6 py-8 text-white shadow-xl shadow-blue-500/15 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">Discover institutions</p>
            <h1 className="text-3xl font-bold tracking-tight mb-2 md:text-4xl">Institutions Directory</h1>
            <p className="text-sm leading-7 text-blue-50 max-w-2xl">
              Browse, filter, and discover academic institutions matching your goals, budget, and preferred location.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {["Fast Search", "Smart Filters", "Clear Details"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 backdrop-blur">
                <p className="font-bold">{item.split(" ")[0]}</p>
                <p className="text-xs text-blue-50">{item.split(" ")[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Find your match</h2>
          <p className="text-muted-foreground text-sm max-w-2xl">Use the filters below to narrow your options quickly.</p>
        </div>
      </div>

      <div className="glass-panel flex flex-col md:flex-row gap-4 mb-10 rounded-2xl p-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-3 bg-background/90 border border-border rounded-xl text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="Search by institution name..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto sm:flex-row">
          <select
            className="block w-full md:w-48 pl-3 pr-10 py-3 bg-background/90 border border-border text-sm rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All Regions</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Pilani">Pilani</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          <select
            className="block w-full md:w-48 pl-3 pr-10 py-3 bg-background/90 border border-border text-sm rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none"
            value={collegeType}
            onChange={(event) => {
              setCollegeType(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>

          <select
            className="block w-full md:w-48 pl-3 pr-10 py-3 bg-background/90 border border-border text-sm rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none"
            value={maxFees}
            onChange={(event) => {
              setMaxFees(event.target.value);
              setPage(1);
            }}
          >
            <option value="">Any Tuition</option>
            <option value="200000">Under Rs 2L / year</option>
            <option value="300000">Under Rs 3L / year</option>
            <option value="500000">Under Rs 5L / year</option>
          </select>

          {(search || location || maxFees || collegeType) && (
            <button
              onClick={resetFilters}
              className="p-3 text-muted-foreground hover:text-foreground bg-background/90 border border-border rounded-xl hover:bg-muted transition-colors flex-shrink-0 shadow-sm flex items-center justify-center"
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
            <div key={i} className="premium-card rounded-2xl overflow-hidden animate-pulse h-96">
              <div className="bg-muted h-48 w-full" />
              <div className="p-6">
                <div className="bg-muted h-5 w-3/4 mb-4 rounded" />
                <div className="bg-muted h-3 w-1/2 mb-2 rounded" />
                <div className="bg-muted h-3 w-1/3 mb-6 rounded" />
                <div className="bg-muted h-9 w-full rounded-md mt-auto" />
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
                className="premium-card rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img
                    src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000"}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent opacity-70" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/80 shadow-sm flex items-center space-x-1 font-medium text-xs text-slate-900">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span>{college.rating || "N/A"}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/80 shadow-sm font-medium text-xs">
                    <span className={college.type === "Government" ? "text-blue-700" : "text-teal-700"}>
                      {college.type}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 leading-tight">{college.name}</h3>
                  <div className="flex flex-col space-y-2 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-2 text-blue-600" />
                      <span className="text-xs">{college.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Banknote className="h-3.5 w-3.5 mr-2 text-teal-600" />
                      <span className="text-xs font-medium">Rs {(college.fees || 0).toLocaleString()} / year</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link href={`/colleges/${college.id}`}>
                      <button className="w-full py-2.5 bg-foreground text-background hover:opacity-90 rounded-xl text-sm font-semibold transition-all flex items-center justify-center shadow-sm">
                        View Details <ChevronRight className="ml-1 h-3.5 w-3.5" />
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
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-background/90 border border-border rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-muted transition-colors text-foreground shadow-sm"
              >
                Previous
              </button>
              <div className="flex items-center px-3 text-sm font-medium text-muted-foreground">
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-background/90 border border-border rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-muted transition-colors text-foreground shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-muted/20">
          <SlidersHorizontal className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters to find what you are looking for.</p>
        </div>
      )}
    </div>
  );
}
